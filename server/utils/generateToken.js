const jwt = require('jsonwebtoken')

const token = ({email}) => {
    return jwt.sign({email},'secret',{expiresIn:'1hr'})
}

module.exports = token