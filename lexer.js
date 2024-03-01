//Tokens we are going to scan for:
const TokenTypes = {
  INTEGER: "INTEGER",
  PLUS: "PLUS",
  MINUS: "MINUS",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
  LPAREN: "LPAREN",
  RPAREN: "RPAREN",
  STRING: "STRING",
  RETURN: "RETURN",
  IF: "IF",
  WHILE: "WHILE",
  FOR: "FOR",
  ELSE: "ELSE",
  CASE: "CASE",
  BREAK: "BREAK",
  CONTINUE: "CONTINUE",
  GREATER_THAN: "GREATER-THAN",
  LESS_THAN: "LESS-THAN",
  EQUAL_TO: "EQUAL-TO",
  NOT_EQUAL_TO: "NOT-EQUAL-TO",
  GREATER_OR_EQUAL: "GREATER-OR-EQUAL",
  LESS_OR_EQUAL: "LESS-OR-EQUAL",
  LOGICAL_NOT: "LOGICAL-NOT",

  EOF: "EOF",
};

class Lexer {
  //stream of characters to be tokenized. We put the hashtag to indicate that this is a private variable
  #stream = "";
  //position of the cursor in the stream of characters
  #cursor = 0;

  //constructor to initialize the class
  constructor() {}

  //method to get the character at the current position of the cursor
  #currentIndex() {
    return this.#stream[this.#cursor];
  }

  //method to tokenize the input and gives the default value of input as an empty string if no input is provided
  tokenize(input = "") {
    //initialize the stream and cursor
    this.#stream = input;
    this.#cursor = 0;

    //array to store the tokens
    const tokens = [];

    //loop through the stream of characters and tokenize them. We can add to this loop later to tokenize more speciafic sequences of characters
    while (this.#cursor < this.#stream.length) {
      switch (this.#currentIndex()) {
        //first few cases before the break are to skip over white spaces
        case " ":
        case "\t":
        case "\n":
          break;

        //mathematical operators
        case "+":
          tokens.push({ type: "PLUS", value: "+" });
          this.#cursor++;
          break;
        case "-":
          tokens.push({ type: "MINUS", value: "-" });
          this.#cursor++;
          break;
        case "*":
          tokens.push({ type: "MULTIPLY", value: "*" });
          this.#cursor++;
          break;
        case "/":
          tokens.push({ type: "DIVIDE", value: "/" });
          this.#cursor++;
          break;

        //tokens for parentheses
        case "(":
          tokens.push({ type: "LPAREN", value: "(" });
          this.#cursor++;
          break;
        case ")":
          tokens.push({ type: "RPAREN", value: ")" });
          this.#cursor++;
          break;
        case ">":
          if (
            this.#stream[this.#cursor] === ">" &&
            this.#stream[this.#cursor + 1] === "="
          ) {
            tokens.push({ type: "GREATER_OR_EQUAL", value: ">=" });
            this.#cursor++; // Advance past the '=' character
          } else {
            tokens.push({ type: "GREATER_THAN", value: ">" });
          }
          break;

        case "<":
          if (this.#stream[this.#cursor + 1] === "=") {
            tokens.push({ type: "LESS_OR_EQUAL", value: "<=" });
            this.#cursor++; // Advance past the '=' character
          } else {
            tokens.push({ type: "LESS_THAN", value: "<" });
          }
          break;

        case "=":
          if (this.#stream[this.#cursor + 1] === "=") {
            tokens.push({ type: "EQUAL_TO", value: "==" });
            this.#cursor++; // Advance past the next '=' character
          } else {
            tokens.push({ type: "ASSIGNMENT", value: "=" });
          }
          break;

        case "!":
          if (this.#stream[this.#cursor + 1] === "=") {
            tokens.push({ type: "NOT_EQUAL_TO", value: "!=" });
            this.#cursor++; // Advance past the '=' character
          } else {
            // Handle as a logical NOT, or throw an error if '!' is not used in this way in your language
            tokens.push({ type: "LOGICAL_NOT", value: "!" });
          }
          break;

        //First check if the character is a number, then check if it is a string, if neither throw an error.

        default:
          if (isNumeric(this.#currentIndex())) {
            let strNumber = "";

            while (isNumeric(this.#currentIndex())) {
              strNumber += this.#currentIndex();
              this.#cursor++;
              //   console.log(strNumber, this.#cursor, this.#at());
            }
            tokens.push({
              type: TokenTypes.INTEGER,
              value: parseInt(strNumber),
            });

            //next check if the character are alphabetic characters to form a string.
          } else if (isAlpha(this.#currentIndex())) {
            //set strValue to an empty string and go into while loop until
            //all characters are read and store into strValue for switch case comparison
            let strValue = "";
            while (isAlpha(this.#currentIndex())) {
              strValue += this.#currentIndex();
              this.#cursor++;
            }
            // Check if the string is a recognized keyword and push the token accordingly
            switch (strValue) {
              case "return":
                tokens.push({
                  type: TokenTypes.RETURN,
                  value: strValue,
                });

                break;
              case "if":
                tokens.push({
                  type: TokenTypes.IF,
                  value: strValue,
                });
                break;
              case "while":
                tokens.push({
                  type: TokenTypes.WHILE,
                  value: strValue,
                });
                break;
              case "for":
                tokens.push({
                  type: TokenTypes.FOR,
                  value: strValue,
                });
                break;
              case "else":
                tokens.push({
                  type: TokenTypes.ELSE,
                  value: strValue,
                });
                break;
              case "switch":
                tokens.push({
                  type: TokenTypes.SWITCH,
                  value: strValue,
                });
                break;
              case "case":
                tokens.push({
                  type: TokenTypes.CASE,
                  value: strValue,
                });
                break;
              case "break":
                tokens.push({
                  type: TokenTypes.BREAK,
                  value: strValue,
                });
                break;
              case "continue":
                tokens.push({
                  type: TokenTypes.CONTINUE,
                  value: strValue,
                });
                break;

              // Add other keywords as needed. We can continue to add more keywords as needed.
              //if not a keyword go into the default case and treat it as a string
              default:
                tokens.push({
                  type: TokenTypes.STRING,
                  value: strValue,
                });
            }
            /*once outside the switch case, decrement the cursor to account for the last character that was read
             signalling  the end of the string. This is so that the next character can be read and wont be skipped 
             on the next iteration of the while loop. */
            this.#cursor--;
          } else {
            throw new Error(
              `Unexpected token at position: ${
                this.#cursor
              }, instead received: '${this.#currentIndex()}'`
            );
          }
          break;
      }
      //increment the cursor to move to the next character
      this.#cursor++;
    }
    //outside the loop, push the EOF token to the array of tokens to indicate the end of the file and return the array of tokens
    tokens.push({ type: TokenTypes.EOF, value: "EOF" });
    return tokens;
  }
}

//Helper functions to check if a character is a number or a string
function isNumeric(char = "") {
  //check if the character is a number by checking its ASCII code. 0-9 are the ranges for numbers.
  return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

function isAlpha(char = "") {
  return (
    // Check if char is a letter by checking its ASCII code. A-Z OR!!! a-z are the ranges for letters.
    // if either one is true, return true.
    (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) || // Uppercase A-Z
    (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) // Lowercase a-z
  );
}

//export the Lexer class and the TokenTypes object
module.exports = { Lexer, TokenTypes };
