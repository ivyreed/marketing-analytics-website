const checkforProjects = async event => {
  event.preventDefault();

  const response = await fetch('/api/project', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log(response);
    document.location.reload();
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
    console.log(response);
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

const deleteProject = async event => {
  event.preventDefault();

  const projectId = event.target.dataset.id;
  console.log(projectId);
  if (projectId) {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

window.onload = () => {
  checkforProjects;
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', createNewProject);

const projectDeleteButtons = document.querySelectorAll('.project-delete-btn');
projectDeleteButtons.forEach(button =>
  button.addEventListener('click', deleteProject)
);
