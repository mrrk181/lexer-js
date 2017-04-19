const operators = ['|+', '|-', '|*', '|/', '|%', '<>', '!', '|&', '|#', '[', ']', '(', ')'];
const keywords = ['var', 'fi', 'elif', 'loop', 'digit', 'rational', 'acquire', 'display'];
const symbols = [' ', '=', ':', ',', ';'];
const alphabets = 'abcdefghijklmnopqrstuvwxyz'
const output = { operators: [], keywords: [] };
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
