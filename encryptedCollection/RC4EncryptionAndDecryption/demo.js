// 特点
// （1）密钥流：RC4算法的关键是根据明文和密钥生成相应的密钥流，密钥流的长度和明文的长度是对应的，也就是说明文的长度是500字节，那么密钥流也是500字节。当然，加密生成的密文也是500字节；
// （2）状态向量S：长度为256，S[0],S[1].....S[255]，每个单元都是一个字节。算法运行的任何时候，S都包括0-255的8比特数的排列组合，只不过值的位置发生了变换；
// （3）临时向量T：长度也为256，每个单元也是一个字节。
// （4）密钥K：长度为1-256字节，注意密钥的长度keylen与明文长度、密钥流的长度没有必然关系，通常密钥的长度取为16字节（128比特）。

// 简介
// RC4加密算法是大名鼎鼎的RSA三人组中的头号人物Ronald Rivest在1987年设计的密钥长度可变的流加密算法簇。
// 之所以称其为簇，是由于其核心部分的S-box长度可为任意，但一般为256字节。该算法的速度可以达到DES加密的10倍左右，
// 且具有很高级别的非线性。RC4起初是用于保护商业机密的。但是在1994年9月，它的算法被发布在互联网上，也就不再有什么商业机密了。
// RC4也被叫做ARC4（Alleged RC4——所谓的RC4），因为RSA从来就没有正式发布过这个算法。
// 名称	RC4	设计者	Ronald Rivest
// 原 理	初始化和伪随机子密码生成算法	漏 洞	密钥序列出现重复密文可能被破解

const RC4_KEY_LEN_MAX = 256;

var rc4CalcTemplate = {
    Rc4Key : "65osdbsfidcxza", // 自己约定的密钥
    Keylen : 0,
    Rc4Sbox : new Array(256),
};

/*初始化函数*/
function rc4_init(){
    rc4CalcTemplate.Keylen = rc4CalcTemplate.Rc4Key.length;
    var j=0;
    var k = new Array(256);
    var tmp = 0;

    for(let i = 0; i < 256; i++){
        rc4CalcTemplate.Rc4Sbox[i] = i;
        k[i] = String(rc4CalcTemplate.Rc4Key[i%rc4CalcTemplate.Keylen]).charCodeAt(0);
    }

    for(let i = 0;i < 256; i++){
        j = (j + rc4CalcTemplate.Rc4Sbox[i] + k[i]) % 256;
        tmp = rc4CalcTemplate.Rc4Sbox[i];
        rc4CalcTemplate.Rc4Sbox[i]= rc4CalcTemplate.Rc4Sbox[j];//交换s[i]和s[j]
        rc4CalcTemplate.Rc4Sbox[j] = tmp;
    }
}
/*加解密*/
function rc4_crypt(Data, Len){
    var i = 0, j = 0, t = 0,sLen = 0;
    var k = 0;
    var tmp;
    var s = new Array(RC4_KEY_LEN_MAX);
    var result = new Array(Len);
    for (sLen = 0; sLen < RC4_KEY_LEN_MAX; sLen++)
    {
        s[sLen] = rc4CalcTemplate.Rc4Sbox[sLen];
    }
    for (k = 0; k < Len; k++)
    {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        tmp = s[i];
        s[i] = s[j];//交换s[x]和s[y]
        s[j] = tmp;
        t = (s[i] + s[j]) % 256;
        result[k] = Data[k] ^ s[t];
    }
    return result;
}
/* 初始化 */
rc4_init();
var input = [0x75, 0x9A, 0xC0, 0x89, 0x18, 0x06, 0x76, 0xC9, 0x52, 0x0C, 0x49, 0x76, 0x3B, 0x35, 0xA9, 0x13, 0x81, 0x48, 0xBE, 0x9C, 0xE1, 0x08, 0xA7, 0x01, 0x9A, 0xD9, 0xB4, 0x57, 0xA4, 0xDE, 0x42, 0x7E, 0x99, 0x55, 0x05, 0x63, 0x78, 0xC7, 0xB8];
var result= rc4_crypt(rc4_crypt(input, input.length), rc4_crypt(input, input.length).length);
console.log(result)

