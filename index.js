let booksDatabase = [];

function addBook() {
  let enrollment = document.getElementById("enrollment").value;
  let name = document.getElementById("name").value;
  let book = document.getElementById("book").value;
  let issueDate = document.getElementById("issueDate").value;

  booksDatabase.push({
    enrollment: enrollment,
    name: name,
    book: book,
    issueDate: issueDate,
  });

  alert("Book added successfully!");

  // Clear input fields
  document.getElementById("enrollment").value = "";
  document.getElementById("name").value = "";
  document.getElementById("book").value = "";
  document.getElementById("issueDate").value = "";

  // Display added books
  displayAddedBooks();
}

function displayAddedBooks() {
  let booksList = document.getElementById("booksList");
  booksList.innerHTML = "";

  booksDatabase.forEach((book, index) => {
    let listItem = document.createElement("li");
    listItem.style.marginTop = "10px";

    // Create text content for the list item
    let textContent =
      "Enrollment no.:" +
      book.enrollment +
      ", Name: " +
      book.name +
      ", Book Title: " +
      book.book +
      ", Issue Date: " +
      book.issueDate;

    // Check if the book has a fine associated with it
    if (book.fine) {
      textContent += ", Fine: " + book.fine; // Add the fine amount to the text content
    }

    listItem.textContent = textContent;

    booksList.appendChild(listItem);
  });
}

function deleteBook(index) {
  booksDatabase.splice(index, 1);
  displayAddedBooks();
}

function editBook(index) {
  let book = booksDatabase[index];
  document.getElementById("enrollment").value = book.enrollment;
  document.getElementById("name").value = book.name;
  document.getElementById("book").value = book.book;
  document.getElementById("issueDate").value = book.issueDate;
}

function searchBook() {
  let searchEnrollment = document.getElementById("searchEnrollment").value;
  let foundBooks = booksDatabase.filter(
    (book) => book.enrollment === searchEnrollment
  );

  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (foundBooks.length > 0) {
    let resultHTML =
      "<h3>Books found for Enrollment No " + searchEnrollment + ":</h3>";
    resultHTML += "<ul>";
    foundBooks.forEach((book) => {
      resultHTML +=
        "<li>Name: " +
        book.name +
        ", Enrollment no.: " +
        book.enrollment +
        ", Book Title: " +
        book.book +
        ", Issue Date: " +
        book.issueDate;
      resultHTML +=
        " <button onclick='deleteBookFromSearch(\"" +
        book.enrollment +
        "\")'>Delete</button>";
      resultHTML +=
        " <button onclick='editBookFromSearch(\"" +
        book.enrollment +
        "\")'>Edit</button></li>";
    });
    resultHTML += "</ul>";
    resultDiv.innerHTML = resultHTML;
    document.getElementById("searchEnrollment").value = "";
  } else {
    resultDiv.innerHTML =
      "<p>No books found for Enrollment No " + searchEnrollment + "</p>";
  }
}

function deleteBookFromSearch(enrollment) {
  let index = booksDatabase.findIndex((book) => book.enrollment === enrollment);
  if (index !== -1) {
    booksDatabase.splice(index, 1);
    displayAddedBooks();
    searchBook();
  }
}

function editBookFromSearch(enrollment) {
  let index = booksDatabase.findIndex((book) => book.enrollment === enrollment);
  if (index !== -1) {
    editBook(index);
    // Create input field for adding fine
    let fineInput = document.createElement("input");
    fineInput.type = "number";
    fineInput.id = "fineAmount";
    fineInput.placeholder = "Enter fine amount";
    document.getElementById("addFineSection").innerHTML = ""; // Clear previous content
    document.getElementById("addFineSection").appendChild(fineInput);

    // Create button to add fine
    let addButton = document.createElement("button");
    addButton.textContent = "Add Fine";
    addButton.onclick = function () {
      addFine(index);
    };
    document.getElementById("addFineSection").appendChild(addButton);
  }
}

function addFine(index) {
  let fineAmount = parseInt(document.getElementById("fineAmount").value);
  if (!isNaN(fineAmount)) {
    booksDatabase[index].fine = fineAmount;
    displayAddedBooks();
    document.getElementById("fineAmount").value = "";
  } else {
    alert("Please enter a valid fine amount.");
  }
}
