
let button = document.querySelector("#button");
let postList = [];
let image = document.querySelectorAll("img");
let title = document.querySelectorAll("p");

i = 0;

button.addEventListener("click", function () {

    let srcData = prompt("enter image link");

    let textData = prompt("enter text");

    if (srcData != null && textData != null) {
        addPost(srcData, textData);
        assignPic();
    }
});

function addPost(link, text) {

    let post = {
        source: link,
        description: text
    };

    postList.push(post);

}

function assignPic() {

    for (i = 0; i < postList.length; i++) {
        image[i].src = postList[i].source;
        title[i].textContent = postList[i].description;
    }
};