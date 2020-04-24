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
  const content = await getContent();
  console.log(content);
  content.forEach((post) => {
    let postDiv = createPostElement(post);
    body.appendChild(postDiv);
  });
}

// DOM Manipulation

function createPostElement(postContent) {
  let postDiv = document.createElement('div');
  let postBodyDiv = document.createElement('div');
  let postFooter = document.createElement('div');
  let titleHeading = document.createElement('h5');
  let textDiv = document.createElement('div');
  let dateDiv = document.createElement('div');

  postDiv.classList.add('card');
  postBodyDiv.classList.add('card-body');
  titleHeading.classList.add('card-title');
  postFooter.classList.add('card-footer');
  postFooter.classList.add('text-muted');

  titleHeading.innerText = postContent.title;
  textDiv.innerText = postContent.text;
  dateDiv.innerText = postContent.date;

  postBodyDiv.appendChild(titleHeading);
  postBodyDiv.appendChild(textDiv);
  postFooter.appendChild(dateDiv);
  postDiv.appendChild(postBodyDiv);
  postDiv.appendChild(postFooter);
  return postDiv;
}

displayContent();
