// A reminder to make your JS Modular here. You will need seperate functions for seperate pages, I would imagine. This is your first multipage effort, afterall. Good Luck!
const body = document.querySelector('.content');

async function getContent() {
  const response = await fetch('http://localhost:3000/api/posts', {
    mode: 'cors',
  });
  const content = await response.json();
  return content.postList;
}

async function displayContent() {
  const content = await getContent();
  console.log(content);
  content.forEach((post) => {
    let postDiv = document.createElement('div');
    postDiv.innerText = post.title;
    body.appendChild(postDiv);
  });
}

displayContent();
