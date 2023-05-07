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

        // Title
        const title = document.createElement("span");
        title.id = "taskname";
        title.innerHTML = data[i].title;

        // Add items to HTML
        div.appendChild(title);

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