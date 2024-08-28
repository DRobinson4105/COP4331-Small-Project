<?php
	$inData = getRequestInfo();
	//Add more variables for name, 
	$Name = $inData["Name"];
	$Id = $inData["Id"];
	$phoneNum = $inData["Phone"];
	$email = $inData["Email"];

	$conn = new mysqli("localhost", "fredrick", "798v", "COP4331"); 
	if ($conn->connect_error)//Check if it can connect
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//add more update parameters for email & phone
		$stmt = $conn->prepare("UPDATE Contacts SET Name='?' WHERE id = ?");
		$stmt->bind_param("ss", $Name, $ID);
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