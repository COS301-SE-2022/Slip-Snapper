const fs = require('fs');
const csv = require('csv');
const tf = require('@tensorflow/tfjs-node');
const vector = require('@tensorflow-models/universal-sentence-encoder');

function randn_bm() {
    return Math.floor( Math.random() * 6) - 3;
}

class Neuron {
    constructor( i ){
        this.inConnections = [];
        this.outConnections = [];
        this.bias = 0;
        this.outValue = 0;
        this.delta = 0;
        this.error = 0;
        this.index = i;
    }

    addInConnection(connection){
        this.inConnections.push(connection);
    }

    addOutConnection(connection){
        this.outConnections.push(connection);
    }

    setValue(val){
        this.outValue = val;
    }

    setBias(val){
        this.bias = val;
    }

    setError(val){
        this.error = val;
    }

    setDelta(val){
        this.delta = val;
    }
}

class Connection{
    constructor(neuronA, neuronB){
        this.from = neuronA;
        this.to = neuronB;
        this.weight = randn_bm();
        this.change = 0;
    }

    setWeight(val) {
        this.weight = val;
    }
    
    setChange(val) {
        this.change = val;
    }
}

class Layer{
    constructor(numberOfNeurons){
        this.numNeurons = numberOfNeurons;
        this.neurons = [];
        for(let i = 0; i < this.numNeurons; i++){
            this.allNeurons[i] = new Neuron( i );
        }
    }
}

class Categoriser{
    constructor(){
        this.modelDescription = [512,16,8];
        this.model = [];
        this.encoder = 0;
        this.momentum = 0.1;
        this.learningRate = 0.2;
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
        
        for(let layer = 1; layer < this.model.length; layer++){
            const currentLayer = this.model[layer];
            const previousLayer = this.model[layer-1];

            for(let neuron = 0; neuron < previousLayer.neurons.length; neuron++){
                for(let neuronInLayer = 0; neuronInLayer < currentLayer.neurons.length; neuronInLayer++){
                    const connection = new Connection(previousLayer.neurons[neuron], currentLayer.neurons[neuronInLayer])
                    previousLayer.neurons[neuron].addOutConnection(connection);
                    currentLayer.neurons[neuron].addInConnection(connection);
                }
            }
        }
    }

    activateInput( input ){
        this.model[0].neurons.forEach((neuron,i)=>{
            neuron.setValue( input[i] )
        })
    }

    relu( value ){
        return Math.max(0, value);
    }

    softmax( num, den ){
        return num/den;
    }

    forwardPropogate(){
        for(let layer = 0; layer < this.model.length; layer++){
            const currentLayer = this.model[layer]
            for(let neuron = 0; neuron < currentLayer.neurons.length; neuron++){
                const currentNeuron = currentLayer.neurons[neuron];
                const bias = currentNeuron.bias;

                const output = currentNeuron.inConnections.reduce((previous, current) => previous + current.weight * current.from.outValue, 0);

                let activatedOutput = 0;
                if(layer == this.model.length - 1){
                    activatedOutput = this.relu( output + bias );
                    currentNeuron.setValue( output );
                    continue;
                }

                activatedOutput = this.relu( output + bias );
                currentNeuron.setValue( activatedOutput );
            }

            if(layer == this.model.length - 1){
                const total = currentLayer.neurons.reduce((previous, current) => previous + Math.pow(Math.E,(current.outValue + current.bias)), 0)
                for(let neuron = 0; neuron < currentLayer.neurons.length; neuron++){
                    const currentNeur = currentLayer.neurons[neuron]
                    const output = (currentNeur.outValue + currentNeur.bias)/ total;

                    currentNeur.setValue( output );
                }
            }
        }
    }

    backwardPropogate( targets ){
        for(let layer = this.model.length - 1; layer > -1; layer--){
            const currentLayer = this.model[layer]
            for(let neuron = 0; neuron < currentLayer.neurons.length; neuron++){
                const currentNeuron = currentLayer.neurons[neuron]
                const output = currentNeuron.outValue;
                
                let error = 0;
                let delta = 0;
                if(layer == this.model.length - 1){
                    error = targets[neuron] - output;
                    delta = (error * output * (1 - output))
                    currentNeuron.setError( error );
                    currentNeuron.setDelta( delta );
                    continue;
                }

                for(let connection = 0; connection < currentNeuron.outConnections.length; connection++){
                    const currentConnection = currentNeuron.outConnections[connection];
                    error += currentConnection.to.delta * currentConnection.weight;
                }
                delta = (error * output * (1 - output))
                currentNeuron.setError( error );
                currentNeuron.setDelta( delta );
            }
        }
    }

    adjustWeightsAndBiases(){
        for(let layer = 1; layer < this.model.length; layer++){
            const currentLayer = this.model[layer];

            for(let neuron = 0; neuron < currentLayer.neurons.length; neuron++){
                const currentNeuron = currentLayer.neurons[neuron];
                const delta = currentNeuron.delta;

                for(let connection = 0; connection < currentNeuron.inConnections.length; connection++){
                    const currentConnection = currentNeuron.inConnections[connection];
                    let change = currentConnection.change;

                    change = (this.learningRate * delta * currentConnection.from.output) + (this.momentum * change);
                    currentConnection.setChange(change);

                    const newWeight = currentConnection.weight + change;
                    currentConnection.setWeight( newWeight )
                }

                const newBias = currentNeuron.bias + (this.learningRate * delta)
                currentNeuron.setBias( newBias );
            }
        }
    }

    async train( inputs, outputs, epochs ){
        for(let currentEpoch; currentEpoch < epochs; currentEpoch++){
            for(let inputNumber = 0; inputNumber < inputs.length; inputNumber++){
                this.activateInput( inputs[inputNumber] );

                this.forwardPropogate();

                this.backwardPropogate( outputs[inputNumber] );

                this.adjustWeightsAndBiases();
            }
        }
        
        // let i, k; 
        // let accuracies = [];
        // let totalLoss = 0;
        // let losses = 0;
        // for(k = 0; k < epochs; k++){
        //     accuracies = [];
        //     totalLoss = 0;
        //     for(i = 0; i < inputs.length; i++){
        //         /*Forward Propagation*/
        //         await this.inputLayer( inputs[i] );
        //         await this.middleLayer( );
        //         await this.ouputLayer( );
        //         accuracies[i] = (await this.argmax()) == (await this.argmaxOut(outputs[i]));

        //         /*Backward Propagation*/
        //         losses = await this.loss( outputs[i] );
        //         totalLoss = await this.outputLayerBack( losses );
        //         await this.hiddenLayerBack(  );
        //         await this.updateWandB(1, alpha );
        //         await this.updateWandB(2, alpha );
        //     }

        //     let totalAccuracy = accuracies.filter( a => a==true).length;
        //     let accuracy = totalAccuracy/accuracies.length;
        //     console.log("Accuracy: %d, Total Loss: %d",accuracy, totalLoss)
        // }

        // this.saveWandB();
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
