const { tokenType } = require("./lexer");

class Parser {
  #tokens = [];
  #cursor = 0;

  #currentIndex() {
    return this.#tokens[this.#cursor];
  }

  #peak(n = 1) {
    return this.#tokens[this.#cursor + n];
  }

  #eatToken(tokenType) {
    if (this.#currentIndex().type === tokenType) {
      this.#cursor++;
    } else {
      throw new Error(
        `Unexpected token ${
          this.#currentIndex().type
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

  // parse addition/subtraction
  #parse_expression() {
    let leftHandSide = this.#parse_term();

    // while the current token is either a plus or minus token = true, go into the loop
    while (
      this.#currentIndex().type === tokenType.PLUS ||
      this.#currentIndex().type === tokenType.SUBTRACT
    ) {
      // if parentheses is true, return the left hand side(PLUS) else return the right hand side(MINUS) and store into ttype
      const operator = this.#currentIndex.value;
      const ttype =
        this.#currentIndex().type === tokenType.PLUS ? "PLUS" : "MINUS";
      this.#eatToken(ttype);
      let rhs = this.#parse_expression();
      leftHandSide = {
        type: "BinaryOperator",
        operator: operator,
        leftHandSide: leftHandSide,
        rightHandSide: rhs,
      };
    }

    return leftHandSide;
  }

  //multiplication and division
  #parse_term() {
    let leftHandSide = this.#parse_factor();

    return leftHandSide;
  }

  //Higher precedence
  #parse_factor() {
    return { type: "NumericLiteral", value: this.#currentIndex().value };
    this.#eatToken(tokenType.INTEGER);
    return literal;
  }
}

module.exports = { Parser };
