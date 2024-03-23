const { TokenTypes } = require("./lexer");

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
    if (tokenType == this.#currentIndex().type) {
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
      this.#currentIndex().type == TokenTypes.PLUS ||
      this.#currentIndex().type == TokenTypes.MINUS
    ) {
      // if parentheses is true, return the left hand side(PLUS) else return the right hand side(MINUS) and store into ttype
      const operator = this.#currentIndex().value;
      const ttype =
        this.#currentIndex().type === TokenTypes.PLUS ? "PLUS" : "MINUS";
      this.#eatToken(ttype);
      let rhs = this.#parse_term();
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

    // while the current token is either a plus or minus token = true, go into the loop
    while (
      this.#currentIndex().type == TokenTypes.MULTIPLY ||
      this.#currentIndex().type == TokenTypes.DIVIDE
    ) {
      // if parentheses is true, return the left hand side(PLUS) else return the right hand side(MINUS) and store into ttype
      const operator = this.#currentIndex().value;
      const ttype =
        this.#currentIndex().type == TokenTypes.DIVIDE ? "DIVIDE" : "MULTIPLY";
      this.#eatToken(ttype);
      let rhs = this.#parse_factor();
      leftHandSide = {
        type: "BinaryOperator",
        operator: operator,
        leftHandSide: leftHandSide,
        rightHandSide: rhs,
      };
    }

    return leftHandSide;
  }

  //Higher precedence
  #parse_factor() {
    if (this.#currentIndex().type == TokenTypes.INTEGER) {
      let literal = {
        type: "NumericLiteral",
        value: this.#currentIndex().value,
      };
      this.#eatToken(TokenTypes.INTEGER);
      return literal;
    }
    // console.log(this.#currentIndex().type);

    //parentheses expression

    let expression;

    if (this.#currentIndex().type != TokenTypes.RPAREN) {
      this.#eatToken(TokenTypes.LPAREN);
      let expression = this.#parse_expression();
      this.#eatToken(TokenTypes.RPAREN);
      return expression;
    }

    throw Error(
      ` Expected a parenthesis token or a integer token in input instead received: ${JSON.stringify(
        this.#currentIndex()
      )} at position ${this.#cursor}`
    );
  }
}

module.exports = { Parser };
