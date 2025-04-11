const crypto = require('crypto');
const config = require('../config/config');

const algorithm = 'aes-256-cbc';
const ENCRYPTION_KEY = Buffer.from(config.ENCRYPTION_KEY, 'hex');
const IV_LENGTH = 16;

// Cifrar archivo
const encryptFile = (buffer) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, iv);
    const encrypted = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return encrypted;
};

// Descifrar archivo
const decryptFile = (encrypted) => {
    const iv = encrypted.slice(0, IV_LENGTH);
    const data = encrypted.slice(IV_LENGTH);
    const decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, iv);
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    return decrypted;
};

module.exports = { encryptFile, decryptFile };