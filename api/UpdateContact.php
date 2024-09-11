<?php
	$inData = getRequestInfo();

	if (!isset($inData['firstName']) || !isset($inData['lastName']) || !isset($inData['contactID']) || !isset($inData['phoneNumber']) || !isset($inData['email'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$Id = $inData["contactID"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNum = $inData["phoneNumber"];
	$email = $inData["email"];
    	$fullName = $firstName.' '.$lastName;

	// error_reporting(E_ALL);
	// ini_set('display_errors', 1);

	$conn = new mysqli("localhost", "User", "COP4331OMg", "COP4331"); 
	if ($conn->connect_error)//Check if it can connect
	{
		returnWithError( $conn->connect_error, 500);
	} 
	else
	{
		//add more update parameters for email & phone
		$stmt = $conn->prepare("UPDATE Contacts SET FullName=?, FirstName=?, LastName=?, Phone=?, Email=? WHERE id = ?");
		$stmt->bind_param("ssssss", $fullName, $firstName, $lastName, $phoneNum, $email, $Id);
		if ($stmt->execute()) 
		{
			$stmt->close();
			$conn->close();
			returnWithError("", 200);
		}
		else
		{
			returnWithError("Could not create a contact right now.", 500);
			$stmt->close();
			$conn->close();
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
	
	function returnWithError($err, $code) {
		$retValue = '{"id":-1,"error":"' . $err . '"}';
		http_response_code($code);
		sendResultInfoAsJson($retValue);
	}
	
?>
