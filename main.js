const { Lexer } = require("./lexer");
// const { Parser } = require("./parser");

const lexer = new Lexer();
const tokens = lexer.tokenize(">= 1+2 sg3g 3rv");
// const parser = new Parser(tokens);

// const ast = parser.parse();
console.log(tokens);
