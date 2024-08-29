<?php
	$inData = getRequestInfo();
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	
	$fName = $inData["firstName"];
	$lName = $inData["lastName"];
	$userId = $inData["userId"];
	$phoneNum = $inData["phoneNumber"];
	$email = $inData["email"];

	//Must change the name of the username, password & database. localhost stays the same. 
	//Bobby should give me all of these
    // database credentials
    $database_username = "User";
    $database_password = "COP4331OMg";
    $database_name = "COP4331";

    $conn = new mysqli("localhost", $database_username, $database_password, $database_name);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//Parameters maybe different as we need a name, phone number, email
		$stmt = $conn->prepare("INSERT into Contacts (UserId,FirstName,LastName,Phone,Email) VALUES(?,?,?,?,?)");
		$stmt->bind_param("sssss", $userId, $fName, $lName, $phoneNum, $email);
		if($stmt->execute()){
			$stmt->close();
			
			$Id = $conn->insert_id;
			$conn->close();
			sendResultInfoAsJson($Id);
			returnWithError("");
		}
		else
		{
			returnWithError("Statement could not execute");
		}
		//echo $fName," ", $userId," ", $lName,"", $email," ";
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
