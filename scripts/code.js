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
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }
        
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();
    
                window.location.href = "CURD.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
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
                    document.getElementById("loginResult").innerHTML = "User already exists";
                    return;
                }
        
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();
    
                window.location.href = "CURD.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
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

	let tmp = {search:srch,UserId:userId,startIndex:startIdx,endIndex:endIdx};
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
                table.style.backgroundColor = "#F2E5E5";
                table.id = "contactTable";
                for( let i=0; i<jsonObject.results[0].length; i++ )
                {
                    var tr = document.createElement('tr');

                    var firstName = document.createElement('td');
                    var lastName = document.createElement('td');
                    var email = document.createElement('td');
                    var phoneNum = document.createElement('td');
                    var edit = document.createElement('td');

		    edit.style.width = "140px";
		    edit.style.display = "flex";
                    edit.style.justifyContent = "space-evenly";
		    edit.style.paddingLeft = "0px";
                
                    var firstNameText = document.createTextNode(jsonObject["results"][0][i]["firstName"]);
                    var lastNameText = document.createTextNode(jsonObject["results"][0][i]["lastName"]);
                    var emailText = document.createTextNode(jsonObject["results"][0][i]["email"]);
                    var phoneNumText = document.createTextNode(jsonObject["results"][0][i]["phone"]);
                    var editText = document.createTextNode("");
                    
                    firstName.appendChild(firstNameText);
                    lastName.appendChild(lastNameText);
                    email.appendChild(emailText);
                    phoneNum.appendChild(phoneNumText);
                    edit.appendChild(editText);

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
        table.style.backgroundColor = "#F2E5E5";
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
            // Add onclick
            newCell.appendChild(apply);
            const discard = document.createElement("img");
            discard.src = "images/discard.png";
            discard.style = "width: 18%; height: 18%";
            discard.onclick = function(){newRow.remove()};
            newCell.appendChild(discard);
        }
        else {
            let newText = document.createTextNode("");
            newCell.appendChild(newText);
            newCell.contentEditable = true;
            newCell.style.backgroundColor = "#D0BFB4";
        }
    }
}

function addContact(e) {
    // Get row with new contact information
    // Make text fields uneditable and reset style
    // Make API call
}
