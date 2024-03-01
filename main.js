const { Lexer } = require("./lexer");
// const { Parser } = require("./parser");

const lexer = new Lexer();
const tokens = lexer.tokenize(">=");
// const parser = new Parser(tokens);

// const ast = parser.parse();
console.log(tokens);
