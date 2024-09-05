const urlBase = 'http://glasses8p.online/api';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

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

function searchContact()
{
    let srch = document.getElementById("searchText").value;
    document.getElementById("contactSearchResult").innerHTML = "";

    let contactList = "";

    let tmp = {search:srch,userId:userId};
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
                for( let i=0; i<jsonObject.results.length; i++ )
                {
                    var tr = document.createElement('tr');

                    var firstName = document.createElement('td');
                    var lastName = document.createElement('td');
                    var email = document.createElement('td');
                    var phoneNum = document.createElement('td');
                  
                    var firstNameText = document.createTextNode(jsonObject[i][0]);
                    var lastNameText = document.createTextNode(jsonObject[i][1]);
                    var emailText = document.createTextNode(jsonObject[i][2]);
                    var phoneNumText = document.createTextNode(jsonObject[i][3]);
                  
                    firstName.appendChild(firstNameText);
                    lastName.appendChild(lastNameText);
                    email.appendChild(emailText);
                    phoneNum.appendChild(phoneNumText);
                    tr.appendChild(firstName);
                    tr.appendChild(lastName);
                    tr.appendChild(email);
                    tr.appendChild(phoneNum);
                  
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















function tempSearchContact()
{
    let srch = document.getElementById("searchText").value;
    document.getElementById("contactSearchResult").innerHTML = "";

    let contactList = "";

    let tmp = {search:srch,userId:userId};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/SearchContacts.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    let tempJsonObject = '[{"firstName": "Joe", "lastName": "Smith", "email": "joesmith@gmail.com", "phoneNumber": "43094302940"}, {"firstName": "Lebron", "lastName": "James", "email": "lebron@gmail.com", "phoneNumber": "407"}, {"firstName": "Rick", "lastName": "Leinicker", "email": "rickl@gmail.com", "phoneNumber": "911"}, {"firstName": "John", "lastName": "Jiohnnnnn", "email": "john@gmail.com", "phoneNumber": "912"}]';
    let jsonObject = JSON.parse(tempJsonObject);
    let table = document.createElement('table');

    for( let i=0; i<jsonObject.length; i++ )
    {
        var tr = document.createElement('tr');

        var firstName = document.createElement('td');
        var lastName = document.createElement('td');
        var email = document.createElement('td');
        var phoneNum = document.createElement('td');
        var edit = document.createElement('td');
    
        var firstNameText = document.createTextNode(jsonObject[i]["firstName"]);
        var lastNameText = document.createTextNode(jsonObject[i]["lastName"]);
        var emailText = document.createTextNode(jsonObject[i]["email"]);
        var phoneNumText = document.createTextNode(jsonObject[i]["phoneNumber"]);
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
    
