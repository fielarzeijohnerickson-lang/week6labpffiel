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
