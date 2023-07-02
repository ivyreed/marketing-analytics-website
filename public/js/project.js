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

  const response = await fetch('/api/dashboard', {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    console.log(response);
    document.location.render('/dashboard');
  } else {
    const { message } = await response.json();
    // eslint-disable-next-line no-undef
    showAlert({ target: 'project-alert', message, type: 'danger' });
  }
};

window.onload = () => {
  checkforProjects;
};

document
  .querySelector('.add-project')
  .addEventListener('submit', createNewProject);
