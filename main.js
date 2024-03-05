const { Lexer } = require("./lexer");

const lexer = new Lexer();

//testing the lexer
const tokens = lexer.tokenize(
  "Hello {2} + (1>=1) == 2 break continue ) if while for . ..." +
    "more testing here null @ , ; 4%3 Thank you for using the lexer!"
);
console.log(tokens);
