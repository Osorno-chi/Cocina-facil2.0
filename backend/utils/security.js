const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const verifyPassword = async (password, hashPwd) => {
    return await bcrypt.compare(password, hashPwd)
}

module.exports = {
    hashPassword,
    verifyPassword
}