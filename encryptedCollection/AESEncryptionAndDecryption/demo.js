// 特点:分组大小为128位的分组密码。必须支持三种密码标准：128位、192位和256位。
// 特点推荐阅读博客:https://www.jianshu.com/p/e8969d8bb6d7

// 1.AES(Advanced Encryption Standard)，全称：高级加密标准，是一种最常见的对称加密算法(微信小程序加密传输就是用这个加密算法的)。
// 1）明文：没有经过加密的数据。
// 2）密钥：
// 用来加密明文的密码，在对称加密算法中，加密与解密的密钥是相同的。密钥为接收方与发送方协商产生，但不可以直接在网络上传输，否则会导致密钥泄漏，通常是通过非对称加密算法加密密钥，然后再通过网络传输给对方，或者直接面对面商量密钥。密钥是绝对不可以泄漏的，否则会被攻击者还原密文，窃取机密数据。
// 3）AES加密函数
// 经加密函数处理后的数据
// 4）AES解密函数
// 设AES解密函数为D，则 P = D(K, C),其中C为密文，K为密钥，P为明文。也就是说，把密文C和密钥K作为解密函数的参数输入，则解密函数会输出明文P。
// 2.对称加密算法与非对称加密算法的区别：
// 1）对称加密算法
// 加密和解密用到的密钥是相同的，这种加密方式加密速度非常快，适合经常发送数据的场合。缺点是密钥的传输比较麻烦。
// 2）非对称加密算法
// 加密和解密用的密钥是不同的，这种加密方式是用数学上的难解问题构造的，通常加密解密的速度比较慢，适合偶尔发送数据的场合。优点是密钥传输方便。常见的非对称加密算法为RSA、ECC和EIGamal。
// 实际中，一般是通过RSA加密AES的密钥，传输到接收方，接收方解密得到AES密钥，然后发送方和接收方用AES密钥来通信。
// 4、AES的基本结构
// AES为分组密码，分组密码也就是把明文分成一组一组的，每组长度相等，每次加密一组数据，直到加密完整个明文。在AES标准规范中，分组长度只能是128位，也就是说，每个分组为16个字节（每个字节8位）。密钥的长度可以使用128位、192位或256位。


const aesCrypto = require('crypto-js/aes');
const utf8Encode = require("crypto-js/enc-utf8")

// 密钥
const secretKey = "your-secret-key"

// 加密
const encrypt = text => {
    let encryptedText = aesCrypto.encrypt(utf8Encode.parse(text), secretKey).toString();

    return encryptedText
}

// 解密
const decrypt = text => {
    let decryptText = aesCrypto.decrypt(text, secretKey).toString(utf8Encode)

    console.log(decryptText)

    return decryptText.toString(utf8Encode);
}

decrypt(encrypt("123456")) // hello aes!

console.log(encrypt("123456"))
console.log(decrypt("123456"))

// exports.aes = { encrypt, decrypt }
