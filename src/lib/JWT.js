const jwt = require('jsonwebtoken');

class JWT {
    create_payload = data => {
        const user_email = data
        const payload = { user_email }
        return payload
    }

    sign_token = data => {
        const payload = this.create_payload(data)
        const token = jwt.sign(payload, process.env.JSON_WEBTOKEN_SECRET, {
            "expiresIn": 360000
        })
        return token
    }

    decode_token = (token) => {
        const decoded_token = jwt.verify(token, process.env.JSON_WEBTOKEN_SECRET)
        return decoded_token
    }
}

module.exports = JWT