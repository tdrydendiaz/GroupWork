function makeRequest(method, url, body) {
    return new Promise(
        function (resolve, reject) {
            let req = new XMLHttpRequest();

            req.onload = function () {
                const data = JSON.parse(req.responseText);
                if (req.status >= 200 && req.status < 300) {
                    resolve(data);
                } else {
                    const reason = new Error('Rejected');
                    reject(reason);
                }
            };

            req.open(method, url);
            req.send(JSON.stringify(body));
        }
    );
}


function getItems() {

    makeRequest("GET", 'http://localhost:5000/item/all/')
        .then((data) => {

            const containerDiv = document.getElementById('random');
            let tableHeading = document.createElement('h2');
            tableHeading.id = "tableHeading";
            tableHeading.innerHTML = "Posts";
            containerDiv.appendChild(tableHeading);
            // if (document.contains(document.getElementById("table1"))) {
            //     containerDiv.removeChild(document.getElementById("table1"));
            //     containerDiv.removeChild(document.getElementById("tableHeading"));
            // }
            let container = document.createElement('table');
            container.id = "table1";
            containerDiv.appendChild(container);

            let tableHeadingTitle = document.createElement('th');
            tableHeadingTitle.innerHTML = "Username";
            container.appendChild(tableHeadingTitle);

            let tableHeadingTitle2 = document.createElement('th');
            tableHeadingTitle2.innerHTML = "Content";
            container.appendChild(tableHeadingTitle2);

            let tableHeadingRemovePost = document.createElement('th');
            tableHeadingRemovePost.innerHTML = "Delete";
            container.appendChild(tableHeadingRemovePost);
let p = data.length -1;
            for (let i = p; i > -1; i--) {
                let myRow = document.createElement('tr');

                myRow.id = "row" + i;
                container.appendChild(myRow);

                let myUsername = document.createElement('td');
                myUsername.innerHTML = String(data[i].username);
                myRow.appendChild(myUsername);

                let myContent = document.createElement('td');
                myContent.innerHTML = String(data[i].content);
                myRow.appendChild(myContent);

                let myRemovePost = document.createElement('td');
                myRow.appendChild(myRemovePost);
                let removePostbtn = document.createElement('input');
                removePostbtn.type = "button";
                removePostbtn.className = "btn btn-primary";
                removePostbtn.value = "Remove Post";
                let ItemID = data[i]._id;

                removePostbtn.onclick = function () {
                    removePost(ID, ItemID);
                };
                myRemovePost.appendChild(removePostbtn);

            }
        })
        .catch((error) => console.log(error.message));
    return false;
}

function removePost(ID, ItemID){
    
}