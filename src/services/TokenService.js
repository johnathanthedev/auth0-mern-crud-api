const JWT = require("../lib/JWT")

class TokenService {
    get_token = data => {
        const jwt = new JWT()
        const token = jwt.sign_token(data)
        return token
    }   

    decode_token = token =>  {
        const jwt = new JWT()
        const decoded_token = jwt.decode_token(token)
        return decoded_token
    }
}

module.exports = TokenService