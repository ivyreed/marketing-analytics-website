const checkforProjects = async event => {
  event.preventDefault();

  const response = await fetch('/api/project', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log(response);
    document.location.render(response);
  } else {
    console.log('No current projects');
  }
};

const createNewProject = async event => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();

  if (name) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

window.onload = () => {
  checkforProjects;
};

document
  .querySelector('#add-project')
  .addEventListener('submit', createNewProject);
