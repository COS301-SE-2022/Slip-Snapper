const fs = require('fs');
const csv = require('csv');
const tf = require('@tensorflow/tfjs-node');
const vector = require('@tensorflow-models/universal-sentence-encoder');

let numLayers = 0;
let numNeurons = 0;
let numConnections = 0;

class Connection{
    constructor(neuronA, neuronB){
        this.neuronA = neuronA;
        this.neuronB = neuronB;
        this.weight = Math.random();
        numConnections++;
    }

    print(){
        console.log(this.neuronA, this.neuronB, this.weight)
    }
}

class Neuron {
    constructor(){
        this.connections = [];
        this.bias = 0;
        this.value = 0;
        numNeurons++;
    }

    assignValue(val){
        this.value = val;
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
            this.allNeurons[i] = new Neuron();
        }
        numLayers++;
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
        this.modelDescription = [512,16,8,8];
        this.model = [];
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
        for(let i = 0; i < 100; i++){
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
        let highest = 0;
        for(let i =0; i <8; i++){
            if(this.model[3].allNeurons[i].value > this.model[3].allNeurons[highest].value){
                highest = i;
            }
        }

        return highest;
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

    async crossEntropy( output ){
        let loss = 0;
        for(let j = 0; j < 8; j++){
            loss += (Math.log(this.model[3].allNeurons[j].value) * output[j]);
        }

        return (-1*loss);
    }

    async derivativeRelu( value ){
        return value > 0;
    }

    async derivativeSoftmax( value ){
        return value - 1;
    }

    getPrediction( A2 ){
        return 1;
        // argmax(A2,0)
    }

    getAccuracy( Y ){
        return 1;
        // sum(predictions == Y)/ Y.size
    }

    async gradientDescent( X, Y, iterations, alpha ){
        //X = n with 512 sub array
        //Y = 8 element array 
        //iterations = num of iterations
        //alpha = predefined val
        const params = await this.initParams();
        // console.log( params.W1 /*Array: 512 with 8 subarrays*/, params.B1 /*Array: 8 by 1*/, 
        // params.W2 /*Array: 8 with 8 subarrays*/, params.B2 /*Array: 8 by 1 */ )
        let W1 = params.W1;
        let B1 = params.B1;
        let W2 = params.W2;
        let B2 = params.B2;
        for(let i = 0; i < iterations; i++){
            const forward = await this.forwardProp(W1, B1, W2, B2, X);
            const backword = await this.backwardProp(forward.Z1, forward.A1, forward.Z2, forward.A2, params.W2, X, Y);
            let updates = await this.updateParams(params.W1, params.B1, params.W2, params.B2, backword , alpha)
            W1 = updates.W1;
            B1 = updates.B1;
            W2 = updates.W2;
            B2 = updates.B2;
            if (i % 50 == 0){
                console.log('Iteration: %d', i);
                console.log('Accuracy: %d', this.getAccuracy())
            }
        }

        return { W1, B1, W2, B2 }
    }

    async inputLayer( inputs ){
        for(let j = 0; j < 512; j++){
            this.model[0].allNeurons[j].assignValue(inputs[j]);
        }
    }

    async middleLayer( ){
        for(let j = 0; j < this.model[1].allNeurons.length; j++){
            let sum = this.model[1].allNeurons[j].bias;
            for(let l = 0; l < this.model[1].allNeurons[j].connections.length; l++){
                sum += this.model[1].allNeurons[j].connections[l].neuronA.value * this.model[1].allNeurons[j].connections[l].weight;
            }

            let activated = await this.relu(sum);
            this.model[1].allNeurons[j].assignValue(activated)
        }
    }

    async ouputLayer( ){
        let values = [];
        let denom = 0;
        for(let j = 0; j < this.model[2].allNeurons.length; j++){
            let sum = 0;
            for(let l = 0; l < this.model[2].allNeurons[j].connections.length; l++){
                sum += Math.exp(this.model[2].allNeurons[j].connections[l].neuronA.value * this.model[2].allNeurons[j].connections[l].weight + this.model[2].allNeurons[j].bias);
            }
            
            values[j] = sum;
            denom += sum;
        }

        return {
            values, denom
        }
    }

    async softmaxLayer( values, denom ){
        for(let j = 0; j < this.model[2].allNeurons.length; j++){ 
            let activated = await this.softmax(values[j],denom);
            this.model[3].allNeurons[j].assignValue(activated)
        }
    }

    async train( inputs, outputs, iterations, alpha ){
        let i,j,k,l;
        // for(k = 0; k < iterations; k++){
            // inputs.length
            let losses = [];
            let accuracies = [];
            for(i = 0; i < 1; i++){
                /*Forward Propagation*/
                //Populate first Layer
                await this.inputLayer( inputs[i] );

                //Calculate second Layer
                await this.middleLayer( );

                // Calculate output Layer
                const softmaxIn = await this.ouputLayer( );

                // Calculate softmax Layer
                await this.softmaxLayer( softmaxIn.values, softmaxIn.denom );

                //Calculate loss
                losses[i] = await this.crossEntropy( outputs[i] );

                //Calculate accuracy
                accuracies[i] = (await this.argmax()) == (await this.argmaxOut(outputs[i]))

                /*Back Propagation*/

                // let biases = [];
                // for(j = 0; j < 8; j++){
                //     biases[j] = 
                // }
                // let derivCE = await this.derivativeSoftmax(highest);

                //for bias b1 { sum of derivative of CrosssEntropy with relation to b1 }

                // let stepSize = deriveBias * alpha;
                // let bias = oldbias + stepSize;
                
            }
        // }
        // console.log(model[2].allNeurons);
        // console.log(model[1].allNeurons[0].connections[0].neuronA.value);
        // console.log(model[1].allNeurons[0].connections.length);
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

        this.train( inputsEmbed, outputs, 5, 0.1 )
        // let embeddings = new Array(512);
        // for(let i = 0; i < 512; i++){
        //     embeddings[i] = [];
        // }

        // for(let j = 0; j < inputs.length; j++){
        //     for(let i = 0; i < 512; i++){
        //         embeddings[i][j] = inputsEmbed[j][i];
        //     }
        // }

        // const train = await this.gradientDescent(embeddings, outputs, 5, 0.1)
        // console.log(train)
        // console.log(model);
        // console.log(model[2].allNeurons[0])
        // console.log('Layers: %d, Neurons: %d, Connections: %d', numLayers, numNeurons, numConnections);
    }

}

const categoriser = new Categoriser();
categoriser.run();

// module.exports.Categoriser = Categoriser;
