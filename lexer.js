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
  EOF: "EOF",
};

class Lexer {
  //stream of characters to be tokenized
  #stream = "";
  //position of the cursor in the stream of characters
  #cursor = 0;

  //constructor to initialize the class
  constructor() {}

  //method to get the character at the current position of the cursor
  #at() {
    return this.#stream[this.#cursor];
  }

  tokenize(input = "") {
    this.#stream = input;
    this.#cursor = 0;

    const tokens = [];

    while (this.#cursor < this.#stream.length) {
      switch (this.#at()) {
        case " ":
        case "\t":
        case "\n":
          break;
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
        case "(":
          tokens.push({ type: "LPAREN", value: "(" });
          this.#cursor++;
          break;
        case ")":
          tokens.push({ type: "RPAREN", value: ")" });
          this.#cursor++;
          break;

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
            tokens.push({
              type: TokenTypes.STRING,
              value: strValue,
            });
            this.#cursor--;
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
      this.#cursor++;
    }
    tokens.push({ type: TokenTypes.EOF, value: "EOF" });
    return tokens;
  }
}

function isNumeric(char = "") {
  return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

function isAlpha(char = "") {
  return /^[a-zA-Z]+$/.test(char);
}

module.exports = { Lexer, TokenTypes };
