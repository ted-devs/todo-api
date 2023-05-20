const BASE_URI = "/api/todotasks";

fetchList();

function APIRequest(uri, params) {
    fetch(BASE_URI + uri, params)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        }).then(data => {
            console.log(data);
            fetchList();
        })
        .catch(error => console.error("FETCH ERROR: ", error));
}

function fetchList() {
    fetch(BASE_URI, { method: "GET" })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        }).then(data => {
            console.log(data);
            renderList(data);
        })
        .catch(error => console.error("FETCH ERROR: ", error));
}

function renderDeleteButton(data) {
    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.id = `delete${data.id}`
    deleteButton.innerHTML = "X";
    deleteButton.dataset.id = data.id;
    // Add event listener to delete
    deleteButton.addEventListener("click", function (event) {
        if (event.target.id === `delete${event.target.dataset.id}`) {
            console.log(event.target.dataset.id);

            if (!confirm("Do you want to delete this task?")) { return; }

            const params = { method: "DELETE" };
            APIRequest(`/${event.target.dataset.id}`, params);
        }
    });

    return deleteButton;
}

function renderUpdateButton(data) {
    // Edit Button
    const updateButton = document.createElement("button");
    updateButton.type = "button";
    updateButton.id = `update${data.id}`
    updateButton.innerHTML = "O";
    updateButton.dataset.id = data.id;
    // Add event listener to update
    updateButton.addEventListener("click", function (event) {
        if (event.target.id = `update${event.target.dataset.id}`) {
            const inputTextField = document.getElementById(`text${event.target.dataset.id}`);

            if (inputTextField.disabled) {
                inputTextField.disabled = false;
            } else {
                inputTextField.disabled = true;
                const checkbox = document.getElementById(`checkbox${event.target.dataset.id}`);
                updateTask(inputTextField.value, checkbox.checked);
            }
        }
    });

    return updateButton;
}

function renderTitle(data) {
    // Checkbox Label
    const text = document.createElement("input");
    text.type = "text";
    text.id = `text${data.id}`
    text.value = data.title;
    text.disabled = true;

    return text;
}

function renderCheckbox(data) {
    // Title Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox${data.id}`;
    checkbox.name = `checkbox${data.id}`;
    checkbox.checked = data.completed;
    checkbox.dataset.id = data.id;
    checkbox.dataset.title = data.title;
    // Checkbox onchange
    checkbox.addEventListener("change", function (event) {
        if (event.target.id = `checkbox${event.target.dataset.id}`) {
            updateTask(event.target.dataset.title, event.target.checked);
        }
    });

    return checkbox;
}

function renderList(data) {
    const parent = document.getElementById("tasks");
    parent.innerHTML = null;

    for (let i = 0; i < data.length; i++) {
        // Container
        const div = document.createElement("div");
        div.className = "task";

        const checkbox = renderCheckbox(data[i]);
        const title = renderTitle(data[i]);
        const updateButton = renderUpdateButton(data[i]);
        const deleteButton = renderDeleteButton(data[i]);

        // Add items to HTML
        div.appendChild(checkbox);
        div.appendChild(title);
        div.appendChild(updateButton);
        div.appendChild(deleteButton);

        parent.appendChild(div);
    }
}

function updateTask(title, completed) {
    const body = {
        "title": title,
        "completed": completed
    };

    const params = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    APIRequest(`/${event.target.dataset.id}`, params);
}

function addTask() {
    const textField = document.getElementById("title");
    const title = textField.value;

    if (title === null || title.length === 0 || title === "") {
        alert("Title field is empty");
        return;
    }

    console.log(title);

    const params = { method: "POST" };
    APIRequest(`?title=${title}`, params);
    textField.value = null;
}