class GuestBook {
  #comments;

  constructor(comments) {
    this.#comments = comments;
  }

  #createComment({ name, comment }) {
    return {
      date: new Date().toLocaleString(),
      name,
      comment
    };
  }

  addComment(comment) {
    this.#comments.unshift(this.#createComment(comment));
  }

  get comments() {
    return this.#comments;
  }

}

module.exports = { GuestBook };
