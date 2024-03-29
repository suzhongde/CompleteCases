// JSON.stringify 和JSON.parse 是 Node 中全局可用的方法。你不需要在使用前安装或要求。
// const config = { ip: '1234.22.11', port: 3000};
// // 你几乎总是需要在Node中把JSON或JavaScript对象序列化为JSON字符串。在将其写入存储设备或在互联网上传输之前，你可以用JSON.stringify 方法来完成。
// console.log(JSON.stringify(config));

// JSON.stringify 和JSON.parse 是 Node 中全局可用的方法。你不需要在使用前安装或要求。
// 在读取JSON文件后，在访问或操作数据之前，你需要用JSON.parse 方法将JSON字符串反序列化为一个普通的JavaScript对象。
// const config = JSON.stringify({ ip: '1234.22.11', port: 3000});
// console.log(JSON.parse(config));

// 你可以使用下面的代码在一个JavaScript文件中加载config.json 文件。require 总是将JSON数据加载为一个JavaScript对象。
// const config = require('./config.json');
// console.log(config);



// 如何使用fs.readFile 方法读取一个JSON文件
// 你可以使用readFile 方法来读取JSON文件。它在内存中异步读取整个文件的内容，因此它不是读取大型JSON文件的最理想方法。
// readFile 方法需要三个参数。下面的代码片断显示了它的函数签名。
// const fs = require('fs');
// fs.readFile('./config.json', 'utf8', (error, data) => {
//     if(error){
//         console.log(error);
//         return;
//     }
//     console.log(JSON.parse(data));
//
// })


// 如何使用fs.readFileSync 方法读取JSON文件
// readFileSync 是另一个在Node中读取文件的内置方法，类似于readFile 。两者之间的区别是，readFile 是异步读取文件，而readFileSync 是同步读取文件。因此，readFileSync 阻止了事件循环和其余代码的执行，直到所有数据都被读取。
// const { readFileSync } = require('fs');
// const data = readFileSync('./config.json');
// console.log(JSON.parse(data));


// 如何使用fs.writeFile 方法写入JSON文件
// 如果你没有向JSON.stringify 方法传递可选的格式化参数，指定如何格式化你的JSON数据，JSON.stringify 将以单行方式格式化你的JSON数据。
// 如果你传递给writeFile 方法的路径是一个现有的JSON文件，该方法将覆盖指定文件中的数据。如果该文件不存在，它将创建一个新的文件。
// const { writeFile } = require('fs');
// const path = './config.json';
// const config = { ip: '192.0.2.1', port: 3000 };
//
// writeFile(path, JSON.stringify(config, null, 2), (error) => {
//     if (error) {
//         console.log('An error has occurred ', error);
//         return;
//     }
//     console.log('Data written successfully to disk');
// });


// 如何使用fs.writeFileSync 方法向JSON文件写入数据
// 与writeFile 不同，writeFileSync 是同步写入文件的。如果你使用writeFileSync ，你将阻塞事件循环和其他代码的执行，直到操作成功或发生错误。如果你传递的路径不存在，它将创建一个新的文件，如果存在，它将覆盖它。
// const { writeFileSync } = require('fs');
// const path = './config.json';
// const config = { ip: '192.0.2.1', port: 3000 };
//
// try {
//     writeFileSync(path, JSON.stringify(config, null, 2), 'utf8');
//     console.log('Data successfully saved to disk');
// } catch (error) {
//     console.log('An error has occurred ', error);
// }


// 如何追加一个JSON文件
// Node没有一个内置的功能来追加或更新现有JSON文件的字段。然而，你可以使用fs 模块的readFile 方法读取JSON文件，更新它，然后用更新的JSON文件覆盖JSON文件。
// const { writeFile, readFile } = require('fs');
// const path = './config.json';
//
// readFile(path, (error, data) => {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     const parsedData = JSON.parse(data);
//     parsedData.createdAt = new Date().toISOString();
//     writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
//         if (err) {
//             console.log('Failed to write updated data to file');
//             return;
//         }
//         console.log('Updated file successfully');
//     });
// });

// 如何使用第三方npm包来读写JSON文件
// 流行的第三方Node包，用于读取和写入JSON格式的数据。
// 如何使用jsonfile npm包来读写JSON文件
// jsonfile 是一个流行的npm包，用于在Node中读和写JSON文件。你可以使用下面的命令来安装它。
// npm i jsonfile
// 它与fs 模块的readFile 和writeFile 方法类似，尽管jsonfile 比内置方法有一些优势。
// 这个包的一些特点如下。
//
// 它可以对JSON进行序列化和反序列化，而且是开箱即用。
// 它有一个内置的工具用于将数据附加到JSON文件中
// 支持承诺链
//
// 你可以在下面的代码片段中看到jsonfile 包的运行情况。
// const jsonfile = require('jsonfile');
// const path = './config.json';
//
// jsonfile.readFile(path, (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(data);
// });

// 你也可以使用承诺链，而不是像上面的例子中那样传递一个回调函数。
// const jsonfile = require('jsonfile');
// const path = './config.json';
//
// jsonfile
//     .readFile(path)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });


// 如何使用fs-extra npm包来读写JSON文件
// fs-extra 是另一个流行的Node包，你可以用它来处理文件。尽管你可以使用这个包来管理JSON文件，但它的方法的功能不仅仅是读写JSON文件。
// 顾名思义，fs-extra 具有fs 模块提供的所有功能，而且还有更多。根据文档，你可以使用fs-extra 包而不是fs 模块。
// 在使用它之前，你需要先从npm安装fs-extra 。
// npm install fs-extra
// 下面的代码显示你如何使用fs-extra 包的readJson 方法来读取JSON文件。你可以使用回调函数、承诺链或async/await 。
// const fsExtra = require('fs-extra');
// const path = './config.json';
//
// // Using callback
// fsExtra.readJson(path, (error, config) => {
//     if (error) {
//         console.log('An error has occurred');
//         return;
//     }
//     console.log(config);
// });
//
// // Using promise chaining
// fsExtra
//     .readJson(path)
//     .then((config) => {
//         console.log(config);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
//
// // Using async/await
// async function readJsonData() {
//     try {
//         const config = await fsExtra.readJson(path);
//         console.log(config);
//     } catch (error) {
//         console.log(error);
//     }
// }
// readJsonData();

// 下面的代码说明了你如何使用writeJson 方法来写JSON数据。
// 就像fs 模块一样，fs-extra 也有异步和同步方法。在写到JSON文件之前，你不需要对你的JavaScript对象进行字符串化。
// 同样地，你也不需要在读取JSON文件后解析成一个JavaScript对象。该模块为你做了开箱即用的工作。
// const { writeJson } = require('fs-extra');
//
// const path = './config.json';
// const config = { ip: '192.0.2.1', port: 3000 };
//
// // Using callback
// writeJson(path, config, (error) => {
//     if (error) {
//         console.log('An error has occurred');
//         return;
//     }
//     console.log('Data written to file successfully ');
// });
//
// // Using promise chaining
// writeJson(path, config)
//     .then(() => {
//         console.log('Data written to file successfully ');
//     })
//     .catch((error) => {
//         console.log(error);
//     });
//
// // Using async/await
// async function writeJsonData() {
//     try {
//         await writeJson(path, config);
//         console.log('Data written to file successfully ');
//     } catch (error) {
//         console.log(error);
//     }
// }
// writeJsonData();


// 如何使用bfj npm包来读写JSON文件
// 在使用它之前，你需要先从npm安装bfj 。
// npm i bfj --save
// bfj 是另一个npm包，你可以用来处理JSON格式的数据。根据文档，它是为管理大型JSON数据集而创建的。
// bfj 实现了异步函数，并使用预先分配的固定长度数组，试图缓解与解析和字符串化大型JSON或JavaScript数据集有关的问题 -bfj文档
// 你可以使用read 方法读取JSON数据。read 方法是异步的，它返回一个承诺。
// 假设你有一个config.json 文件，你可以使用下面的代码来读取它。
// const bfj = require('bfj');
// const path = './config.json';
//
// bfj
//     .read(path)
//     .then((config) => {
//         console.log(config);
//     })
//     .catch((error) => {
//         console.log(error);
//     });


// 同样地，你可以使用write 方法将数据写入JSON文件。
// bfj 有很多的功能，你可以在文档中阅读。它是为处理大型JSON数据而特意创建的。它也很慢，所以你应该只在处理相对较大的JSON数据集时使用它。
// const bfj = require('bfj');
// const path = './config.json';
//
// const config = { ip: '192.0.2.1', port: 3000 };
// bfj
//     .write(path, config)
//     .then(() => {
//         console.log('Data has been successfully written to disk');
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// 写死的方式
// XML -> JSON 代码：
// pip install xml-js
// let xml = '<xml xmlns:s=\'uuid:BDC6E3F0-6DA3-11d1-A2A3-00AA00C14882\'\n' +
//     '     xmlns:dt=\'uuid:C2F41010-65B3-11d1-A29F-00AA00C14882\'\n' +
//     '     xmlns:rs=\'urn:schemas-microsoft-com:rowset\'\n' +
//     '     xmlns:z=\'#RowsetSchema\'>\n' +
//     '    <s:Schema id=\'RowsetSchema\'>\n' +
//     '        <s:ElementType name=\'row\'>\n' +
//     '            <s:AttributeType  name=\'grade\'   rs:number=\'1\'>\n' +
//     '                <s:datatype   dt:type=\'varchar\'   dt:maxLength=\'64\'/>\n' +
//     '            </s:AttributeType>\n' +
//     '            <s:AttributeType   name=\'sex\'   rs:number=\'8\'>\n' +
//     '                <s:datatype   dt:type=\'numeric\'   dt:maxLength=\'22\'/>\n' +
//     '            </s:AttributeType>\n' +
//     '        </s:ElementType>\n' +
//     '    </s:Schema>\n' +
//     '    <rs:data>\n' +
//     '        <z:row  grade=\'2\' sex=\'男\' />\n' +
//     '    </rs:data>\n' +
//     '</xml>\n'
// let convert = require('xml-js');
// let result1 = convert.xml2json(xml);
// console.log(result1);

// 读取文件的方式
// XML -> JSON 代码：
// pip install xml-js
// let filepath = '.\\TCOMPANY.xml'
// const fs = require('fs');
// let convert = require('xml-js');
// let xml = fs.readFileSync(filepath,'utf-8');
// let result1 = convert.xml2json(xml, {compact: true, spaces: 4});
// console.log(result1);


// 写死的方式
// JSON -> XML 代码：
// pip install json2xml
// let convert = require('json2xml');
// let json = {"alexa":{"@attributes":{"ver":"0.9","url":"http://coursesweb.net/","home":"0","aid":"="},"#text":"","sd":[{"@attributes":{"title":"a","host":"coursesweb.net"},"#text":"","title":{"#text":"CoursesWeb: php, mysql, html, css, javascript, ajax, jquery, actionscript, flash"},"linksin":{"@attributes":{"num":"1102"}},"speed":{"@attributes":{"pct":"51"},"#text":"4578"}},{"#text":"","popularity":{"#text":"5777"},"reach":{"@attributes":{"rank":"5952"}},"rank":{"@attributes":{"url":"http://coursesweb.net/"},"#text":"6667"}}]}};
// let xml_content = convert(json);
// console.log(xml_content);


// 读取文件的方式
// JSON -> XML 代码：
// pip install json2xml
// let filepath = '.\\config.json'
// const fs = require('fs');
// let convert = require('json2xml');
// let jsonstr = fs.readFileSync(filepath,'utf-8');
// let xml_content = convert(JSON.parse(jsonstr));
// console.log(xml_content);


// JSON -> excel 代码：
// 可以利用nodeJS把这个json文件转成xlsx文件输出，当然浏览器环境也可以做到，网上有相关的方法。
// 我这里使用了fs模块和第三方模块json2xls,所以要先安装json2xls：
// npm install json2xls -D
// 然后利用readFile读取json文件，在回调函数中遍历数组，在对象temp中定义表格需要展示的字段，再把temp添加到一个新的数组jsonArray。接着把jsonArray作为参数去调用json2xls方法，最后使用writeFileSync输出xlsx文件。
// const fs = require('fs')
// const json2xls = require('json2xls');
// fs.readFile('./name.json','utf8',(err,data)=>{
//     if (err) throw err;
//     const json = JSON.parse(data);
//     const jsonArray = [];
//     json.forEach(function(item){
//         let temp = {
//             '类型' : item.type,
//             '问题' : item.question,
//             '答案' : item.trueAnswer
//         }
//         jsonArray.push(temp);
//     });
//
//     let xls = json2xls(jsonArray);
//
//     fs.writeFileSync('name.xlsx', xls, 'binary');
// })


// excel -> JSON 代码：
// npm install node-xlsx
// const xlsx = require("node-xlsx");
// const fs = require("fs");
// // 读取xlsx
// const sheets = xlsx.parse("./name.xlsx");
// // 获取xlsx第一个标签栏的数据
// const sheetData = sheets[0].data;
// // 定义数据列表
// let testList = [];
// // 循环拼装数据
// sheetData.forEach((item, index) => {
//     if (index == 0) {
//         // 去除标题栏
//         return;
//     } else {
//         testList.push({
//             name: item[0],
//             lng: item[1],
//             lat: item[2],
//             height: item[3],
//         });
//     }
// });
// const jsonObj = testList;
// // 不压缩的情况
// // fs.writeFileSync('test-shujuchouqu.json',JSON.stringify(jsonObj, null, "\t"));
// // 压缩的情况
// fs.writeFileSync("yuanyouguanxian.json", JSON.stringify(jsonObj));
// console.log('文件转换完成')

