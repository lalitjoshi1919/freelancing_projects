// DOM Elements
const collectionNameInput = document.getElementById('collectionName');
const reloadBtn = document.getElementById('reloadBtn');
const collectionListSection = document.getElementById('collectionListSection');
const collectionList = document.getElementById('collectionList');
const uploadQuerySection = document.getElementById('uploadQuerySection');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const queryInput = document.getElementById('queryInput');
const queryBtn = document.getElementById('queryBtn');
const serverResponse = document.getElementById('serverResponse');

// Mock data for demonstration purposes
let mockCollections = {
  "defaultCollection": ["file1.pdf", "file2.pdf", "file3.pdf"],
};

// Reload Collection
reloadBtn.addEventListener('click', () => {
  const collectionName = collectionNameInput.value.trim();
  if (!collectionName) {
    alert('Please enter a collection name.');
    return;
  }

  // Simulate fetching collection
  const items = mockCollections[collectionName] || [];
  if (items.length > 0) {
    collectionListSection.style.display = 'block';
    uploadQuerySection.style.display = 'block';
    collectionList.innerHTML = items
      .map(item => `<div class="collection-item"><span>${item}</span><button onclick="deleteItem('${collectionName}', '${item}')">Delete</button></div>`)
      .join('');
    serverResponse.value = `Loaded collection: ${collectionName}`;
  } else {
    collectionListSection.style.display = 'none';
    uploadQuerySection.style.display = 'block';
    collectionList.innerHTML = '';
    serverResponse.value = `No items found in collection: ${collectionName}`;
  }
});

// Upload File
uploadBtn.addEventListener('click', () => {
  const collectionName = collectionNameInput.value.trim();
  const file = fileInput.files[0];
  if (!collectionName || !file) {
    alert('Please select a collection and a file to upload.');
    return;
  }

  if (!mockCollections[collectionName]) {
    mockCollections[collectionName] = [];
  }
  mockCollections[collectionName].push(file.name);

  serverResponse.value = `Uploaded '${file.name}' to collection: ${collectionName}`;
  reloadBtn.click(); // Refresh the collection
});

// Query Collection
queryBtn.addEventListener('click', () => {
  const query = queryInput.value.trim();
  const collectionName = collectionNameInput.value.trim();
  if (!collectionName || !query) {
    alert('Please enter a collection name and a query.');
    return;
  }

  // Simulate querying the collection
  const items = mockCollections[collectionName] || [];
  const queryResults = items.filter(item => item.includes(query));

  if (queryResults.length > 0) {
    serverResponse.value = `Query '${query}' found these files in collection '${collectionName}': ${queryResults.join(', ')}`;
  } else {
    serverResponse.value = `No results found for query '${query}' in collection '${collectionName}'`;
  }
});

// Delete Item
window.deleteItem = (collectionName, fileName) => {
  mockCollections[collectionName] = mockCollections[collectionName].filter(item => item !== fileName);
  serverResponse.value = `Deleted '${fileName}' from collection: ${collectionName}`;
  reloadBtn.click(); // Refresh the collection
};
