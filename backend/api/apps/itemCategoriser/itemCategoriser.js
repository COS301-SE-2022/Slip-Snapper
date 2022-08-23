const { data } = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs-node');

class ItemCategoriser{

    async getData(){
        const fileLocation = "file://"+__dirname.replaceAll('\\','/')+"/fullDataSet.csv";
        const columns = ['Date', 'Item', 'Location', 'Quantity', 'Price', 'Category'];
        const dataset = tf.data.csv(fileLocation, {
            hasHeader:true,
            columnNames: columns,
        })
        const arr = await dataset.toArray()
        const numElements = arr.length;

        const dataSet = dataset.shuffle(1024)
        const training = dataSet.take(numElements*0.8)
        const valid = dataSet.skip(numElements*0.8).take(numElements*0.1)
        const test = dataSet.skip(numElements*0.9).take(numElements*0.1)

        return {
            training: training,
            valid: valid,
            test: test
        }
    }

    compile() {
        const model = tf.sequential();

        model.add(tf.layers.dense({
            units: 3,
            inputShape: [3],
        }))

        model.add(tf.layers.dense({
            units: 2,
        }))

        model.compile({
            loss: 'meanSquaredError',
            optimizer: 'sgd'
        })

        return model;
    }

    async run(){
        const sets = await this.getData();

        const model = this.compile();

        const xs = tf.tensor2d([
            [0.1,0.2,0.3],
            [0.1,0.2,0.3],
            [0.1,0.2,0.3],
        ])

        const ys = tf.tensor2d([
            [1,0],
            [0,1],
            [1,1],
        ])

        model.fit(xs,ys,{
            epochs: 1,

        }).then(()=>{

            const data = tf.tensor2d([
                [1.0,1.0,1.0],
            ])

            const prediction = model.predict(data)
            prediction.print()

        });
    }
}

const ai = new ItemCategoriser();
ai.run()

module.exports = ItemCategoriser
