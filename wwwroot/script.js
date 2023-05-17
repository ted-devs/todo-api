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

function renderList(data) {
    const parent = document.getElementById("tasks");
    parent.innerHTML = null;

    for (let i = 0; i < data.length; i++) {
        // Container
        const div = document.createElement("div");
        div.className = "task";

        // Title Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox${data[i].id}`;
        checkbox.name = `checkbox${data[i].id}`;
        checkbox.checked = data[i].completed;
        checkbox.dataset.id = data[i].id;
        checkbox.dataset.title = data[i].title;
        // Checkbox onchange
        checkbox.addEventListener("change", function (event) {
            if (event.target.id = `checkbox${event.target.dataset.id}`) {
                updateTask(event.target.dataset.title, event.target.checked);
            }
        });

        // Checkbox Label
        const text = document.createElement("input");
        text.type = "text";
        text.id = `text${data[i].id}`
        text.value = data[i].title;
        text.disabled = true;

        // Edit Button
        const updateButton = document.createElement("button");
        updateButton.type = "button";
        updateButton.id = `update${data[i].id}`
        updateButton.innerHTML = "O";
        updateButton.dataset.id = data[i].id;
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

        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.id = `delete${data[i].id}`
        deleteButton.innerHTML = "X";
        deleteButton.dataset.id = data[i].id;
        // Add event listener to delete
        deleteButton.addEventListener("click", function (event) {
            if (event.target.id === `delete${event.target.dataset.id}`) {
                console.log(event.target.dataset.id);

                if (!confirm("Do you want to delete this task?")) { return; }

                const params = { method: "DELETE" };
                APIRequest(`/${event.target.dataset.id}`, params);
            }
        });

        // Add items to HTML
        div.appendChild(checkbox);
        div.appendChild(text);
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