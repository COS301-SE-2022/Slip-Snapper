const parse = require('./text_parser/parser').parse;

async function Processor (stream){
    if(!(this instanceof Processor)){
        return new Processor(stream);
    }

    this.stream = stream;

    return parse(stream);
}

module.exports = Processor
