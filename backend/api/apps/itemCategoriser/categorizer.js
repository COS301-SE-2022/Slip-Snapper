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
        this.weight = 0;
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
        numNeurons++;
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
        this.modelDescription = [512,8,8];
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
        let layers = [];
        for(let i = 0; i < this.modelDescription.length; i++){
            layers[i] = new Layer(this.modelDescription[i]);
        }
        
        for(let i = 1; i < layers.length; i++){
            layers[i].createConnections(layers[(i-1)]);
        }
    
        return layers;
    }

    async initParams(){
        const W1 = [];
        for(let i = 0; i < 8; i++){
            W1[i] = [];
            for (let j = 0; j < 512; j++){
                W1[i][j] = Math.random();
            }
        }

        const B1 = [];
        for(let i = 0; i < 8; i++){
            B1[i] = Math.random();
        }

        const W2 = [];
        for(let i = 0; i < 8; i++){
            W2[i] = [];
            for (let j = 0; j < 8; j++){
                W2[i][j] = Math.random();
            }
        }

        const B2 = [];
        for(let i = 0; i < 8; i++){
            B2[i] = Math.random();
        }

        return {
            W1, B1, W2, B2,
        }
    }

    async relu( Z ){
        return Math.max(0,Z);
    }

    async softmax( Z ){
        return 0;
        // exp(Z) / sum(exp(Z))
    }

    async forwardProp( W1, B1, W2, B2, X ){
        let Z1 = await this.matrixMul(W1,X)// + B1;
        console.log(Z1);
        console.log(B1.length, B1[0].length, Z1.length, Z1[0].length);
        return;
        let A1 // = await Relu(Z1);
        let Z2 // = (W2 dotProduct A1) + B2
        let A2 // = softmax(Z1)
        return {
            Z1, A1, Z2, A2,
        }
    }

    async derivativeRelu( Z ){
        return Z > 0;
    }

    async backwardProp( Z1, A1, Z2, A2, W2, X, Y ){
        const m = Y.length;

        const dZ2 = A2 - Y;
        const dW2 = 1 / (m * 1)//dZ2 dorproduct A1.transform)
        const dB2 = 1 / (m * 1)// sum dz2)

        const dZ1 = W2 // tranform dotproduct DZ2 * derivativeRelu(Z1)
        const dW1 = 1 / (m * 1)//dZ1 dorproduct X.transform)
        const dB1 = 1 / (m * 1)// sum dZ1)

        return {
            dW1, dB1, dW2, dB2,
        }
    }

    async updateParams( W1, B1, W2, B2, backProp, alpha ){
        W1 = W1 - (alpha * backProp.dW1);
        B1 = B1 - (alpha * backProp.dB1);
        W2 = W2 - (alpha * backProp.dW2);
        B2 = B2 - (alpha * backProp.dB2);

        return {
            W1, B1, W2, B2,
        }
    }

    async matrixMul( a, b ){
        const m1 = a.length;
        const m2 = a[0].length;
        const n2 = b[0].length;

        let x;
        let i;
        let j;
        let res = new Array(m1);
        for (i = 0; i < m1; i++){
            res[i] = new Array(n2);
        }
            
        for (i = 0; i < m1; i++){
            for (j = 0; j < n2; j++){
                res[i][j] = 0;
                for (x = 0; x < m2; x++) {
                    res[i][j] += a[i][x] * b[x][j];
                }
            }
        }

        return res;
    }

    async matrixAdd(a,b){
        return 1;
    }

    getPredictions( A2 ){
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
        // console.log(X.length, X[0].length, X[0][0])
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

    async run(){
        const items = await this.getData();
        // const model = await this.createModel();
        const params = await this.initParams();
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

        let embeddings = new Array(512);
        for(let i = 0; i < 512; i++){
            embeddings[i] = [];
        }

        for(let j = 0; j < inputs.length; j++){
            for(let i = 0; i < 512; i++){
                embeddings[i][j] = inputsEmbed[j][i];
            }
        }

        const train = await this.gradientDescent(embeddings, outputs, 5, 0.1)
        console.log(train)
        // console.log(model);
        // console.log('Layers: %d, Neurons: %d, Connections: %d', numLayers, numNeurons, numConnections);
    }

}

const categoriser = new Categoriser();
categoriser.run();

// module.exports.Categoriser = Categoriser;
