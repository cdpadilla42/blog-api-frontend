const postForm = document.querySelector('.post_form');

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

  const publishedElement = addPublishedDisplay(postContent);

  postBodyElement.appendChild(titleHeading);
  postBodyElement.appendChild(postTextElement);
  postBodyElement.appendChild(authorElement);
  postFooter.appendChild(dateElement);
  postElement.appendChild(publishedElement);
  postElement.appendChild(postBodyElement);
  postElement.appendChild(postFooter);

  // TEST

  return postElement;
}

// Editor Unique Functions

async function sendFormData(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const text = document.querySelector('#text').value;
  const user = document.querySelector('#user').value;

  const formData = { title, text, user };
  console.log(JSON.stringify(formData));

  try {
    const returnedResult = await fetch('http://localhost:3000/api/posts', {
      method: 'post',
      body: formData,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const post = await returnedResult.json();
    console.log(post);
  } catch (err) {
    console.log(err);
  }
}

function addPublishedDisplay(post) {
  const publishedText = document.createElement('h5');
  publishedText.classList.add('card-header');
  // take in published info from post object
  const postPublished = post.published ? 'Published' : 'Not Published';
  // render displayed or not

  const postPublishedDisplay = document.createElement('div');
  postPublishedDisplay.classList.add('card-header');
  postPublishedDisplay.innerText = postPublished;

  // add button to toggle published

  const publishBttn = document.createElement('button');
  // class for custom CSS
  publishBttn.classList.add('publish__button');
  if (post.published) {
    publishBttn.classList.add('btn');
    publishBttn.classList.add('btn-primary');
    publishBttn.innerText = 'Unpublish Post';
  } else {
    publishBttn.classList.add('btn');
    publishBttn.classList.add('btn-warning');
    publishBttn.innerText = 'Publish Post';
  }
  publishBttn.addEventListener('click', (e) => {
    togglePublished(post);
    togglePublishedDisplay(post, e.target);
  });

  postPublishedDisplay.appendChild(publishBttn);

  return postPublishedDisplay;
}

async function togglePublished(post) {
  // create copy of post w/ flipped boolean
  const updatedPost = {
    title: post.title,
    text: post.text,
    date: post.date,
    published: !post.published,
    user: post.user,
    _id: post._id,
  };
  // send PUT request to appropriate endpoint
  const putResult = await sendPUTRequest(updatedPost);
  // log results
  console.log(putResult);
  return;
}

function togglePublishedDisplay(post, btn) {
  if (!post.published) {
    btn.classList.remove('btn-warning');
    btn.classList.add('btn-primary');
    btn.innerText = 'Post Published!';
  } else {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-warning');
    btn.innerText = 'Post unpublished!';
  }
  return;
}

async function sendPUTRequest(updatedPost) {
  // send PUT request
  try {
    const returnedResult = await fetch(
      `http://localhost:3000/api/posts/${updatedPost._id}`,
      {
        mode: 'cors',
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      }
    );
    const returnedPost = await returnedResult.json();
    return returnedPost.post;
  } catch (err) {
    console.log(err);
    return;
  }
}

postForm.addEventListener('submit', sendFormData);
displayContent();
