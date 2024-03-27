const myLibrary = [];

function Book(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
    this.info = function() {
        let str = this.title + " by " + this.author + ", " + this.num_pages + " pages. ";
        return read ? str += "Read." : str += " Not read yet.";
    };
}

// function addBookToLibrary() {
//     let title = document.getElementById('title').value;
//     let author = document.getElementById('author').value;
//     let pages = document.getElementById('pages').value;
//     let read = document.getElementById('read').checked;
//     myLibrary.push(new Book(title, author, pages, read));
//     updateDisplay();
// }

// function updateDisplay() {
//     let t = document.createElement('div');
//     let a = document.createElement('div');
//     let p = document.createElement('div');
//     let r = document.createElement('div');
//     t.textContent = myLibrary[myLibrary.length - 1].title;
//     a.textContent = myLibrary[myLibrary.length - 1].author;
//     p.textContent = myLibrary[myLibrary.length - 1].num_pages;
//     r.textContent = myLibrary[myLibrary.length - 1].read;
//     document.querySelector('.container').append(t);
// }

const dialog = document.querySelector('dialog');
const cancelEntry = document.querySelector('.cancel');
const addNewButton = document.querySelector('.add_new');
const addBook = document.querySelector('.add_book');
addNewButton.addEventListener('click', () => {
    dialog.showModal();
});

cancelEntry.addEventListener('click', () => {
    dialog.close();
});

addBook.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
});

// TODO: add error messages to notify users of invalid input

const titleEntry = document.getElementById('title');
titleEntry.addEventListener('keydown', checkText, false);

const authorEntry = document.getElementById('author');
authorEntry.addEventListener('keydown', checkText, false);

const pagesEntry = document.getElementById('pages');
pagesEntry.addEventListener('keydown', (e) => {
    const key = e.key;
    const regex = new RegExp('[0-9]+');
    if (!regex.test(key)) {
        e.preventDefault();
    }
});

function checkText(e) {
    const key = e.key;
    const regex = new RegExp('[A-Za-z]+');
    if (!regex.test(key)) {
        e.preventDefault();
    }
}
