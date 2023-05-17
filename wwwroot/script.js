const BASE_URI = "https://localhost:7234/api/todotasks";

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

function renderList(data) {
    const parent = document.getElementById("tasks");

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

        // Checkbox Label
        const label = document.createElement("label");
        label.innerHTML = data[i].title;
        label.htmlFor = `checkbox${data[i].id}`;

        // Checkbox onchange
        checkbox.addEventListener("change", function (event) {
            if (event.target.id = `checkbox${event.target.dataset.id}`) {
                console.log(event.target.dataset.id);

                const body = {
                    "title": event.target.dataset.title,
                    "completed": event.target.checked
                };

                const params = {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                };

                fetch(BASE_URI + `/${event.target.dataset.id}`, params)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("NETWORK RESPONSE ERROR");
                        }
                    }).then(data => {
                        console.log(data);
                        location.reload();
                    })
                    .catch(error => console.error("FETCH ERROR: ", error));
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

                fetch(BASE_URI + `/${event.target.dataset.id}`, { method: "DELETE" })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("NETWORK RESPONSE ERROR");
                        }
                    }).then(data => {
                        console.log(data);
                        location.reload();
                    })
                    .catch(error => console.error("FETCH ERROR: ", error));
            }
        });

        // Add items to HTML
        div.appendChild(checkbox);
        div.appendChild(label);
        div.appendChild(deleteButton);

        parent.appendChild(div);
    }
}

function addTask() {
    const textField = document.getElementById("title");
    const title = textField.value;

    if (title === null || title.length === 0 || title === "") {
        alert("Title field is empty");
        return;
    }

    console.log(title);

    fetch(BASE_URI + `?title=${title}`, { method: "POST" })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        }).then(data => {
            console.log(data);
            location.reload();
        })
        .catch(error => console.error("FETCH ERROR: ", error));

    textField.value = null;
}