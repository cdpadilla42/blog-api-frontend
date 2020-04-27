const postForm = document.querySelector('.post_form');

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

postForm.addEventListener('submit', sendFormData);
