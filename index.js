
let button = document.querySelectorAll("button");
//declares array that will contain the data of our post in the for of objects
let postList = [];
let title = document.querySelectorAll("p");
let content = document.querySelector(".content");
let postNum = postList.length;

document.body.addEventListener("click", function (e) {

    if (e.target.classList.contains("add")) {
        document.forms[0].classList.toggle("hidden");
    }

    if (e.target.classList.contains("submit")) {

        let srcData = document.forms["addImg"]["url"].value;

        let textData = document.forms["addImg"]["text"].value;

        //Checks if input isn't empty
        if (srcData != null && textData != null) {

            addPost(srcData, textData);
        }
    }
    else if (e.target.classList.contains("delete")) {
        //Selects all images, and compares their class with the index of 
        //an object in postList, and deletes said object if they correspond.
        let image = e.target.parentNode.querySelector('img');

        for (i = 0; i < postList.length; i++) {

            let indexCheck = String(i);

            if (image.classList.contains(`${indexCheck}`)) {
                postList.splice(i, 1);
                image.parentNode.remove();
                console.log("deleted post " + i)
            }
        };
        assignImageIndexClass();

        /*event.target.parentNode.remove();*/

        /*event.target.parentNode.classList.add("hidden")*/

    }
    else if (e.target.classList.contains("edit")) {

        let image = e.target.parentNode.querySelector('img');
        let text = e.target.parentNode.querySelector('p');

        for (i = 0; i < postList.length; i++) {

            let indexCheck = String(i);

            if (image.classList.contains(`${indexCheck}`)) {

                srcData = prompt("enter image link");

                textData = prompt("enter text");

                if (srcData != "unknown" && textData != "") {
                    if (srcData != null && textData != null) {
                        let post = {
                            source: srcData,
                            description: textData
                        };

                        postList[i] = post;

                        image.src = postList[i].source;
                        text.textContent = postList[i].description;
                    }
                }

            }
        };
    }

});

function addPost(link, text) {

    let post = {
        source: link,
        description: text
    };

    postList.push(post);
    let div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `<img src="${link}"></img> <p>${text}</p> 
    <button class="edit" >edit</button> <button class="delete" >delete</button>`;

    content.appendChild(div);

    assignImageIndexClass();

}

//This function fires when a post is created and deleted, and 
//reassigns a number class to each picture in rising order.
function assignImageIndexClass() {
    let image = document.querySelectorAll("img");

    for (i = 0; i < image.length; i++) {
        image[i].className = '';
        let stringPlaceholder = String(i);
        image[i].classList.add(`${stringPlaceholder}`);
    }
}