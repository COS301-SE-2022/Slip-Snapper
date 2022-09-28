const fs = require('fs');
const csv = require('csv');
const tf = require('@tensorflow/tfjs-node');
const vector = require('@tensorflow-models/universal-sentence-encoder');

class Categoriser{
    constructor(){
        this.encoder = 0;
        this.learningRate = 0.001;
        this.weightsItoH = tf.tensor2d([[1]]);
        this.weightsHtoO = tf.tensor2d([[1]]);
        this.biasesH = tf.tensor2d([[1]]);
        this.biasesO = tf.tensor2d([[1]]);
    }

    async getData(){
        const items = []
        await new Promise((resolve) => {
            fs.createReadStream(__dirname+'/dataSet_Generation/fullDataSet.csv')
                .pipe(csv.parse({ columns:true, relax_quotes:true , delimiter: "," }))
                .on('data', (data) => items.push(data))
                .on('end', () => {
                    resolve(true)
                });
        })
    
        ////////////////////////////////////
        let ret = [];
        for(let i = 0; i < 10000; i++){
            ret[i] = items[i];
        }
        ////////////////////////////////////
    
        let testset = [];
        let j = 0;
        for(let i = 10000; i < items.length; i++){
            testset[j++] = items[i];
        }

        return { items: ret, testset: testset}
    }

    async createModel(){
        this.weightsItoH = tf.randomUniform([16,512], -2, 2);
        this.weightsHtoO = tf.randomUniform([8,16], -2, 2);
        this.biasesH = tf.randomUniform([16,1], -2, 2);
        this.biasesO =  tf.randomUniform([8,1], -2, 2);
    }

    async forwardPropogate( input ){
        const Z1 = this.weightsItoH.dot( input ).add( this.biasesH );
        const A1 = Z1.relu();
        const Z2 = this.weightsHtoO.dot( A1 ).add( this.biasesO );
        const A2 = Z2.transpose().softmax().transpose();

        return { Z1, A1, Z2, A2 }
    }

    async reluDeriv( input ){
        const arr = await input.array();
        
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[i].length; j++){
                if(arr[i][j] < 0){
                    arr[i][j] = 0;
                }
            }
        }

        return tf.tensor(arr);
    }

    async backwardPropogate( forwardProp, input ,output ){
        const dZ2 = tf.sub(forwardProp.A2, output);
        const dW2 = tf.mul(dZ2.dot(forwardProp.A1.transpose()),tf.scalar(1/ output.shape[0]));
        const dB2 = tf.mul(dZ2.sum(1), tf.scalar(1/ output.shape[0]));

        const reluD = await this.reluDeriv(forwardProp.Z1);
        const dZ1 = this.weightsHtoO.transpose().dot(dZ2).mul(reluD);
        const dW1 = tf.mul(dZ1.dot(input.transpose()), tf.scalar(1/ 16));
        const dB1 = tf.mul(dZ1.sum(1), tf.scalar(1/ 16));

        return { dW1, dB1, dW2, dB2 }
    }

    async adjustWeightsAndBiases( backward ){
        this.weightsItoH = this.weightsItoH.sub(tf.mul(backward.dW1,tf.scalar(this.learningRate)));
        const biasChange = await tf.mul(backward.dB1,tf.scalar(this.learningRate)).array();
        const originalBias = await this.biasesH.array();
        for(let i = 0; i < biasChange.length; i++){
            originalBias[i][0] -= biasChange[i];
        }
        this.biasesH = tf.tensor2d(originalBias);

        this.weightsHtoO = this.weightsHtoO.sub(tf.mul(backward.dW2,tf.scalar(this.learningRate)));
        const biasChange2 = await tf.mul(backward.dB2,tf.scalar(this.learningRate)).array();
        const originalBias2 = await this.biasesO.array();
        for(let i = 0; i < biasChange2.length; i++){
            originalBias2[i][0] -= biasChange2[i];
        }
        this.biasesO = tf.tensor2d(originalBias2);
    }

    async train( inputs, outputs, epochs ){
        for(let currentEpoch = 0; currentEpoch < epochs; currentEpoch++){
            const forwardProp = await this.forwardPropogate( inputs );
            const backwardProp = await this.backwardPropogate( forwardProp, inputs, outputs );
            await this.adjustWeightsAndBiases( backwardProp );

            if(currentEpoch%10 == 0){
                let predictions = await tf.argMax(forwardProp.A2.transpose(),1).array();
                let actual = await tf.argMax(outputs.transpose(),1).array();
                let numCorrect = 0;
                for(let i = 0; i < predictions.length; i++){
                    if(predictions[i] == actual[i]){
                        numCorrect++;
                    }
                }

                let accuracy = numCorrect / predictions.length;
                console.log("Accuracy: %d %", accuracy*100)
            }
        }
        
        this.saveWandB();
    }

    async saveWandB(){
        let data = { 1:{}, 2:{} }

        data[1].weights = await this.weightsItoH.array();
        data[1].biases = await this.biasesH.array();
        data[2].weights = await this.weightsHtoO.array();
        data[2].biases = await this.biasesO.array();

        let val = JSON.stringify(data, null, 2)
        fs.writeFile(__dirname+'/weights.json', val, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    }

    async run(){
        const encoder = await vector.load();
        const ret = await this.getData();
        await this.createModel();

        console.log(ret.items.length)
        console.log(ret.testset.length)


        const inputs = [];
        const outputs = [];
        ret.items.map((element) =>{ 
            inputs.push(element.Item.toLowerCase()); 
            switch (element.Category.toLowerCase()) {
                case 'food':
                    outputs.push([1,0,0,0,0,0,0,0])
                    break;
                case 'electronics':
                    outputs.push([0,1,0,0,0,0,0,0])
                    break;
                case 'fashion':
                    outputs.push([0,0,1,0,0,0,0,0])
                    break;
                case 'household':
                    outputs.push([0,0,0,1,0,0,0,0])
                    break;
                case 'hobby':
                    outputs.push([0,0,0,0,1,0,0,0])
                    break;
                case 'vehicle':
                    outputs.push([0,0,0,0,0,1,0,0])
                    break;
                case 'healthcare':
                    outputs.push([0,0,0,0,0,0,1,0])
                    break;    
                default:
                    outputs.push([0,0,0,0,0,0,0,1])
                    break;
            }
        });
        
        const inputsEmbed = []
        for(let i = 0; i< inputs.length; i++){
            inputsEmbed[i] = (await(await encoder.embed(inputs[i])).array())[0];
        }

        const outputTensor = tf.tensor2d(outputs).transpose();
        const inputTensor = tf.tensor2d(inputsEmbed).transpose();
        this.train( inputTensor, outputTensor, 1000 )
    }

    async testModel(){
        await this.load();
        const ret = await this.getData();

        const inputs = [];
        const outputs = [];
        ret.testset.map((element) =>{ 
            inputs.push(element.Item.toLowerCase()); 
            switch (element.Category.toLowerCase()) {
                case 'food':
                    outputs.push([1,0,0,0,0,0,0,0])
                    break;
                case 'electronics':
                    outputs.push([0,1,0,0,0,0,0,0])
                    break;
                case 'fashion':
                    outputs.push([0,0,1,0,0,0,0,0])
                    break;
                case 'household':
                    outputs.push([0,0,0,1,0,0,0,0])
                    break;
                case 'hobby':
                    outputs.push([0,0,0,0,1,0,0,0])
                    break;
                case 'vehicle':
                    outputs.push([0,0,0,0,0,1,0,0])
                    break;
                case 'healthcare':
                    outputs.push([0,0,0,0,0,0,1,0])
                    break;    
                default:
                    outputs.push([0,0,0,0,0,0,0,1])
                    break;
            }
        });

        const inputsEmbed = []
        for(let i = 0; i< inputs.length; i++){
            inputsEmbed[i] = (await(await this.encoder.embed(inputs[i])).array())[0];
        }

        const outputTensor = tf.tensor2d(outputs);
        const inputTensor = tf.tensor2d(inputsEmbed).transpose();

        const result = await this.forwardPropogate(inputTensor);

        let predictions = await tf.argMax(result.A2.transpose(),1).array();
        let actual = await tf.argMax(outputTensor,1).array();
        let numCorrect = 0;
        for(let i = 0; i < predictions.length; i++){
            if(predictions[i] == actual[i]){
                numCorrect++;
            }
        }

        let accuracy = numCorrect / predictions.length;
        console.log("Accuracy: %d %", accuracy*100)
    }

    async load(){
        this.encoder = await vector.load();

        fs.readFile(__dirname+'/weights.json', (err, val) => {
            let data = JSON.parse(val);
            
            this.weightsItoH = tf.tensor2d(data[1].weights);
            this.biasesH = tf.tensor2d(data[1].biases);
            this.weightsHtoO = tf.tensor2d(data[2].weights);
            this.biasesO = tf.tensor2d(data[2].biases);
        });
    }

    async predict(item){
        const data = await this.encoder.embed(item);
        const result = await this.forwardPropogate(data.transpose());

        let prediction = await tf.argMax(result.A2.transpose(),1).array();

        switch (prediction[0]) {
            case 0:
                return 'Food';
            case 1:
                return 'Electronics';
            case 2:
                return 'Fashion';
            case 3:
                return 'Household';
            case 4:
                return 'Hobby';
            case 5:
                return 'Vehicle';
            case 6:
                return 'Healthcare';
            default:
                return 'Other';
        }
    }
}

const categoriser = new Categoriser();
// categoriser.run();
// categoriser.testModel();

async function test(){
    await categoriser.load();
    await new Promise(resolve => setTimeout(resolve, 3000));
    let val = await categoriser.predict("sprite");
    let vala = await categoriser.predict("umbrella");
    let valb = await categoriser.predict("phone");
    let valc = await categoriser.predict("bread");
    console.log(val, vala, valb, valc);
}

// test();

module.exports.Categoriser = Categoriser;
