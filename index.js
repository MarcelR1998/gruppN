
let button = document.querySelectorAll("button");
let postList = [];
let image = document.querySelectorAll("img");
let title = document.querySelectorAll("p");
let content = document.querySelector(".content");


// button.forEach(function (buttons) {
document.body.addEventListener("click", function (e) {

    if (e.target.classList.contains("add")) {

        document.forms[0].classList.toggle("hidden");

        /*let srcData = prompt("enter image link");

        let textData = prompt("enter text");*/

        if (srcData != null && textData != null) {

            addPost(srcData, textData);
        }

    } else if (e.target.classList.contains("delete")) {
        alert("funkar!");
        console.log("funkar");
    }

});
// });

function addPost(link, text) {

    let post = {
        source: link,
        description: text
    };

    postList.push(post);
    let div = document.createElement("div");
    div.classList.add("post");

    div.innerHTML = `<img src="${link}"></img> <p>${text}</p> <button class="delete" >edit</button> <button class="delete" >delete</button>`;

    content.appendChild(div);

}

function editPost(n) {

    let srcData = prompt("enter image link");

    let textData = prompt("enter text");

    let post = {
        source: link,
        description: text
    };

    postList[n] = post;
}