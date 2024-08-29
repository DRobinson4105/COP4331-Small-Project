<?php
	$inData = getRequestInfo();

	$Id = $inData["contactID"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNum = $inData["phoneNumber"];
	$email = $inData["email"];

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	$conn = new mysqli("localhost", "User", "COP4331OMg", "COP4331"); 
	if ($conn->connect_error)//Check if it can connect
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//add more update parameters for email & phone
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE id = ?");
		$stmt->bind_param("sssss", $firstName, $lastName, $phoneNum, $email, $Id);
		if ($stmt->execute()) 
		{
			$stmt->close();
			$conn->close();
			returnWithError("");
		}
		else
		{
			returnWithError("Statement could not execute.");
		}
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
