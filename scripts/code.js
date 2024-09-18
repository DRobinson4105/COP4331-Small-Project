const urlBase = 'http://glasses8p.online/api';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
let startIdx = 0;
let endIdx = 10;

function doLogin()
{
    userId = 0;
    firstName = "";
    lastName = "";
    
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

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
        
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

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
    firstName = "";
    lastName = "";
    
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
        
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

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
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
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
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
//		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function searchContact()
{
    let srch = document.getElementById("searchText").value;
    document.getElementById("contactSearchResult").innerHTML = "";

    let contactList = "";

    let tmp = {fullName:srch,userId:userId,startIndex:startIdx,endIndex:endIdx};
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
                let table = document.createElement('table');
                table.style.backgroundColor = "#000000";
                table.id = "contactTable";
                for( let i=0; i<jsonObject.results[0].length; i++ )
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

            newCell.appendChild(newDiv);
            newDiv.appendChild(newText);
            newCell.contentEditable = true;
            newCell.style.backgroundColor = "#D0BFB4";

            if(i == 2) {
                newCell.oninput = function(){validateEmail(this)};
            }
            if(i == 3) {
                newCell.oninput = function(){validatePhone(this)};
            }
        }
    }
}

function addContact(newRow) {
    let firstName = newRow.children[0].innerText;
    let lastName = newRow.children[1].innerText;
    let email = newRow.children[2].innerText;
    let phone = newRow.children[3].innerText;
    
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
                    newRow.children[i].contentEditable = false;
                    newRow.children[i].style.backgroundColor = "#F6F5EF";
                }
                
                newRow.children[4].innerHTML = "";

                const edit = document.createElement("img");
                edit.src = "images/edit.png";
                edit.style = "width: 14%; height: 14%"
                edit.onclick = function(){editRow(newRow)};
                newRow.children[4].appendChild(edit);
            }
        }
    }
    catch(err)
    {
        console.log("Error: Could not add contact");
    }
}

function editRow(currRow)
{

    let table = document.getElementById("contactTable");
    for (i = 0; i < 5; i++)
    {
        if (i == 4)
        {
            currRow.children[4].innerHTML = "";

            const apply = document.createElement("img");
            apply.src = "images/confirm.png";
            apply.style = "width: 23%; height: 23%";
            apply.onclick = function(){updateContact(currRow)};
            currRow.children[4].appendChild(apply);

            const discard = document.createElement("img");
            discard.src = "images/discard.png";
            discard.style = "width: 18%; height: 18%";
            currRow.children[4].appendChild(discard);
        }

        else 
        {
            currRow.children[i].contentEditable = true;
            currRow.children[i].style.backgroundColor = "#D0BFB4";
        }
    }
}

function updateContact(curRow)
{
    let firstName = curRow.children[0].innerText;
    let lastName = curRow.children[1].innerText;
    let email = curRow.children[2].innerText;
    let phone = curRow.children[3].innerText;
    let contactID = curRow.id;
    
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
                    curRow.children[i].contentEditable = false;
                    curRow.children[i].style.backgroundColor = "#F6F5EF";
                }
                
                curRow.children[4].innerHTML = "";

                const edit = document.createElement("img");
                edit.src = "images/edit.png";
                edit.style = "width: 14%; height: 14%"
                edit.onclick = function(){editRow(curRow)};
                curRow.children[4].appendChild(edit);
            }
        }
    }
    catch(err)
    {
        console.log("Error: Could not add contact");
    }
}

function validateEmail(email) {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
    if(!regex.test(email.children[email.children.length - 1].textContent)) {
        if(email.children.length == 1) {
            const errorIcon = document.createElement("img");
            errorIcon.src = "images/error.png";
            errorIcon.style = "width: 10%; height: 10%";
            errorIcon.paddingRight = "10px";

            email.insertBefore(errorIcon, email.firstChild);
        }
    }
    else {
        if(email.children.length > 1) {
            email.removeChild(email.firstChild);
        }
    }
}

function validatePhone(phone) {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    if(!regex.test(phone.children[phone.children.length - 1].textContent)) {
        if(phone.children.length == 1) {
            const errorIcon = document.createElement("img");
            errorIcon.src = "images/error.png";
            errorIcon.style = "width: 10%; height: 10%";
            errorIcon.paddingRight = "10px";

            phone.insertBefore(errorIcon, phone.firstChild);
        }
    }
    else {
        if(phone.children.length > 1) {
            phone.removeChild(phone.firstChild);
        }
    }
}
