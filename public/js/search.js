async function saveSearchTerm() {
  const searchText = document.querySelector('#searchText').value.trim();
  console.log(searchText);
  const response = fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({
      query: searchText,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    // const { message } = await response.json();
  }
}
document.querySelector('#searchBtn').addEventListener('click', saveSearchTerm);
