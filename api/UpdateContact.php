<?php
	$inData = getRequestInfo();
	//Add more variables for name, 
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Id = $inData["Id"];
	$phoneNum = $inData["Phone"];
	$email = $inData["Email"];

	$conn = new mysqli("localhost", "User", "COP4331OMg", "COP4331");
	if ($conn->connect_error)//Check if it can connect
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//add more update parameters for email & phone
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=?");
		$stmt->bind_param("sssss", $FirstName, $LastName, $phoneNum, $email, $Id);
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
