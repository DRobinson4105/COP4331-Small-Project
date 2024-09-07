<?php
	$inData = getRequestInfo();

	if (!isset($inData['id'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$id = $inData["id"];

	// error_reporting(E_ALL);
	// ini_set('display_errors', 1);

		if (!isset($inData['login']) || !isset($inData['password'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$conn = new mysqli("localhost", "User", "COP4331OMg", "COP4331"); 
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error, 500);
	} 
	else
	{
		//Parameters maybe different as we need a name, phone number, email
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID =?");
		$stmt->bind_param("s", $id);
		if($stmt->execute()){
				returnWithError("", 200);
		}
		else{
			returnWithError( "Could not delete contact. Ensure contanct exists.", 500);
		}
		$stmt->close();
		$conn->close();
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
