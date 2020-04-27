// A reminder to make your JS Modular here. You will need seperate functions for seperate pages, I would imagine. This is your first multipage effort, afterall. Good Luck!
const body = document.querySelector('.content');

// Data Retrieval

async function getContent() {
  const response = await fetch('http://localhost:3000/api/posts', {
    mode: 'cors',
  });
  const content = await response.json();
  return content.postList;
}

// Connect DOM to Content

async function displayContent() {
  const content = await getContent.getContent();
  content.forEach((post) => {
    let postElement = createPostElement(post);
    body.appendChild(postElement);
  });
}

// DOM Manipulation

function createPostElement(postContent) {
  let postElement = document.createElement('div');
  let postBodyElement = document.createElement('div');
  let postFooter = document.createElement('div');
  let titleHeading = document.createElement('h5');
  let postTextElement = document.createElement('div');
  let dateElement = document.createElement('div');
  let authorElement = document.createElement('p');

  postElement.classList.add('card');
  postBodyElement.classList.add('card-body');
  titleHeading.classList.add('card-title');
  postFooter.classList.add('card-footer');
  postFooter.classList.add('text-muted');
  authorElement.classList.add('text-muted');

  titleHeading.innerText = postContent.title;
  postTextElement.innerText = postContent.text;
  dateElement.innerText = postContent.date;
  authorElement.innerText = postContent.author;

  postBodyElement.appendChild(titleHeading);
  postBodyElement.appendChild(postTextElement);
  postBodyElement.appendChild(authorElement);
  postFooter.appendChild(dateElement);
  postElement.appendChild(postBodyElement);
  postElement.appendChild(postFooter);
  return postElement;
}

displayContent();
