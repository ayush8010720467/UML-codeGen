#!/usr/bin/env node
const yargs = require("yargs");

const chalk = require("chalk");
const boxen = require("boxen");

const greeting = chalk.green("WELCOME TO CODEGEN");
const sucess_file = chalk.hex('#00FF00')("File Created Sucessfully");
const failed_to_create_file = chalk.red('Unable to create a file');
const nameDuplicacy = chalk.red('Duplicate Class name found');
const cyclic_dependency = chalk.red('Found a cyclic dependency');
const sucess = chalk.green("Sucessfuly Generated the files")
var flag = true;
const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#000"
};
const msgBox = boxen(greeting, boxenOptions);

console.log(msgBox);

const options = yargs
    .usage("Usage: -j <JSONfile> -d <destination>")
    .option("j", { alias: "JSONfile", describe: "Your JSON", type: "string", demandOption: true })
    .option("d", { alias: "destination", describe: "destination of the generated files", type: "string", demandOption: true })
    .argv;
const data = require(options.JSONfile)
function checkDuplicate(arr) {
    let obj = {}
    arr.forEach((elem) => {
        if (obj[elem.name]) {
            obj[elem.name]++;
            flag = false;
            console.log(nameDuplicacy)
        } else {
            obj[elem.name] = 1;
        }
    })
}
checkDuplicate(data.classes)
function generateAdjList(obj) {
    let adj = {}
    obj.classes.forEach((elem) => {
        adj[elem.name] = elem.extends
    })
    return adj;
}

if (flag) {
    let color = {}
    let adj = generateAdjList(data)
    dfs(color, data.classes[0].name)
    function dfs(color, source) {
        if (color[source] == 'black') {
            return;
        } else if (color[source] == 'grey') {
            console.log(cyclic_dependency)
            flag = false;
            return;
        } else {
            color[source] = 'grey';
            let arr = adj[source];
            arr.forEach((elem) => {
                dfs(color, elem)
            })
            color['source'] = 'black'
        }
    }
    if (flag) {
        // create the files and add the exteds keyword accordingly
        let content=(name, arr)=> {
            if (arr.length > 0) {
                return `public class ${name} extends ${arr.join(', ')}{\n\tconstructor(){}\n}`
            } else {
                return `public class ${name} {\n\tconstructor(){}\n}`
            }
        }
        for (let i = 0; i < data.classes.length; i++) {
            let fs = require('fs');
            let file_name = data.classes[i].name + data.extinction;
            let content_in_file = content(data.classes[i].name, data.classes[i].extends);
            fs.writeFile(file_name, content_in_file, (err) => {
                if (err) {
                    throw err;
                    console.log(failed_to_create_file)
                    flag = false
                }
                console.log(sucess_file)
            })
        }
    } else {
        console.log(chalk.hex('#64d4fa')("please fix errors in JSON file first to continue...."))
    }
} else {
    console.log(chalk.hex('#64d4fa')("please fix errors in JSON file first to continue...."))
}