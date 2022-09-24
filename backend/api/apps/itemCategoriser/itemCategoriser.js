const tf = require('@tensorflow/tfjs-node');
const vector = require('@tensorflow-models/universal-sentence-encoder');

class ItemCategoriser{

    async getData(){
        const fileLocation = "file://"+__dirname.replaceAll('\\','/')+"/dataSet_Generation/fullDataSet.csv";
        const columns = ['Item', 'Category'];
        const dataset = tf.data.csv(fileLocation, {
            hasHeader:true,
            columnNames: columns,
        })
        const arr = await dataset.toArray()
        const numElements = arr.length;
        const dataSet = dataset.shuffle(1024)
        const train = dataSet.take(Math.floor(numElements*0.8))
        const valid = dataSet.skip(Math.floor(numElements*0.8)).take(Math.floor(numElements*0.1))
        const test = dataSet.skip(Math.floor(numElements*0.9)).take(Math.floor(numElements*0.1))

        return {
            train: train,
            valid: valid,
            test: test
        }
    }

    async compile() {
        const model = tf.sequential();
        
        model.add(tf.layers.dense({
            units: 8,
            inputShape: [512],
            activation: 'sigmoid',
        }))

        model.add(tf.layers.dense({
            units: 8,
            inputShape: [8],
            activation: 'sigmoid',
        }))

        model.add(tf.layers.dense({
            units: 8,
            inputShape: [8],
            activation: 'sigmoid',
        }))

        model.compile({
            loss: 'meanSquaredError',
            optimizer: tf.train.adam(0.06)
        })

        return model;
    }

    async run(){
        const sets = await this.getData();
        const model = await this.compile(sets);
        const encoder = await vector.load();
        const items = await sets.train.toArray()
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
        const inputsEmbed = await encoder.embed(inputs);
        const outputsEmbed = tf.tensor2d(outputs)

        await model.fit(inputsEmbed,outputsEmbed,{ epochs: 10, })
        await model.save('file://'+__dirname+'/itemcategory');
        console.log('Model Saved');
        model.summary();
    }

    async loadModel(){
        this.predictModel = await tf.loadLayersModel('file://'+__dirname+'/itemcategory/model.json');
        this.encoderP = await vector.load();
    }

    async predict(item){
        const model = this.predictModel;
        const encoder = this.encoderP;

        const data = await encoder.embed(item);
        const prediction = model.predict(data)
        const value = await prediction.data();

        let j = 0;
        for(let i = 0; i < 8; i++){
            if(value[i] > value[j]){
                j = i;
            }
        }

        // prediction.print()
        switch (j) {
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

// const categoriser = new ItemCategoriser();

async function setup(){
    await categoriser.run();
    await categoriser.loadModel();
    console.log(await categoriser.predict('phone'))
}

async function test(){
    await categoriser.loadModel();
    console.log(await categoriser.predict('phone'))
}

// setup();
// test();

module.exports = {
    ItemCategoriser
}
