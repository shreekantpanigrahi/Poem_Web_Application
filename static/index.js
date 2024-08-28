document.addEventListener("DOMContentLoaded", () => {
    // Search Functionality
    let searchbtn = document.querySelector("#searchButton");
    let searchRes = document.querySelector("#searchResults");
    let input = document.querySelector("#searchQuery");

    if (searchbtn && searchRes && input) {
        let datafromJson = async () => {
            let data = await window.fetch("../static/csvjson.json");
            let res = await data.json();

            searchbtn.addEventListener("click", (e) => {
                searchRes.innerHTML = "";
                e.preventDefault();
                let query = input.value.trim();
                if (query) {
                    let found = false;
                    res.forEach((e) => {
                        if (e.author === query.toUpperCase()) {
                            found = true;
                            searchRes.innerHTML += `<h2><i>${e.poem_name}</i></h2>\n`;
                            searchRes.innerHTML += `<i>${e.content}</i>\n`;
                        } else if (e.poem_name.toLowerCase() === query.toLowerCase()) {
                            found = true;
                            searchRes.innerHTML = `<h2><i>${e.poem_name}</i></h2>\n`;
                            searchRes.innerHTML += `<i>${e.content}</i>\n`;
                        }
                    });

                    if (!found) {
                        searchRes.innerHTML = `The author's data or poem does not exist in our database. Please put a request in our contact form in the contact tab with the author name and poem name.`;
                    }
                } else {
                    searchRes.innerHTML = `Type Author name or Poem name in the search box`;
                }
            });
        };

        datafromJson();
    }

    // Filter Functionality
    let filterbtn = document.querySelector("#applyFilter");
    let filterage = document.querySelector("#age");
    let filtertype = document.querySelector("#type");
    let filterRes = document.querySelector("#filterResults");

    if (filterbtn && filterage && filtertype && filterRes) {
        let filterfunc = async () => {
            let data = await window.fetch("../static/csvjson.json");
            let res = await data.json();

            filterbtn.addEventListener("click", (e) => {
                filterRes.innerHTML = "";
                e.preventDefault();

                let query_age = filterage.value.trim();
                let query_type = filtertype.value.trim();

                let found = false;

                res.forEach((e) => {
                    if (e.age.toLowerCase() === query_age.toLowerCase() && e.type.toLowerCase() === query_type.toLowerCase()) {
                        filterRes.innerHTML += `<h2><i>Title: ${e.poem_name}</i></h2>\n`;
                        filterRes.innerHTML += `<p><i>${e.content}</i></p>\n`;
                        filterRes.innerHTML += `<p><i>Age: ${e.age}</i></p>\n`;
                        filterRes.innerHTML += `<p><i>Type: ${e.type}</i></p>\n`;
                        found = true;
                    }
                });

                if (!found) {
                    filterRes.innerHTML = `Sorry, no results match your filters.`;
                }

            });
        };

        filterfunc();
    }

    // Send Email Functionality
    let sendemailbtn = document.querySelector(".send-button");
    let sendemailname = document.querySelector("#name");
    let sendemailem = document.querySelector("#email");
    let sendemailsub = document.querySelector("#subject");
    let sendemaildesc = document.querySelector("#description");

    if (sendemailbtn && sendemailname && sendemailem && sendemailsub && sendemaildesc) {
        sendemailbtn.addEventListener("click", (e) => {
            e.preventDefault();

            const emailData = {
                name: sendemailname.value,
                email: sendemailem.value,
                subject: sendemailsub.value,
                description: sendemaildesc.value
            };

            fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Email sent successfully!");
                } else {
                    alert("Failed to send email: " + data.error);
                }
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
        });
    }
});
