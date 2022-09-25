const fs = require('fs');
const csv = require('csv');
const tf = require('@tensorflow/tfjs-node');
const vector = require('@tensorflow-models/universal-sentence-encoder');

function randn_bm() {
    return Math.sqrt( -2.0 * Math.log( 1 - Math.random() ) ) * Math.cos( 2.0 * Math.PI * Math.random() );
}

class Connection{
    constructor(neuronA, neuronB){
        this.neuronA = neuronA;
        this.neuronB = neuronB;
        this.weight = randn_bm();
    }

    print(){
        console.log(this.neuronA, this.neuronB, this.weight)
    }
}

class Neuron {
    constructor( i ){
        this.connections = [];
        this.bias = 0;
        this.inValue = 0;
        this.outValue = 0;
        this.gradient = 0;
        this.index = i;
        this.previousDelta = 0;
    }

    assignInValue(val){
        this.inValue = val;
    }

    assignOutValue(val){
        this.outValue = val;
    }

    print(){
        console.log(this.connections, this.bias)
    }
}

class Layer{
    constructor(numberOfNeurons){
        this.numNeurons = numberOfNeurons;
        this.allNeurons = [];
        for(let i = 0; i < this.numNeurons; i++){
            this.allNeurons[i] = new Neuron( i );
        }
    }

    createConnections(previousLayer){
        for(let i = 0; i < this.numNeurons; i++){
            for(let j = 0; j < previousLayer.numNeurons; j++){
                this.allNeurons[i].connections[j] = new Connection(previousLayer.allNeurons[j], this.allNeurons[i]);
            }
        }
    }

    print(){
        console.log(this.numNeurons, this.allNeurons);
    }
}

class Categoriser{
    constructor(){
        this.modelDescription = [512,16,8];
        this.model = [];
        this.encoder = 0;
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
    
        return ret;
    }

    async createModel(){
        for(let i = 0; i < this.modelDescription.length; i++){
            this.model[i] = new Layer(this.modelDescription[i]);
        }
        
        for(let i = 1; i < this.model.length; i++){
            this.model[i].createConnections(this.model[(i-1)]);
        }
    }

    async relu( value ){
        return Math.max(0, value);
    }

    async softmax( num, den ){
        return num/den;
    }

    async argmax( ){
        let highestP = 0;
        for(let i =0; i <8; i++){
            if(this.model[2].allNeurons[i].outValue > this.model[2].allNeurons[highestP].outValue){
                highestP = i;
            }
        }

        return highestP;
    }

    async argmaxOut( output ){
        let highest = 0;
        for(let i =0; i <8; i++){
            if(output[i] > output[highest]){
                highest = i;
            }
        }

        return highest;
    }

    async loss( ){
        // let lossV = [];
        // for(let j = 0; j < output.length; j++){
        //     lossV[j] = output[j] - this.model[2].allNeurons[j].outValue;
        // }
        // return lossV;
        let highest = await this.argmax();
        if(isNaN(this.model[2].allNeurons[highest].outValue)){
            // console.log(this.model[2].allNeurons[highest])
            // console.log(this.model[1].allNeurons)
            return -1
        }
        return -1*(Math.log(this.model[2].allNeurons[highest].outValue))
    }

    async derivativeRelu( value ){
        if(value >= 0){
            return 1;
        }
        return 0;
    }

    async derivativeSoftmax( value ){
        return value*(1-value);
    }

    async inputLayer( inputs ){
        let output = [];
        for(let j = 0; j < 512; j++){
            this.model[0].allNeurons[j].assignInValue(inputs[j]);
            this.model[0].allNeurons[j].assignOutValue(inputs[j]);
            output[j] = inputs[j];
        }
        return output;
    }

    async middleLayer( ){
        let output = []
        for(let j = 0; j < this.model[1].allNeurons.length; j++){
            let sum = this.model[1].allNeurons[j].bias;
            for(let l = 0; l < this.model[1].allNeurons[j].connections.length; l++){
                sum += this.model[1].allNeurons[j].connections[l].neuronA.outValue * this.model[1].allNeurons[j].connections[l].weight;
            }

            this.model[1].allNeurons[j].assignInValue(sum)
            let activated = await this.relu(sum);
            this.model[1].allNeurons[j].assignOutValue(activated)
            output[j] = activated;
        }

        return output;
    }

    async ouputLayer( ){
        let values = [];
        let denom = 0;
        for(let j = 0; j < this.model[2].allNeurons.length; j++){
            let sum = 0;
            for(let l = 0; l < this.model[2].allNeurons[j].connections.length; l++){
                sum += Math.exp(this.model[2].allNeurons[j].connections[l].neuronA.outValue * this.model[2].allNeurons[j].connections[l].weight + this.model[2].allNeurons[j].bias);
            }
            
            this.model[2].allNeurons[j].assignInValue(sum)

            values[j] = sum;
            denom += sum;
        }

        let output = [];
        for(let j = 0; j < this.model[2].allNeurons.length; j++){ 
            let activated = await this.softmax(values[j],denom);
            this.model[2].allNeurons[j].assignOutValue(activated);
            if(isNaN(activated)){
                this.model[2].allNeurons[j].assignOutValue(0.2);
            }
            output[j] = activated; 
        }

        return output;
    }

    async outputLayerBack( loss ){
        // let updateLosses = new Array(loss[0].length).fill(0);
        // for(let j = 0; j < loss.length; j++){
        //     for(let i = 0; i < loss[j].length; i++){
        //         updateLosses[i] += loss[j][i]; 
        //     }
        // }  

        // let updateOutputs = new Array(output[0].length).fill(0);
        // for(let j = 0; j < output.length; j++){
        //     for(let i = 0; i < output[j].length; i++){
        //         updateOutputs[i] += (await this.derivativeSoftmax(output[j][i]));
        //     }
        // } 

        // for(let j = 0; j < 8; j++){
        //     updateOutputs[j] = updateOutputs[j]/output.length;
        //     updateLosses[j] = updateLosses[j]/loss.length;
        // }

        let totalLoss = 0.0;
        for(let l = 0; l < this.model[2].allNeurons.length; l++) {
            this.model[2].allNeurons[l].gradient = this.model[1].allNeurons[l].outValue * loss;
            totalLoss += Math.pow( loss, 2);
        }

        return totalLoss;
    }

    async hiddenLayerBack(  ){
        // let updateOutput = new Array(output[0].length).fill(0);
        // for(let j = 0; j < output.length; j++){
        //     for(let i = 0; i < output[j].length; i++){
        //         updateOutput[i] += (await this.derivativeRelu(output[j][i]));
        //     }
        // }  

        // for(let j = 0; j < output[0].length; j++){
        //     updateOutput[j] = updateOutput[j]/output.length;
        // }

        for(let j = 0; j < this.model[1].allNeurons.length; j++) {
            let neuron = this.model[1].allNeurons[j].index;
            let error = 0.0;

            for(let l = 0; l < this.model[2].allNeurons.length; l++) {
                for(let m = 0; m < this.model[2].allNeurons[l].connections.length; m++){
                    if(this.model[2].allNeurons[l].connections[m].neuronA.index == neuron){
                        error += this.model[2].allNeurons[l].connections[m].weight * this.model[2].allNeurons[l].gradient;
                    }
                }
            }
            this.model[1].allNeurons[j].gradient = this.model[1].allNeurons[j].outValue * error;
        }
    }

    async updateWandB( index, alpha, output){
        // let updateOutput = new Array(output[0].length).fill(0);
        // for(let j = 0; j < output.length; j++){
        //     for(let i = 0; i < output[j].length; i++){
        //         updateOutput[i] += output[j][i]; 
        //     }
        // }  

        // for(let j = 0; j < output[0].length; j++){
        //     updateOutput[j] = updateOutput[j]/output.length;
        // }
        let weights = []
        for(let j = 0; j < this.model[index].allNeurons.length; j++) {
            let neuron = this.model[index].allNeurons[j];
            neuron.bias += alpha * neuron.gradient;
            if(neuron.bias > 50 || neuron.bias < -50){
                neuron.bias = neuron.bias/50;
            }
            let delta = 0;
            weights = [];
            let total = 0;
            for(let m = 0; m < neuron.connections.length; m++) {
                delta = alpha * neuron.gradient * neuron.outValue;
                neuron.connections[m].weight = neuron.connections[m].weight + delta + neuron.previousDelta;
                weights[m] = neuron.connections[m].weight;
                total += weights[m];
            }

            for(let m = 0; m < weights.length; m++){
                if(weights[m] > 20 || weights[m] < -20){
                    neuron.connections[m].weight = weights[m]/total;
                }
            }
            neuron.previousDelta = delta;
        }

        // for(let j = 0; j < this.model[index].allNeurons.length; j++) {
        //     let neuron = this.model[index].allNeurons[j];
        //     neuron.bias += alpha * neuron.gradient;
        //     let delta = 0;
        //     for(let m = 0; m < neuron.connections.length; m++) {
        //         delta = alpha * neuron.gradient * neuron.outValue;
        //         neuron.connections[m].weight = neuron.connections[m].weight + delta + neuron.previousDelta;
        //     }
        //     neuron.previousDelta = delta;
        // }
    }

    async saveWandB(){
        let data = { layer2: {}, layer3: {}}

        let weights = [];
        let biases = [];
        for(let i = 0; i < 16; i++){
            weights[i] = [];
            for(let j = 0; j < this.model[1].allNeurons[i].connections.length; j++){
                weights[i][j] = this.model[1].allNeurons[i].connections[j].weight;
            }
            biases[i] = this.model[1].allNeurons[i].bias;
        }
        data.layer2.weights = weights;
        data.layer2.biases = biases;

        weights = [];
        biases = [];
        for(let i = 0; i < 8; i++){
            weights[i] = [];
            for(let j = 0; j < this.model[2].allNeurons[i].connections.length; j++){
                weights[i][j] = this.model[2].allNeurons[i].connections[j].weight;
            }
            biases[i] = this.model[2].allNeurons[i].bias;
        }
        data.layer3.weights = weights;
        data.layer3.biases = biases;

        let val = JSON.stringify(data, null, 2)
        fs.writeFile(__dirname+'/weights.json', val, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    }

    async train( inputs, outputs, epochs, alpha ){
        let i, k; 
        // let batch = 100;
        let accuracies = [];
        let totalLoss = 0;
        let losses = 0;
        // let output = [];
        // let outputMid = [];
        // let outputIn = []
        for(k = 0; k < epochs; k++){
            accuracies = [];
            totalLoss = 0;
            // losses = [];
            // output = [];
            // outputMid = [];
            // outputIn = []
            for(i = 0; i < inputs.length; i++){
                /*Forward Propagation*/
                //Populate first Layer
                // outputIn[i%batch] = await this.inputLayer( inputs[i] );
                await this.inputLayer( inputs[i] );

                //Calculate second Layer
                // outputMid[i%batch] = await this.middleLayer( );
                await this.middleLayer( );

                // Calculate output Layer
                // output[i%batch] = await this.ouputLayer( );
                await this.ouputLayer( );

                //Calculate accuracy
                accuracies[i] = (await this.argmax()) == (await this.argmaxOut(outputs[i]));

                /*Backward Propagation*/
                //calculate losses
                // losses[i%batch] = await this.loss( outputs[i] );
                losses = await this.loss( outputs[i] );
                //Batch size of 10
                // if(i % batch == 0){

                    //Last layer 
                    // totalLoss = await this.outputLayerBack( losses, output );
                    totalLoss = await this.outputLayerBack( losses );

                    //Hidden layer
                    // await this.hiddenLayerBack( outputMid );
                    await this.hiddenLayerBack(  );

                    //update weigths and biases layer 2
                    // await this.updateWandB(1, alpha, outputIn );
                    await this.updateWandB(1, alpha );

                    // //update weigths and biases layer 3
                    // await this.updateWandB(2, alpha, outputMid );
                    await this.updateWandB(2, alpha );

                    // losses = [];
                    // output = [];
                    // outputMid = [];
                    // outputIn = [];
                // }
                //Calculate loss
            }

            let totalAccuracy = accuracies.filter( a => a==true).length;
            let accuracy = totalAccuracy/accuracies.length;
            console.log("Accuracy: %d, Total Loss: %d",accuracy, totalLoss)
        }

        this.saveWandB();
    }

    async run(){
        const items = await this.getData();
        await this.createModel();
        const encoder = await vector.load();
        
        const inputs = [];
        const outputs = [];
        items.map((element) =>{ 
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

        this.train( inputsEmbed, outputs, 10, 0.1 )

        // console.log(this.model)
        // console.log(model[2].allNeurons[0])
    }

    async load(){
        await this.createModel();
        this.encoder = await vector.load();

        fs.readFile(__dirname+'/weights.json', (err, val) => {
            let data = JSON.parse(val);

            for(let i = 0; i < 16; i++){
                for(let j = 0; j < this.model[1].allNeurons[i].connections.length; j++){
                    this.model[1].allNeurons[i].connections[j].weight = data.layer2.weights[i][j];
                }
                this.model[1].allNeurons[i].bias = data.layer2.biases[i];
            }

            for(let i = 0; i < 8; i++){
                for(let j = 0; j < this.model[2].allNeurons[i].connections.length; j++){
                    this.model[2].allNeurons[i].connections[j].weight = data.layer3.weights[i][j];
                }
                this.model[2].allNeurons[i].bias = data.layer3.biases[i];
            }
        });

    }

    async predict(item){
        const data = (await(await this.encoder.embed(item)).array())[0];
        await this.inputLayer(data);
        await this.middleLayer();
        await this.ouputLayer();

        let pred = await this.argmax();
        switch (pred) {
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

async function test(){
    await categoriser.load();
    let val = await categoriser.predict("food");
    let vala = await categoriser.predict("umbrella");
    let valb = await categoriser.predict("phone");
    let valc = await categoriser.predict("bread");
    console.log(val, vala, valb, valc);
}

test();

// module.exports.Categoriser = Categoriser;
