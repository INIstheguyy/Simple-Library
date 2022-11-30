let newbtn = document.querySelector("#newBtn");
let formctn = document.querySelector(".form");
let closeform = document.querySelector(".close");
let submit = document.querySelector(".submit");
let library = document.querySelector("#libraryContainer");
let boook = document.querySelectorAll("#book");
let title = document.querySelector("#titleTxt");
let author = document.querySelector("#authorTxt");
let pages = document.querySelector("#pagesTxt");
let read = document.querySelector('#readTxt')

// let titleText = document.querySelector("#titleTxt");
// let authorText = document.querySelector("#authorTxt");
// let pagesText = document.querySelector("#pagesTxt");
let myLibrary = [];
newbtn.addEventListener("click", function () {
  formctn.style.display = "block";
});
closeform.addEventListener("click", function () {
  formctn.style.display = "none";
});
localStorage.getItem(`myLibrary`);
class Book {
  constructor(title, author, pages,read) {
    this.title = title.value;
    this.author = author.value;
    this.pages = pages.value;
    this.read = read.checked
  }
}

submit.addEventListener("click", function (event) {
  event.preventDefault();
  // body.style.background = "black";
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  clearInputs();
  iltrateData();
  setData();
  formctn.style.display = "none";
  console.log(myLibrary);
});

function clearInputs() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = undefined;
}

function iltrateData() {
  library.textContent = "";
  // myLibrary.forEach((book, index) => {
  //   storeData(book, index);
  // });
  for(let i = 0; i < myLibrary.length; i++) {
    storeData(myLibrary[i])
  }
  setData();
}


function storeData(book) {
  const buk = document.createElement('div')
  buk.classList.add('book')
  const newCardDiv = document.createElement("div");
  newCardDiv.classList.add("card");

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("title");
  cardTitle.innerText = book.title;
  newCardDiv.append(cardTitle);

  const cardAuth = document.createElement("h2");
  cardAuth.classList.add("author");
  cardAuth.innerText = book.author;
  newCardDiv.append(cardAuth);

  const cardPages = document.createElement("h2");
  cardPages.classList.add("pages");
  cardPages.innerText = book.pages + 'pgs';
  newCardDiv.append(cardPages);

  const cardRead = document.createElement('button');
  cardRead.classList.add("read")
  if(book.read === true){
    cardRead.style.backgroundColor = 'green';
    cardRead.textContent = 'Read'
  }else{
    cardRead.style.backgroundColor = 'Red';
    cardRead.textContent = 'Not read'
  }
  const cardRme = document.createElement('button')
  cardRme.textContent = 'Remove'
  cardRme.classList.add('remove')
  
  cardRead.addEventListener('click', function(){
    book.read = !book.read;
    setData();
    iltrateData();
  })
  cardRme.addEventListener('click', function(item){
    myLibrary.splice(myLibrary.indexOf(item),1);
    // for(let i = 0; i < myLibrary.length; i++) {
    //   myLibrary.splice(i,1);
    // }
    setData();
    iltrateData();
  });
  newCardDiv.append(cardRead)
  newCardDiv.append(cardRme)
  

  buk.append(newCardDiv);
  library.append(buk)
}
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}
function restore() {
  if(!localStorage.myLibrary) {
      iltrateData();
  }else {
      let objects = localStorage.getItem('myLibrary')
      objects = JSON.parse(objects);
      myLibrary = objects;
      iltrateData();
  }
}

restore();


