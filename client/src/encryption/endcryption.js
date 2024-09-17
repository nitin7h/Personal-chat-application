import CryptoJS from "crypto-js"

// Encryption function
const secretKey = "Nitin@1234"
    // Encryption function
export const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// Decryption function
export const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};