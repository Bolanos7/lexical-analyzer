const { Lexer } = require("./lexer");
const { Parser } = require("./parser");

const lexer = new Lexer();

//testing the lexer
const tokens = lexer.tokenize("1 +3 - 2");

const parser = new Parser(tokens);
const ast = parser.parse();
console.log(ast);
// console.log(tokens);
