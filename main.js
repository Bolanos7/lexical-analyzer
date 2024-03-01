const { Lexer } = require("./lexer");
// const { Parser } = require("./parser");

const lexer = new Lexer();
const tokens = lexer.tokenize("10 + 3 if while ifr oif return");
// const parser = new Parser(tokens);

// const ast = parser.parse();
console.log(tokens);
