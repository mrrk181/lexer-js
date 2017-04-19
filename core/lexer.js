const operators = ['|+', '|-', '|*', '|/', '|%', '<', '>', '!', '|&', '|#', '[', ']', '(', ')'];
const keywords = ['var', 'fi', 'elif', 'loop', 'digit', 'number', 'rational', 'acquire', 'display'];
const symbols = [' ', '=', ':', ',', ';'];
const alphabets = 'abcdefghijklmnopqrstuvwxyz'
var fs = require('fs');
console.log("{ \"input\":\""+fs.readFileSync('./code.20pp','utf8')+"\"}");
//var obj = JSON.parse(("{ \"input\":\""+ fs.readFileSync('./code.20pp', 'utf8')+"\"}").slice(0, -4));
let output = { identifiers: [], operators: [], keywords: [] };
function isOperator(string) {
  return operators.indexOf(string) > -1;
}

function isSymbol(string) {
  return symbols.indexOf(string) > -1;
}

function isKeyword(string) {
  return keywords.indexOf(string) > -1;
}

function addToOutput(string) {
  if (!string) return;
  if (isOperator(string)) {
    output.operators.push(string);
  } else if(isKeyword(string)) {
    output.keywords.push(string);
  } else {
    output.identifiers.push(string);
  }
}

function analyse(string) {
  const splitByDot = string.split('.');
  let currentLine;
  for(let i=0; i < splitByDot.length; i++) {
    currentLine = splitByDot[i];
    if (currentLine.length < 2) {
      output.operators.push(currentLine);
      continue;
    }
    let lastIdentified = '';
    for (let j=0;j < currentLine.length; j++) {
      let currentChar = currentLine[j];
      if (isSymbol(currentChar)) {
        addToOutput(lastIdentified);
        lastIdentified = '';
        continue;
      } else if (isOperator(currentChar)) {
        output.operators.push(currentChar);
        addToOutput(lastIdentified);
        lastIdentified = '';
        continue; // if no continue then it'll add all chars to lastIdentified
      }
      lastIdentified += currentChar;
    }
  }
}
function dispalyOutput(){
    console.log("Identifiers");
    console.log(output.identifiers);
    console.log("Keywords");
    console.log(output.keywords);
    console.log("operators");
    console.log(output.operators);
    output ={identifiers: [], operators: [], keywords: [] };
}
