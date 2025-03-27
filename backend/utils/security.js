const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const config = require('../config/config');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const verifyPassword = async (password, hashPwd) => {
    console.log(password)
    console.log(hashPwd)
    console.log('hash', await hashPassword(password))
    return await bcrypt.compare(password, hashPwd)
}


// Encriptación (para login y registro)
const encryptEmail = (email) => {
    // Validar que la clave existe
    if (!config.ENCRYPTION_KEY) {
        throw new Error('ENCRYPTION_KEY no está configurada');
    }

    // Convertir la clave hexadecimal a Buffer
    const key = Buffer.from(config.ENCRYPTION_KEY, 'hex');
    
    // Verificar longitud de la clave (32 bytes = 256 bits)
    if (key.length !== 32) {
        throw new Error(`Clave inválida: longitud ${key.length} bytes (debe ser 32 bytes)`);
    }

    // Generar IV derivado del email
    const iv = crypto.createHash('sha256')
                     .update(email)
                     .digest()
                     .slice(0, 16); // 16 bytes para AES-CBC

    // Crear cifrador
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    // Cifrar el email
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Devolver IV + texto cifrado (hex)
    return iv.toString('hex') + ':' + encrypted;
};

const decryptEmail = (encryptedData) => {
    // Validar y convertir la clave
    const key = Buffer.from(config.ENCRYPTION_KEY, 'hex');
    if (key.length !== 32) {
        throw new Error('Clave de encriptación inválida');
    }

    // Separar componentes
    const [ivHex, encryptedText] = encryptedData.split(':');
    
    // Convertir IV a Buffer
    const iv = Buffer.from(ivHex, 'hex');
    if (iv.length !== 16) {
        throw new Error('IV inválido');
    }

    // Crear descifrador
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    // Descifrar contenido
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
};

module.exports = {
    hashPassword,
    verifyPassword,
    encryptEmail, 
    decryptEmail
}