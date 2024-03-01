const { Lexer } = require("./lexer");
// const { Parser } = require("./parser");

const lexer = new Lexer();
const tokens = lexer.tokenize("(1>=1 >2) * ...3 - .4 / 5");
// const parser = new Parser(tokens);

// const ast = parser.parse();
console.log(tokens);
