const BASE_URI = "https://localhost:7234/api";
const GET_ALL = BASE_URI + "/todotasks";

fetch(GET_ALL)
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