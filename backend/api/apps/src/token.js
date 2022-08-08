const jwt = require('jsonwebtoken')

class TokenFunctions{
    async generateToken(data) {
        try {
            return jwt.sign(
                { user: data },
                process.env.JWT_PRIVATE_KEY,
                { 
                    expiresIn: '30min'
                }
            );
        } catch (error) {
            console.log(error);
            return new Error("Error! Something went wrong when generating token.");
        }
    }

    async verifyToken(token) {
        if(!token){
            return new Error("Error! No Token Provided.");
        }
        try{
            return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        }
        catch(error){
            return new Error("Error! Something went wrong when validating token.");
        }
    }
}

module.exports = {
    TokenFunctions
}
