// Book constructor

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI constructor
class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list"),
      row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.isbn}</td>
                  <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
  }
  showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = ` alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container"),
      form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  clearfields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

//local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if (book.isbn == isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
document.addEventListener("DOMContentLoaded", Store.displayBooks);
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
    //add to local storage
    Store.addBook(book);
    ui.clearfields();
    ui.showAlert("Book Added", "success");
  }

  e.preventDefault();
});

// event for delete book
document.querySelector("#book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  // remove from local starage by getting the isbn number
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert("Book Deleted", "success");
  e.preventDefault();
});
