const myLibrary = [];

function Book(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
    this.info = function() {
        let str = this.title + " by " + this.author + ", " + this.num_pages + " pages. ";
        return read === 'Yes' ? str += "Read." : str += " Not read yet.";
    };
}

function addBookToLibrary() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value;
    myLibrary.push(new Book(title, author, pages, read));
    updateDisplay(myLibrary.length - 1);
}

function updateDisplay(index) {
    let titleCol = document.createElement('div');
    let authorCol = document.createElement('div');
    let pagesCol = document.createElement('div');
    let readCol = document.createElement('select');
    let remove = document.createElement('button');

    titleCol.className = 'index' + index;
    authorCol.className = 'index' + index;
    pagesCol.className = 'index' + index;
    readCol.className = 'index' + index;
    remove.className = 'index' + index;

    readCol.id = 'status';
    remove.id = 'remove';
    remove.dataset.index = index;

    const book = myLibrary[myLibrary.length - 1];
    titleCol.textContent = book.title;
    authorCol.textContent = book.author;
    pagesCol.textContent = book.num_pages;
    readCol.textContent = book.read;
    remove.textContent = 'X';
    document.querySelector('.container').append(titleCol, authorCol, pagesCol, readCol, remove);

    let read = document.createElement('option');
    let notRead = document.createElement('option');
    read.textContent = 'Yes';
    notRead.textContent = 'No';

    readCol.append(read, notRead);

    if (book.read === 'Yes') {
        readCol.selectedIndex = 0;
    } else {
        readCol.selectedIndex = 1;
    }

    remove.addEventListener('click', () => {
        removeEntry(remove.dataset.index);
    });
}

// Event listeners/functions for the buttons
const dialog = document.querySelector('dialog');
const cancelEntry = document.querySelector('.cancel');
const addNewButton = document.querySelector('.add_new');
const addBook = document.querySelector('.add_book');
const invalidForm = document.querySelector('.invalidForm');
const closeButton = document.querySelector('.invalidForm button');
addNewButton.addEventListener('click', () => {
    document.querySelector('form').reset();
    dialog.showModal();
});

cancelEntry.addEventListener('click', () => {
    dialog.close();
});

addBook.addEventListener('click', (e) => {
    e.preventDefault();
    if (!document.querySelector('form').checkValidity()) {
        invalidForm.showModal();
    } else {
        addBookToLibrary();
        dialog.close();
    }
});

closeButton.addEventListener('click', () => {
    invalidForm.close();
});

const titleEntry = document.getElementById('title');
titleEntry.addEventListener('keydown', (e) => {
    checkInput(e, '.titleInput', new RegExp('[a-zA-Z]+'), 
    'Must enter letters in the English alphabet.');
});

const authorEntry = document.getElementById('author');
authorEntry.addEventListener('keydown', (e) => {
    checkInput(e, '.authorInput', new RegExp('[a-zA-Z]+'), 
    'Must enter letters in the English alphabet.');
});

const pagesEntry = document.getElementById('pages');
pagesEntry.addEventListener('keydown', (e) => {
    checkInput(e, '.pagesInput', new RegExp('^[1-9]{1}[0-9]*$'), 
    'Must enter valid numerical values.');
});

function checkInput(e, className, regex, msg) {
    const key = e.key;
    if (!regex.test(key) && key !== 'Backspace') {
        e.preventDefault();
        document.querySelector(className).textContent = msg;
    } else {
        document.querySelector(className).textContent = '';
    }
}

function removeEntry(index) {
    document.querySelectorAll('.index' + index).forEach(el => el.remove());
    myLibrary.splice(index, 1);
}