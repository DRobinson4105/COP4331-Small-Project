<?php
	$inData = getRequestInfo();
	//These are placeholder files. They do not have actual usable content
	$ID = $inData["ID"];

	//Must change the name of the username, password & database. localhost stays the same. 
	$conn = new mysqli("localhost", "fredrick", "798v", "COP4331"); 
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//Parameters maybe different as we need a name, phone number, email
		$stmt = $conn->prepare("DELETE from Contacts WHERE ID=?");
		$stmt->bind_param("s", $ID);
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
