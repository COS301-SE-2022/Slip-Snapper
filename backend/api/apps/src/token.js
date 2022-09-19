const jwt = require('jsonwebtoken')

/**
 * Class that handles the JWT tokens
 */
class TokenFunctions{
    /**
     * Function to generate the JWT
     * @param {*} data The user data to be stored in the token 
     * @returns The JWT or an error
     */
    async generateToken(data) {
        try {
            return jwt.sign(
                { user: data },
                process.env.JWT_PRIVATE_KEY,
                { 
                    expiresIn: '60min'
                }
            );
        } catch (error) {
            console.log(error);
            return "Error";
        }
    }

    /**
     * Function to verify the JWT
     * @param {*} token The encoded JWT
     * @returns The decoded JWT or an error
     */
    async verifyToken(token) {
        if(!token){
            return new Error("Error! No Token Provided.");
        }

        try{
            return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        }
        catch(error){
            console.log(new Date())
            console.log(error)
            return "Error";
        }
    }
}

module.exports = {
    TokenFunctions
}
