const loadBtn = document.getElementById("loadBtn");
const refreshBtn = document.getElementById("refreshBtn");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const usersContainer = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");

let users = [];

async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    return await response.json();
}

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

function renderUsers(userList) {
    usersContainer.innerHTML = "";

    userList.forEach(user => {
        usersContainer.appendChild(createUserCard(user));
    });
}

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
        errorDiv.textContent = "Error: Could not load users.";
        errorDiv.classList.remove("hidden");
    } finally {
        loadingDiv.classList.add("hidden");
        loadBtn.disabled = false;
        refreshBtn.disabled = false;
    }
}

loadBtn.addEventListener("click", loadUsers);
refreshBtn.addEventListener("click", loadUsers);

searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(term)
    );

    renderUsers(filtered);
});
