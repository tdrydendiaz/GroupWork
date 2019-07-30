

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

            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify(body));
        }
    );
}




function createItem() {
   const newItem = {
        username: document.getElementById("accUsername").value,
        email: document.getElementById("accEmail").value,
        content: document.getElementById("accContent").value
    };
    console.log(newItem);

    makeRequest("POST", "http://localhost:5000/item/createItem", newItem)
        .then((data) => {
          getItems()
        })
        .catch((error) => console.log(error.message));
    return false;
}


// const createItem = () => {
//     const newItem = new Item({
//         username: document.getElementById("accUsername").value,
//         email: document.getElementById("accEmail").value,
//         content: document.getElementById("accContent").value
//     });
//     console.log(newItem);

//     multi("POST", "http://localhost:5000/item/createItem", JSON.stringify(newItem)).then(val => {
//         console.log(val);
//         const testContainer = document.getElementById('result');
//         testContainer.innerHTML = JSON.stringify(val);
//         getItems();
//     }
//     ).catch(function(error) { console.log(error.message) });
//     location.href = "index.html";
// }