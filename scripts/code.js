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
                for( let i=0; i<jsonObject.results[0].length; i++ )
                {
                    var tr = document.createElement('tr');

                    var firstName = document.createElement('td');
                    var lastName = document.createElement('td');
                    var email = document.createElement('td');
                    var phoneNum = document.createElement('td');
                    var edit = document.createElement('td');

		    edit.style.width = "140px";
                
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