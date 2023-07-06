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

const createNewProject = async () => {
  const name = document.querySelector('#project-name').value.trim();

  if (name) {
    const response = await fetch(`/api/dashboard`, {
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

const deleteProject = async () => {
  const id = document.querySelector('.delete-project').getAttribute('data-id');

  if (id) {
    const response = await fetch(`/api/dashboard/${id}`, {
      method: 'DELETE',
    });
    console.log(response);
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

document.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.closest('.delete-project')) {
    deleteProject();
  }
});

document.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.closest('#add-project')) {
    createNewProject();
  }
});
