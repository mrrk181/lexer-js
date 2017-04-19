const operators = ['|+', '|-', '|*', '|/', '|%', '<>', '!', '|&', '|#', '[', ']', '(', ')'];
const keywords = ['var', 'fi', 'elif', 'loop', 'digit', 'rational', 'acquire', 'display'];
const alphabets = 'abcdefghijklmnopqrstuvwxyz'
const output = { operators: [], keywords: [] };
function isOperator(string) {
  return operators.indexOf(string) > -1;
}

function isKeyword(string) {
  return keywords.indexOf(string) > -1;
}

function analyse(string) {
  const splitByDot = string.split('.');
  let currentLine;
  for(let i=0; i < splitByDot.length; i++) {
    currentLine = splitByDot[i];
    let splitedLine = currentLine.split(':'); // to check if declaration
    if (splitedLine.length > 1) { // iden

    }
  }
}
