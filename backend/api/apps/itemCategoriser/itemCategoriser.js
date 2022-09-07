const tf = require('@tensorflow/tfjs-node');
const vector = require('@tensorflow-models/universal-sentence-encoder')

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
            units: 512,
            inputShape: [512],
            activation: 'sigmoid',
        }))

        // model.add(tf.layers.dense({
        //     units: 2,
        //     inputShape: [512],
        //     activation: 'sigmoid',
        // }))

        // model.add(tf.layers.dense({
        //     units: 2,
        //     inputShape: [2],
        //     activation: 'sigmoid',
        // }))

        model.compile({
            loss: 'meanSquaredError',
            optimizer: tf.train.adam(0.06)
        })

        return model;
    }

    async run(){
        const sets = await this.getData();
        const model = await this.compile(sets);

        // const sentences = (await sets.train.toArray().take(200000)).map((element,index) => {return [element.Item.toLowerCase(),index]})
        const encoder = await vector.load();

        const items = await sets.train.take(2000).toArray()
        const inputs = items.map((element) => {return element.Item.toLowerCase()});
        const outputs = items.map((element) => {return element.Category.toLowerCase()});
        const inputsEmbed = await encoder.embed(inputs);
        const outputsEmbed = await encoder.embed(inputs);
        // console.log(inputsEmbed)
        // console.log(outputsEmbed)

        model.fit(inputsEmbed,outputsEmbed,{ epochs: 2, })
        .then(()=>{
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
