const { tokenType } = require("./lexer");

class Parser {
  #tokens = [];
  #cursor = 0;

  #at() {
    return this.#tokens[this.#cursor];
  }

  #peak(n = 1) {
    return this.#tokens[this.#cursor + n];
  }

  #eatToken(tokenType) {
    if (this.#at().type === tokenType) {
      this.#cursor++;
    } else {
      throw new Error(
        `Unexpected token ${
          this.#at().type
        }, instead received ${tokenType} at position ${this.#cursor}`
      );
    }
  }

  constructor(tokens) {
    this.#tokens = tokens;
  }

  parse() {
    return this.#parse_expression();
  }

  #parse_expression() {}
}
