class Parser {
  #tokens = [];
  #cursor = 0;

  #at() {
    return this.#tokens[this.#cursor];
  }

  #peak(n = 1) {
    return this.#tokens[this.#cursor + n];
  }

  #eatToken(type) {
    if (this.#at().type === type) {
      this.#cursor++;
    } else {
      throw new Error(`Unexpected token ${this.#at().type}`);
    }
  }

  constructor(tokens) {
    this.#tokens = tokens;
  }
}
