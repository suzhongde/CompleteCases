// 简介
// DES全称为Data Encryption Standard，即数据加密标准，是一种使用密钥加密的块算法，1977年被美国联邦政府的国家标准局确定为联邦资料处理标准（FIPS），并授权在非密级政府通信中使用，随后该算法在国际上广泛流传开来。
// DES是对称性加密里常见的一种，是一种使用秘钥加密的块算法。秘钥长度是64位（bit）， 超过位数秘钥被忽略。所谓对称性加密，加密和解密秘钥相同。对称性加密一般会按照固定长度，把待加密字符串分成块。不足一整块或者刚好最后有特殊填充字符。
// 常见的填充模式有：'pkcs5'、'pkcs7'、'iso10126'、'ansix923'、'zero' 类型，包括DES-ECB、DES-CBC、DES-CTR、DES-OFB、DES-CFB。
// 特点推荐阅读博客:https://blog.csdn.net/ybhuangfugui/article/details/110913773

// 错误
// 学习时候发生的错误版本问题(nodejs-17+版本无法使用)推荐阅读博客:https://juejin.cn/post/7202639428132044858#heading-7

// 特点
// 使用56位的密钥（一般密钥说是64位，实际上有效位只有56位，其余8位是校验位）
// 以64位位单位，对数据分组进行加密和解密（密文与明文长度相同，均为64位）。
// DES加密与解密使用同一密钥（属于对称加密）
// DES的保密性依赖于密钥。（DES的加密算法是公开的，密钥是保密的）
// 特点推荐阅读博客:https://zhuanlan.zhihu.com/p/133516777

const crypto = require("crypto");

// DES 加密
/**
 * @description DES加密，以hex为例
 * @param {String} encodeTxt 待加密的字符串
 * @param {String} key 秘钥
 * @param {String} iv 偏移量
 */
function desEncode(encodeTxt, key, iv) {
    key =
        key.length >= 8 ? key.slice(0, 8) : key.concat("0".repeat(8 - key.length));
    iv = iv.length >= 8 ? iv.slice(0, 8) : iv.concat("0".repeat(8 - iv.length));
    const keyHex = Buffer.from(key);
    const ivHex = Buffer.from(iv);
    const encipher = crypto.createCipheriv("des-cbc", keyHex, ivHex);
    let encode = encipher.update(encodeTxt, "utf8", "hex");
    encode += encipher.final("hex");
    return encode;
}

// DES 解密
/**
 * @description DES解密，要和加密方式对应起来
 * @param {String} decodeTxt 待解密的字符串
 * @param {String} key 秘钥
 * @param {String} iv 偏移量
 */
function desDecode(decodeTxt, key, iv) {
    key =
        key.length >= 8 ? key.slice(0, 8) : key.concat("0".repeat(8 - key.length));
    iv = iv.length >= 8 ? iv.slice(0, 8) : iv.concat("0".repeat(8 - iv.length));
    const keyHex = Buffer.from(key);
    const ivHex = Buffer.from(iv);
    const decipher = crypto.createDecipheriv("des-cbc", keyHex, ivHex);
    let decode = decipher.update(decodeTxt, "hex", "utf8");
    decode += decipher.final("utf8");
    return decode;
}
// 加密
console.log(desEncode('123456','11111','11111'))
// 解密
console.log(desDecode(desEncode('123456','11111','11111'),'11111','11111'))


module.exports = {
    desEncode,
    desDecode,
};