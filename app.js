// Book constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  console.log(book.title.length);
  const list = document.getElementById("book-list"),
    row = document.createElement("tr");
  row.innerHTML = `<td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.isbn}</td>
                  <td><a href="#" class="delete">X</a></td>`;
  list.appendChild(row);
};

UI.prototype.showAlert = function(msg, className) {
  const div = document.createElement("div");
  div.className = ` alert ${className}`;
  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector(".container"),
    form = document.querySelector("#book-form");
  container.insertBefore(div, form);
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.clearfields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// event for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please insert all values", "error");
  } else {
    ui.addBookToList(book);
    ui.clearfields();
    ui.showAlert("Book Added", "success");
  }

  e.preventDefault();
});

// event for delete book
document.querySelector("#book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book Deleted", "success");
  e.preventDefault();
});
