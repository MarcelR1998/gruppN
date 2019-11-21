
let button = document.querySelectorAll("button");
//declares array that will contain the data of our post in the for of objects
let postList = [];
let title = document.querySelectorAll("p");
let content = document.querySelector(".content");

window.addEventListener('DOMContentLoaded', () => {
    loadContent();
    hideContent();
});

document.body.addEventListener("click", function (e) {

    if (e.target.classList.contains("add")) {
        document.forms[0].classList.toggle("form");
        document.forms[0].classList.toggle("hidden");
    }

    else if (e.target.classList.contains("submit")) {

        let srcData = document.forms["addImg"]["url"].value;

        let textData = document.forms["addImg"]["text"].value;

        //Checks if input isn't empty
        if (srcData != "" && textData != "") {

            content.classList.remove("hidden");
            addPost(srcData, textData);
        }
    }
    else if (e.target.classList.contains("delete")) {
        //Selects all images, and compares their class with the index of 
        //an object in postList, and deletes said object if they correspond.
        let image = e.target.parentNode.querySelector('img');

        for (i = 0; i < postList.length; i++) {
            if (image.classList.contains(`${i}`)) {
                postList.splice(i, 1);
                image.parentNode.remove();
                console.log("deleted post " + i)
            }
        };
        assignImageIndexClass();
        saveContent();
        hideContent()

    }
    else if (e.target.classList.contains("edit")) {

        let image = e.target.parentNode.querySelector('img');
        let text = e.target.parentNode.querySelector('p');

        for (i = 0; i < postList.length; i++) {
            if (image.classList.contains(`${i}`)) {

                srcData = prompt("enter image link");

                textData = prompt("enter text");

                if (srcData != "unknown" && srcData != null && srcData != "") {
                    postList[i].source = srcData;
                    image.src = postList[i].source;
                }

                if (textData != "" && textData != null) {
                    postList[i].description = textData;
                    text.textContent = postList[i].description;
                }
            }

        }
    }

});

//Hide and show delete/edit button when you hover over a post
/*content.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("post")) {
        let button = e.target.parentNode.querySelectorAll("button")
        for (i = 0; i < target.button.length; i++) {
            button[i].classList.remove("hidden");
        }
    }
});*/

function addPost(link, text) {

    let post = {
        source: link,
        description: text,
        id: Date.now(),
        favourite: false
    };

    postList.push(post);
    let div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `<img src="${link}" onerror="imgError(this);"></img> 
    <p>${text}</p> <button class="edit" ><span class="far fa-edit"></span> edit</button> 
    <button class="delete" ><span class="far fa-trash-alt" ></span> delete</button>`;
    content.appendChild(div);

    assignImageIndexClass();
    saveContent();

}

//This function fires when a post is created and deleted, and 
//reassigns a number class to each picture in rising order.
function assignImageIndexClass() {
    let image = document.querySelectorAll("div[class='post'] img");
    for (i = 0; i < image.length; i++) {
        image[i].className = String(i);
    }
}

function imgError(image) {
    image.onerror = "";
    image.src = "placeholder.png";
    return true;
}

function hideContent() {
    if (postList.length < 1 || postList == undefined) {
        content.classList.add("hidden");
    }
}

function saveContent() {
    localStorage.setItem("postList", JSON.stringify(postList));
}

function loadContent() {
    var retrievedData = localStorage.getItem("postList");

    postList = JSON.parse(retrievedData);
    if (!postList) {
        postList = [];
    }
    console.log(postList)
    for (i = 0; i < postList.length; i++) {
        console.log("For loop ran: " + i + " length is: " + postList.length)
        let div = document.createElement("div");
        div.classList.add("post");
        div.innerHTML = `<img src="${postList[i].source}" onerror="imgError(this);"></img> 
        <p>${postList[i].description}</p> <button class="edit" ><span class="far fa-edit"></span> edit</button> 
        <button class="delete" ><span class="far fa-trash-alt" ></span> delete</button>`;
        content.appendChild(div);
    }
    assignImageIndexClass();
}
