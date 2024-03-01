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
  #at() {
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
      switch (this.#at()) {
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

        //First check if the character is a number, then check if it is a string, if neither throw an error.

        default:
          if (isNumeric(this.#at())) {
            let strNumber = "";

            while (isNumeric(this.#at())) {
              strNumber += this.#at();
              this.#cursor++;
              //   console.log(strNumber, this.#cursor, this.#at());
            }
            tokens.push({
              type: TokenTypes.INTEGER,
              value: parseInt(strNumber),
            });
          } else if (isAlpha(this.#at())) {
            // Check for alphabetic characters to form a string
            let strValue = "";
            while (isAlpha(this.#at())) {
              strValue += this.#at();
              this.#cursor++;
            }
            if (strValue === "return") {
              tokens.push({
                type: TokenTypes.RETURN,
                value: strValue,
              });
              this.#cursor--;
            } else if (strValue === "if") {
              tokens.push({
                type: TokenTypes.IF,
                value: strValue,
              });
              this.#cursor--;
            } else if (strValue === "while") {
              tokens.push({
                type: TokenTypes.WHILE,
                value: strValue,
              });
              this.#cursor--;
            } else {
              tokens.push({
                type: TokenTypes.STRING,
                value: strValue,
              });
              this.#cursor--;
            }
            /* At this point, cursor is positioned on first char that doesn't belong to the string 
                We already increment at the end of the loop and since the char doesn't belong,
                we want to make sure it doesn't get skipped on the next iteration. Thus, we must decrement.*/
            // console.log(this.#at());
          } else {
            throw new Error(
              `Unexpected token at position: ${
                this.#cursor
              }, instead received: '${this.#at()}'`
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
