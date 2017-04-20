"use strict"
const operators = ['|+', '|-', '|*', '|/', '|%', '<', '>', '!', '|&', '|#', '[', ']', '(', ')'];
const keywords = ['var', 'fi', 'elif', 'loop', 'digit', 'number', 'rational', 'acquire', 'display'];
const symbols = [' ', '=', ':', ',', ';'];
var fs = require('fs');
var input =fs.readFileSync('./code.20pp','utf8');
//console.log("{ \"input\":\""+fs.readFileSync('./code.20pp','utf8')+"\"}");
//var obj = JSON.parse(("{ \"input\":\""+ fs.readFileSync('./code.20pp', 'utf8')+"\"}").slice(0, -4));
let output = { identifiers: [], constants: [], operators: [], keywords: [] };
function isOperator(string) {
  return operators.indexOf(string) > -1;
}

function isSymbol(string) {
  return symbols.indexOf(string) > -1;
}

function isKeyword(string) {
  return keywords.indexOf(string) > -1;
}

function isConstant(string) {
  return new RegExp(/^\d+$/).test(string);
}

function addToOutput(string) {
  if (!string) return;
  if (isOperator(string)) {
    output.operators.push(string);
  } else if(isKeyword(string)) {
    output.keywords.push(string);
  } else if(isConstant(string)) {
    output.constants.push(string);
  } else {
      if(string!="\n" && string != '\r\n')
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
  var Table = require('cli-table');
  var table = new Table({
    head: ['Identifiers', 'Operators', 'Keywords', 'Constants'],
    colWidth: [300, 300,300,300]
  });
  const len = Math.max(...[output.identifiers.length, output.keywords.length, output.operators.length, output.constants.length]);
  for (let i = 0; i < len; i++) {
    table.push([output.identifiers[i] ? output.identifiers[i]: '', output.operators[i] ? output.operators[i] : '',
      output.keywords[i] ? output.keywords[i] : '', output.constants[i] ? output.constants[i] : ''
    ]);
  }
  console.log(table.toString());
  output ={identifiers: [], constants: [], operators: [], keywords: [] };
}
analyse(input);
dispalyOutput();
