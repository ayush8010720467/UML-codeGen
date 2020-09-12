# UML Code Gene

UML Code gen is a cli tool created in node in order to generate the Boilerplate code for the given Class diagram in form of JSON format. 

## Installation
<!---
Use the package manager [npm](https://www.npmjs.com/) to install uml-code-gen.
```bash
npm install -g uml-code-gen
```
-->
For Local, you can run the script just like any other Node.js application. Try entering the following from the command line.
```bash
node .
```
However, the goal of writing a script like this is to be able to run it from anywhere. You can do that with the ```npm install``` command.

```bash
npm install -g .
```
This installs your script “globally.”
## Uninstallation
In order to uninstall the script, run the following command.
```bash
npm uninstall -g uml-code-gen
```

## Usage
```bash
codegen -j <JSON file location> -d <Destination of the generated files>
```
Please download the [test.json](https://github.com/ayush8010720467/UML-codeGen/blob/master/test.json) file as a sample signature for the JSON file and make changes accordingly.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)