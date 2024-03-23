//import util module to help see the object in a more readable format.
const util = require("util");

const { Lexer } = require("./lexer");
const { Parser } = require("./parser");

const lexer = new Lexer();

//testing the lexer
const tokens = lexer.tokenize("1 * (3 - 2) - ( 2 * 8)");

const parser = new Parser(tokens);
const ast = parser.parse();
// console.log(ast);

// console.log(tokens);

console.log(util.inspect(ast, { showHidden: false, depth: null }));
