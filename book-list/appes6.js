class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    //create tr element
    const row = document.createElement("tr");
    //Instert cols
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//event listeners
document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // instantiate book
  const book = new Book(title, author, isbn);

  //instantiate ui
  const ui = new UI();

  //validation
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    //show success
    ui.showAlert("Book Added", "success");
    // clear fields
    ui.clearFields();
  }
});

//Delete event listenr
document.getElementById("book-list").addEventListener("click", (e) => {
  e.preventDefault();

  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert("Book deleted", "success");
});
