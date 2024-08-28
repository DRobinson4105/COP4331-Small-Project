<?php
	$inData = getRequestInfo();
	
	$fName = $inData["FirstName"];
	$lName = $inData["LastName"];
	$userId = $inData["userId"];
	$phoneNum = $inData["Phone"];
	$email = $inData["Email"];

	//Must change the name of the username, password & database. localhost stays the same. 
	//Bobby should give me all of these
	$conn = new mysqli("localhost", "fredrick", "798v", "COP4331"); 
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//Parameters maybe different as we need a name, phone number, email
		$stmt = $conn->prepare("INSERT into Contacts (UserId,FirstName,LastName,Phone,Email) VALUES(?,?,?,?,?)");
		$stmt->bind_param("sssss", $userId, $fName, $lName, $phoneNum, $email);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
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