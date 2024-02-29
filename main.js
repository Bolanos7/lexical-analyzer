const { Lexer } = require("./lexer");
const lexer = new Lexer();

const tokens = lexer.tokenize("10 + 45 - 3      hello world");
console.log(tokens);
