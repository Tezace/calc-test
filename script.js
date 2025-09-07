let currentInput = '';
let operatorStack = [];
let operandStack = [];

function appendToDisplay(value) {
  currentInput += value;
  document.getElementById('display').value = currentInput;
}

function clearDisplay() {
  currentInput = '';
  operatorStack = [];
  operandStack = [];
  document.getElementById('display').value = '';
}

function calculate() {
  if (currentInput === '') return;

  let tokens = tokenize(currentInput);
  let postfix = infixToPostfix(tokens);
  let result = evaluatePostfix(postfix);
  document.getElementById('display').value = result;
  currentInput = result.toString();
}

function tokenize(expression) {
  let regex = /\d+(\.\d*)?|\+|\-|\*|\//g;
  return expression.match(regex);
}

function precedence(op) {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  return 0;
}

function infixToPostfix(tokens) {
  let output = [];
  let stack = [];

  for (let token of tokens) {
    if (/\d/.test(token)) {
      output.push(parseFloat(token));
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      stack.pop();
    } else {
      while (stack.length && precedence(stack[stack.length - 1]) >= precedence(token)) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length) {
    output.push(stack.pop());
  }

  return output;
}

function evaluatePostfix(postfix) {
  let stack = [];

  for (let token of postfix) {
    if (typeof token === 'number') {
      stack.push(token);
    } else {
      let b = stack.pop();
      let a = stack.pop();
      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
      }
    }
  }

  return stack.pop();
}
