const tf = require('@tensorflow/tfjs-node');
const vector = require('@tensorflow-models/universal-sentence-encoder');
const { model } = require('@tensorflow/tfjs-node');

class ItemCategoriser{

    async getData(){
        const fileLocation = "file://"+__dirname.replaceAll('\\','/')+"/dataSet_Generation/fullDataSet.csv";
        const columns = ['Date', 'Item', 'Location', 'Quantity', 'Price', 'Category'];
        const dataset = tf.data.csv(fileLocation, {
            hasHeader:true,
            columnNames: columns,
        })
        const arr = await dataset.toArray()
        const numElements = arr.length;

        const dataSet = dataset.shuffle(1024)
        const train = dataSet.take(numElements*0.8)
        const valid = dataSet.skip(numElements*0.8).take(numElements*0.1)
        const test = dataSet.skip(numElements*0.9).take(numElements*0.1)

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
        const items = await sets.train.take(2000).toArray()
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

    async predict(item){
        const model = await tf.loadLayersModel('file://'+__dirname+'/itemcategory/model.json');
        
        const encoder = await vector.load();
        const data = await encoder.embed(item);

        const prediction = model.predict(data)
        prediction.print()
    }
}

const categoriser = new ItemCategoriser();
// categoriser.run()
categoriser.predict('bread')

module.exports = ItemCategoriser
