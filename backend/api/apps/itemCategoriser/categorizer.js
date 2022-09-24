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
    constructor( i ){
        this.connections = [];
        this.bias = 0;
        this.inValue = 0;
        this.outValue = 0;
        this.gradient = 0;
        this.index = i;
        this.previousDelta = 0;
        numNeurons++;
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
        this.modelDescription = [512,16,8];
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

    async loss( output ){
        let lossV = [];
        for(let j = 0; j < 8; j++){
            lossV[j] = output[j] - this.model[2].allNeurons[j].outValue;
        }

        return lossV;
    }

    async derivativeRelu( value ){
        if(value > 0){
            return 1;
        }
        return 0;
    }

    async derivativeSoftmax( value ){
        return value - 1;
    }

    async inputLayer( inputs ){
        for(let j = 0; j < 512; j++){
            this.model[0].allNeurons[j].assignInValue(inputs[j]);
            this.model[0].allNeurons[j].assignOutValue(inputs[j]);
        }
    }

    async middleLayer( ){
        for(let j = 0; j < this.model[1].allNeurons.length; j++){
            let sum = this.model[1].allNeurons[j].bias;
            for(let l = 0; l < this.model[1].allNeurons[j].connections.length; l++){
                sum += this.model[1].allNeurons[j].connections[l].neuronA.outValue * this.model[1].allNeurons[j].connections[l].weight;
            }

            this.model[1].allNeurons[j].assignInValue(sum)
            let activated = await this.relu(sum);
            this.model[1].allNeurons[j].assignOutValue(activated)
        }
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

        for(let j = 0; j < this.model[2].allNeurons.length; j++){ 
            let activated = await this.softmax(values[j],denom);
            this.model[2].allNeurons[j].assignOutValue(activated)
        }
    }

    async outputLayerBack( loss ){
        let totalLoss = 0.0;
        for(let l = 0; l < this.model[2].allNeurons.length; l++) {
            let output = this.model[2].allNeurons[l].outValue;
            this.model[2].allNeurons[l].gradient = (await this.derivativeSoftmax(output)) * loss[l];
            totalLoss += Math.pow(loss[l], 2);
        }

        return totalLoss;
    }

    async hiddenLayerBack(){
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

            this.model[1].allNeurons[j].gradient = (await this.derivativeRelu(this.model[1].allNeurons[j].outValue)) * error;
        }
    }

    async updateWandB( index, alpha ){
        for(let j = 0; j < this.model[index].allNeurons.length; j++) {
            let neuron = this.model[index].allNeurons[j];
            neuron.bias += alpha * neuron.gradient;
            let delta = 0;
            for(let m = 0; m < neuron.connections.length; m++) {
                delta = alpha * neuron.gradient * neuron.connections[m].neuronA.outValue;
                neuron.connections[m].weight = neuron.connections[m].weight + delta + neuron.previousDelta;
            }
            neuron.previousDelta = delta;
        }
    }


    async train( inputs, outputs, iterations, alpha ){
        let i, k; 
        for(k = 0; k < iterations; k++){
            // inputs.length
            let accuracies = [];
            for(i = 0; i < 100; i++){
                /*Forward Propagation*/
                //Populate first Layer
                await this.inputLayer( inputs[i] );

                //Calculate second Layer
                await this.middleLayer( );

                // Calculate output Layer
                await this.ouputLayer( );

                //Calculate accuracy
                accuracies[i] = (await this.argmax()) == (await this.argmaxOut(outputs[i]));

                /*Backward Propagation*/
                //Calculate loss
                let loss = await this.loss( outputs[i] );

                //Last layer
                let totalLoss = await this.outputLayerBack( loss );

                //Hidden layer
                await this.hiddenLayerBack();

                await this.updateWandB(1, alpha);

                await this.updateWandB(2, alpha);
            }

            let totalAccuracy = accuracies.filter( a => a==true).length;
            let accuracy = totalAccuracy/accuracies.length;
            console.log("Accuracy: %d",accuracy)
        }
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
