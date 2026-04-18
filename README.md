<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>User Dashboard</title>

<style>
body {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 800px;
    margin: auto;
    background-color: #f5f5f5;
}

h1 {
    text-align: center;
}

.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 5px;
}

#loadBtn {
    background-color: #4CAF50;
}

#refreshBtn {
    background-color: #2196F3;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

#searchInput {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
}

.user-card {
    border: 1px solid #ddd;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    background-color: white;
    transition: transform 0.2s;
}

.user-card:hover {
    transform: scale(1.02);
}

.user-card h3 {
    margin-bottom: 8px;
}

.user-card p {
    margin: 5px 0;
    color: #555;
}

.hidden {
    display: none;
}

#error {
    color: red;
    padding: 10px;
    background-color: #ffe6e6;
    border-radius: 5px;
    margin-bottom: 10px;
}

#loading {
    font-weight: bold;
    margin-bottom: 10px;
}
</style>

</head>
<body>

<h1>User Dashboard</h1>

<div class="controls">
    <button id="loadBtn">Load Users</button>
    <button id="refreshBtn">Refresh</button>
</div>

<input type="text" id="searchInput" placeholder="Search by name...">

<div id="loading" class="hidden">Loading...</div>
<div id="error" class="hidden"></div>

<div id="usersContainer"></div>

<script>
// Elements
const loadBtn = document.getElementById("loadBtn");
const refreshBtn = document.getElementById("refreshBtn");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const usersContainer = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");

// State
let users = [];

// Fetch users
async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return await response.json();
}

// Create card
function createUserCard(user) {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
        <p><strong>City:</strong> ${user.address.city}</p>
    `;

    return card;
}

// Render users
function renderUsers(userList) {
    usersContainer.innerHTML = "";

    userList.forEach(user => {
        const card = createUserCard(user);
        usersContainer.appendChild(card);
    });
}

// Load users
async function loadUsers() {
    errorDiv.classList.add("hidden");
    usersContainer.innerHTML = "";

    loadingDiv.classList.remove("hidden");
    loadBtn.disabled = true;
    refreshBtn.disabled = true;

    try {
        users = await fetchUsers();
        renderUsers(users);
    } catch (error) {
        errorDiv.textContent = "Error: Could not load users. Please try again.";
        errorDiv.classList.remove("hidden");
        console.log(error);
    } finally {
        loadingDiv.classList.add("hidden");
        loadBtn.disabled = false;
        refreshBtn.disabled = false;
    }
}

// Events
loadBtn.addEventListener("click", loadUsers);
refreshBtn.addEventListener("click", loadUsers);

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm)
    );

    renderUsers(filtered);
});
</script>

</body>
</html>
