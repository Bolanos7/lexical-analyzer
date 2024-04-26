const { TokenTypes } = require("./lexer");

class Parser {
  //private variables to store the tokens and the cursor
  #tokens = [];
  #cursor = 0;

  //private methods to get the current token, the next token and to eat the token
  #currentIndex() {
    return this.#tokens[this.#cursor];
  }

  //return the token in the next position of the current token

  #peak(n = 1) {
    return this.#tokens[this.#cursor + n];
  }
  //increment the cursor to the next token if the token type is the same as the current token type
  //else throw an error
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

  //constructor to initialize the tokens
  constructor(tokens) {
    this.#tokens = tokens;
  }

  //main method to parse the tokens. This is where the parsing of the tokens begins
  parse() {
    return this.#parse_expression();
  }

  // parse addition/subtraction
  #parse_expression() {
    //parse the term will return the left hand side of the expression
    let leftHandSide = this.#parse_term();

    // while the current token is either a plus or minus token = true, go into the loop
    while (
      this.#currentIndex().type == TokenTypes.PLUS ||
      this.#currentIndex().type == TokenTypes.MINUS
    ) {
      // if condition is true, return the left hand side(PLUS) else return the right hand side(MINUS)
      // and store into ttype
      const operator = this.#currentIndex().value;
      const ttype =
        this.#currentIndex().type === TokenTypes.PLUS ? "PLUS" : "MINUS";
      this.#eatToken(ttype);
      //parse the term will return the right hand side of the expression
      let rhs = this.#parse_term();

      //store the left hand side and right hand side into a binary operator object
      leftHandSide = {
        type: "BinaryOperator",
        operator: operator,
        leftHandSide: leftHandSide,
        rightHandSide: rhs,
      };
    }

    //return the object with the left hand side and right hand side
    return leftHandSide;
  }

  //multiplication and division
  #parse_term() {
    //parse the factor will return the left hand side of the expression
    let leftHandSide = this.#parse_factor();

    // while the current token is either a multiply or divide token = true, go into the loop
    while (
      this.#currentIndex().type == TokenTypes.MULTIPLY ||
      this.#currentIndex().type == TokenTypes.DIVIDE
    ) {
      // if condition is true, return the left hand side(DIVIDE)
      //else return the right hand side(MULTIPLY)

      const operator = this.#currentIndex().value;
      const ttype =
        this.#currentIndex().type == TokenTypes.DIVIDE ? "DIVIDE" : "MULTIPLY";
      this.#eatToken(ttype);

      //parse the factor will return the right hand side of the expression
      let rhs = this.#parse_factor();

      //store the left hand side and right hand side into a binary operator object
      leftHandSide = {
        type: "BinaryOperator",
        operator: operator,
        leftHandSide: leftHandSide,
        rightHandSide: rhs,
      };
    }

    //return the object with the left hand side and right hand side
    return leftHandSide;
  }

  //Highest precedence is given to the parentheses expression

  //if the current token is an integer, return the integer
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

    //if the current token is a left parenthesis, parse the expression and return the expression
    if (this.#currentIndex().type == TokenTypes.LPAREN) {
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

  #checkBinaryOperator(operator, left, right) {
    // Check for numeric operands
    if (typeof left !== 'number' || typeof right !== 'number') {
      throw new Error(`Operands must be numeric for operator '${operator}'`);
    }

    // Division by zero check
    if (operator === '/' && right === 0) {
      throw new Error(`Division by zero error`);
    }

    // Return the result of the operation
    switch (operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      default:
        throw new Error(`Unsupported operator '${operator}'`);
    }
  }

  #evaluateExpression(expression) {
    if (expression.type === 'NumericLiteral') {
      return parseInt(expression.value); // Parse the value as an integer
    } else if (expression.type === 'BinaryOperator') {
      const left = this.#evaluateExpression(expression.leftHandSide);
      const right = this.#evaluateExpression(expression.rightHandSide);
      return this.#checkBinaryOperator(expression.operator, left, right);
    }
  }

  parse() {
    const parsedExpression = this.#parse_expression();
    const result = this.#evaluateExpression(parsedExpression);
    return result;
  }
}






module.exports = { Parser };
