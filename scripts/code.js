const urlBase = 'http://glasses8p.online/api';
const extension = 'php';

let userId = 0;
let startIdx = 0;
let endIdx = 11;
let lastSearch = "";
let loadMore = false;

function doLogin()
{
    userId = 0;
    
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    // Makes sure that empty login doesnt work LOL
    if (login.trim() === "" || password.trim() === "") {
        const errorMessage = document.createElement("div");

        const errorIcon = document.createElement("img");
        errorIcon.src = "images/error.png";
        errorIcon.style = "width: 1%; height: 1%";

        const errorText = document.createTextNode("Username and/or password cannot be empty.");

        errorMessage.appendChild(errorIcon);
        errorMessage.appendChild(errorText);

        document.getElementById("loginResult").innerHTML = "";
        document.getElementById("loginResult").appendChild(errorMessage);
        return; 
    }

    let tmp = {login:login,password:password};
    let jsonPayload = JSON.stringify( tmp );
    
    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let jsonObject = JSON.parse( xhr.responseText );
                userId = jsonObject.id;
        
                if( userId < 1 )
                {        
                    const errorMessage = document.createElement("div");

                    const errorIcon = document.createElement("img");
                    errorIcon.src = "images/error.png";
                    errorIcon.style = "width: 1%; height: 1%";

                    const errorText = document.createTextNode(" User/Password combination incorrect");

                    errorMessage.appendChild(errorIcon);
                    errorMessage.appendChild(errorText);

                    document.getElementById("loginResult").innerHTML = "";
                    document.getElementById("loginResult").appendChild(errorMessage);
                    return;
                }

                saveCookie();
    
                window.location.href = "CURD.html";
            }
            else if(this.status != 200) {
                const errorMessage = document.createElement("div");

                const errorIcon = document.createElement("img");
                errorIcon.src = "images/error.png";
                errorIcon.style = "width: 1%; height: 1%";

                const errorText = document.createTextNode(" User/Password combination incorrect");

                errorMessage.appendChild(errorIcon);
                errorMessage.appendChild(errorText);

                document.getElementById("loginResult").innerHTML = "";
                document.getElementById("loginResult").appendChild(errorMessage);
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        const errorMessage = document.createElement("div");

        const errorIcon = document.createElement("img");
        errorIcon.src = "images/error.png";
        errorIcon.style = "width: 1%; height: 1%";

        const errorText = document.createTextNode(" " + err.message);

        errorMessage.appendChild(errorIcon);
        errorMessage.appendChild(errorText);

        document.getElementById("loginResult").innerHTML = "";
        document.getElementById("loginResult").appendChild(errorMessage);
    }

}

function doSignUp()
{
    userId = 0;
    
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    let tmp = {login:login,password:password};
    let jsonPayload = JSON.stringify( tmp );
    
    let url = urlBase + '/SignUp.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let jsonObject = JSON.parse( xhr.responseText );
                userId = jsonObject.id;
        
                if( userId < 1 )
                {        
                    const errorMessage = document.createElement("div");

                    const errorIcon = document.createElement("img");
                    errorIcon.src = "images/error.png";
                    errorIcon.style = "width: 1%; height: 1%";

                    const errorText = document.createTextNode(" User already exists");

                    errorMessage.appendChild(errorIcon);
                    errorMessage.appendChild(errorText);

                    document.getElementById("loginResult").innerHTML = "";
                    document.getElementById("loginResult").appendChild(errorMessage);
                    return;
                }

                saveCookie();
    
                window.location.href = "CURD.html";
            }
            else if(this.status != 200) {
                const errorMessage = document.createElement("div");

                const errorIcon = document.createElement("img");
                errorIcon.src = "images/error.png";
                errorIcon.style = "width: 1%; height: 1%";

                const errorText = document.createTextNode(" User already exists");

                errorMessage.appendChild(errorIcon);
                errorMessage.appendChild(errorText);

                document.getElementById("loginResult").innerHTML = "";
                document.getElementById("loginResult").appendChild(errorMessage);
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        const errorMessage = document.createElement("div");

        const errorIcon = document.createElement("img");
        errorIcon.src = "images/error.png";
        errorIcon.style = "width: 1%; height: 1%";

        const errorText = document.createTextNode(" " + err.message);

        errorMessage.appendChild(errorIcon);
        errorMessage.appendChild(errorText);

        document.getElementById("loginResult").innerHTML = "";
        document.getElementById("loginResult").appendChild(errorMessage);
    }

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
}

function doLogout()
{
	userId = 0;
	document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function searchContact(srch)
{
    let tmp;
    if(srch == null) {
        lastSearch = document.getElementById("searchText").value;
        startIdx = 0;
        endIdx = 11;
        tmp = {fullName:lastSearch,userId:userId,startIndex:startIdx,endIndex:endIdx};
    }
    else {
        tmp = {fullName:srch,userId:userId,startIndex:startIdx,endIndex:endIdx};
    }

    let contactList = "";

    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/SearchContacts.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let jsonObject = JSON.parse( xhr.responseText );
                let table = document.getElementById("contactTable");

                if(table == null || srch == null) {
                    table = document.createElement('table');
                    table.style.backgroundColor = "#000000";
                    table.id = "contactTable";
                    document.getElementById("contactSearchResult").innerHTML = "";
                }

                let iterations = jsonObject.results[0].length;

                if(jsonObject.results[0].length == endIdx - startIdx) {
                    loadMore = true;
                    iterations -= 1;
                }
                else {
                    loadMore = false;
                }

                for( let i=0; i<iterations; i++ )
                {
                    var tr = document.createElement('tr');
                    tr.id = jsonObject["results"][0][i]["id"];

                    var firstName = document.createElement('td');
                    var lastName = document.createElement('td');
                    var email = document.createElement('td');
                    var phoneNum = document.createElement('td');
                    var edit = document.createElement('td');

                    var firstNameDiv = document.createElement('div');
                    var lastNameDiv = document.createElement("div");
                    var emailDiv = document.createElement('div');
                    var phoneNumDiv = document.createElement("div");

                    firstNameDiv.style.overflow = "auto";
                    lastNameDiv.style.overflow = "auto";
                    emailDiv.style.overflow = "auto";
                    phoneNumDiv.style.overflow = "auto";

		            emailDiv.style.verticalAlign = "top";
		            emailDiv.style.display = "inline-block";
                    emailDiv.style.minWidth = "80%";
                    emailDiv.style.maxWidth = "100%";
                    phoneNumDiv.style.verticalAlign = "top";
                    phoneNumDiv.style.display = "inline-block";
                    phoneNumDiv.style.minWidth = "80%";
                    phoneNumDiv.style.maxWidth = "100%";

                    email.oninput = function(){validateEmail(this)};
                    phoneNum.oninput = function(){validatePhone(this)};

		            edit.style.width = "140px";
		            edit.style.display = "flex";
                    edit.style.justifyContent = "space-evenly";
		            edit.style.paddingLeft = "0px";
                
                    var firstNameText = document.createTextNode(jsonObject["results"][0][i]["firstName"]);
                    var lastNameText = document.createTextNode(jsonObject["results"][0][i]["lastName"]);
                    var emailText = document.createTextNode(jsonObject["results"][0][i]["email"]);
                    var phoneNumText = document.createTextNode(jsonObject["results"][0][i]["phone"]);
                    
                    const editIcon = document.createElement("img");
                    editIcon.src = "images/edit.png";
                    editIcon.style = "width: 14%; height: 14%";
                    edit.appendChild(editIcon);
                    edit.onclick = function(){editRow(this.parentElement)};

                    firstName.appendChild(firstNameDiv);
                    lastName.appendChild(lastNameDiv);
                    email.appendChild(emailDiv);
                    phoneNum.appendChild(phoneNumDiv);
                    
                    firstNameDiv.appendChild(firstNameText);
                    lastNameDiv.appendChild(lastNameText);
                    emailDiv.appendChild(emailText);
                    phoneNumDiv.appendChild(phoneNumText);

                    tr.appendChild(firstName);
                    tr.appendChild(lastName);
                    tr.appendChild(email);
                    tr.appendChild(phoneNum);
                    tr.appendChild(edit);
                    
                    table.appendChild(tr);
                }

                document.getElementById("contactSearchResult").appendChild(table);

                lazyLoad();
            }
            else if(this.status != 200) {
                document.getElementById("contactSearchResult").innerHTML = "Error: Could not load contacts";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactSearchResult").innerHTML = err.message;
    }
}

function newRow() {
    let table = document.getElementById("contactTable");
    if(table == undefined) {
        table = document.createElement('table');
        table.style.backgroundColor = "#F6F5EF";
        table.id = "contactTable";
	    document.getElementById("contactSearchResult").appendChild(table);
    }
    let newRow = table.insertRow(0);
    for(var i = 0; i < 5; i++) {
        let newCell = newRow.insertCell();

        if(i == 4) {
            newCell.style.width = "140px";
            newCell.style.display = "flex";
            newCell.style.justifyContent = "space-evenly";
            newCell.style.paddingLeft = "0px";
            newCell.style.padding = "2px";

            const apply = document.createElement("img");
            apply.src = "images/confirm.png";
            apply.style = "width: 23%; height: 23%";
            apply.onclick = function(){addContact(newRow)};
            newCell.appendChild(apply);

            const discard = document.createElement("img");
            discard.src = "images/discard.png";
            discard.style = "width: 18%; height: 18%";
            discard.onclick = function(){newRow.remove()};
            newCell.appendChild(discard);
        }
        else {
            let newDiv = document.createElement("div")
            let newText = document.createTextNode("");

            newDiv.style.overflow = "auto";
	        newDiv.contentEditable = true;

            newCell.appendChild(newDiv);
            newDiv.appendChild(newText);
            newCell.style.backgroundColor = "#D0BFB4";

            if(i == 2) {
                newCell.oninput = function(){validateEmail(this)};
                newDiv.style.verticalAlign = "top";
		        newDiv.style.display = "inline-block";
                newDiv.style.minWidth = "80%";
                newDiv.style.maxWidth = "100%";
            }
            if(i == 3) {
                newCell.oninput = function(){validatePhone(this)};
                newDiv.style.verticalAlign = "top";
		        newDiv.style.display = "inline-block";
                newDiv.style.minWidth = "80%";
                newDiv.style.maxWidth = "100%";
            }
        }
    }
}

function addContact(newRow) {
    let firstName = newRow.children[0].innerText;
    let lastName = newRow.children[1].innerText;
    let email = newRow.children[2].innerText;
    let phone = newRow.children[3].innerText;

    if(firstName == "" && lastName == "" && email == "" && phone == "") {
        displayError("Error: Valid contact must have one non-empty value");
        return;
    }
    
    if(newRow.children[2].children.length > 1 && newRow.children[3].children.length > 1) {
        displayError("Error: Email is invalid and Phone Number must be 10 digits (###-###-####)");
        return;
    }
    else if(newRow.children[2].children.length > 1) {
        displayError("Error: Email is invalid");
        return;
    }
    else if(newRow.children[3].children.length > 1){
        displayError("Error: Phone Number must be 10 digits (###-###-####)");
        return;
    }

    let tmp = {firstName:firstName,lastName:lastName,userId:userId,phoneNumber:phone,email:email};
	let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/AddContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(jsonPayload);

        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let jsonObject = JSON.parse( xhr.responseText );
                newRow.id = jsonObject["id"];
                
                // Visual feedback to user
                for(let i = 0; i < 5; i++) {
                    newRow.children[i].firstChild.contentEditable = false;
                    newRow.children[i].style.backgroundColor = "#F6F5EF";
                }
                
                newRow.children[4].innerHTML = "";

                const edit = document.createElement("img");
                edit.src = "images/edit.png";
                edit.style = "width: 14%; height: 14%"
                edit.onclick = function(){editRow(newRow)};
                newRow.children[4].appendChild(edit);

                let errorMsg = document.getElementById("errorMsg");
                if(errorMsg) {
                    errorMsg.remove();
                }
            }
            else if(this.status != 200) {
                displayError("Error: Could not add contact");
            }
        }
    }
    catch(err)
    {
        displayError("Error: Could not add contact");
    }
}

function editRow(currRow) {
    for (let i = 0; i < 5; i++) {
        if (i === 4) {
            currRow.children[4].innerHTML = "";

            const apply = document.createElement("img");
            apply.src = "images/confirm.png";
            apply.style = "width: 23%; height: 23%";
            apply.onclick = function(){ updateContact(currRow); };
            currRow.children[4].appendChild(apply);

            const discard = document.createElement("img");
            discard.src = "images/discard.png";
            discard.style = "width: 18%; height: 18%";
            discard.onclick = function(){ deleteContact(currRow); };
            currRow.children[4].appendChild(discard);
        } else {
            currRow.children[i].firstChild.contentEditable = true;
            currRow.children[i].style.backgroundColor = "#D0BFB4";
        }
    }
}

function deleteContact(currRow) {
    if (!confirm("Are you sure you want to delete this contact?")) {
        return; 
    }
    
    let contactID = currRow.id;

    let tmp = { id: contactID };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/DeleteContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.send(jsonPayload);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                currRow.remove(); 
                
                let errorMsg = document.getElementById("errorMsg");
                if(errorMsg) {
                    errorMsg.remove();
                }
            }
            else if(this.status != 200) {
                displayError("Error: Could not delete contact");
            }
        };
    } catch (err) {
        displayError("Error: Could not delete contact");
    }
}

function updateContact(curRow)
{
    let firstName = curRow.children[0].innerText;
    let lastName = curRow.children[1].innerText;
    let email = curRow.children[2].innerText;
    let phone = curRow.children[3].innerText;
    let contactID = curRow.id;

    if(firstName == "" && lastName == "" && email == "" && phone == "") {
        displayError("Error: Valid contact must have one non-empty value");
        return;
    }
    
    if(curRow.children[2].children.length > 1 && curRow.children[3].children.length > 1) {
        displayError("Error: Email is invalid and Phone Number must be 10 digits (###-###-####)");
	return;
    }
    else if(curRow.children[2].children.length > 1) {
        displayError("Error: Email is invalid");
	return;
    }
    else if(curRow.children[3].children.length > 1){
        displayError("Error: Phone Number must be 10 digits (###-###-####)");
	return;
    }

    let tmp = {firstName:firstName,lastName:lastName,contactID:contactID,phoneNumber:phone,email:email};
	let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/UpdateContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.send(jsonPayload);

        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                // Visual feedback to user
                for(let i = 0; i < 5; i++) {
                    curRow.children[i].firstChild.contentEditable = false;
                    curRow.children[i].style.backgroundColor = "#F6F5EF";
                }
                
                curRow.children[4].innerHTML = "";

                const edit = document.createElement("img");
                edit.src = "images/edit.png";
                edit.style = "width: 14%; height: 14%"
                edit.onclick = function(){editRow(curRow)};
                curRow.children[4].appendChild(edit);

                let errorMsg = document.getElementById("errorMsg");
                if(errorMsg) {
                    errorMsg.remove();
                }
            }
            else if(this.status != 200) {
                displayError("Error: Could not update contact");
            }
        }
    }
    catch(err)
    {
        displayError("Error: Could not update contact");
    }
}

function validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!regex.test(email.children[email.children.length - 1].textContent)) {
        if(email.children.length == 1) {
            const errorIcon = document.createElement("img");
            errorIcon.src = "images/error.png";
            errorIcon.style = "width: 10%; height: 10%; padding-right: 10px;";

            email.firstChild.style.maxWidth = "80%";
            email.insertBefore(errorIcon, email.firstChild);
        }
    }
    else {
        if(email.children.length > 1) {
            email.removeChild(email.firstChild);
            email.firstChild.style.maxWidth = "100%";
        }
    }
}

function validatePhone(phone) {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    if(!regex.test(phone.children[phone.children.length - 1].textContent)) {
        if(phone.children.length == 1) {
            const errorIcon = document.createElement("img");
            errorIcon.src = "images/error.png";
            errorIcon.style = "width: 10%; height: 10%; padding-right: 10px";

            phone.firstChild.style.maxWidth = "80%";
            phone.insertBefore(errorIcon, phone.firstChild);
        }
    }
    else {
        if(phone.children.length > 1) {
            phone.removeChild(phone.firstChild);
            phone.firstChild.style.maxWidth = "100%";
        }
    }
}

function lazyLoad() {
    if(loadMore) {
        if(document.body.scrollHeight - 300 <= (window.scrollY + window.innerHeight)) {
            startIdx = endIdx - 1;
            endIdx += 10;
            searchContact(lastSearch);
        }
    }
}

function displayError(msg) {
    let errorDisplay = document.getElementById("errorDisplay");
    
    let errorDiv = document.createElement("div");
    const errorMsg = document.createTextNode(" " + msg);

    const errorIcon = document.createElement("img");
    errorIcon.src = "images/error.png";
    errorIcon.style = "width: 1%; height: 1%";

    errorDiv.appendChild(errorIcon);
    errorDiv.appendChild(errorMsg);

    errorDisplay.innerHTML = "";
    errorDisplay.appendChild(errorDiv);
}




