//import util module to help see the object in a more readable format.
const util = require("util");

const { Lexer } = require("./lexer");
const { Parser } = require("./parser");

const lexer = new Lexer();

//testing the lexer and parser
const tokens = lexer.tokenize("(10 -2 + 4 / 3) + ( 3 - 1)");

const parser = new Parser(tokens);
const ast = parser.parse();
// console.log(ast);

// console.log(tokens);

console.log(util.inspect(ast, { showHidden: false, depth: null }));
