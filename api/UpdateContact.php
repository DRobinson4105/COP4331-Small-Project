<?php
	$inData = getRequestInfo();

	if (!isset($inData['firstName']) || !isset($inData['lastName']) || !isset($inData['contactID']) || !isset($inData['phoneNumber']) || !isset($inData['email'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$id = $inData["contactID"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNum = $inData["phoneNumber"];
	$email = $inData["email"];
	$fullName = $firstName.' '.$lastName;

	$conn = new mysqli("localhost", "User", "COP4331OMg", "COP4331");
	
	if ($conn->connect_error) {
		returnWithError( $conn->connect_error, 500);
	} else {
		//add more update parameters for email & phone
		$stmt = $conn->prepare("UPDATE Contacts SET FullName=?, FirstName=?, LastName=?, Phone=?, Email=? WHERE id = ?");
		$stmt->bind_param("ssssss", $fullName, $firstName, $lastName, $phoneNum, $email, $id);
		if ($stmt->execute()) {
			returnWithInfo();
		} else {
			returnWithError("Could not create a contact right now.", 500);
		}
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo() {
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj) {
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError($err, $code) {
		$retValue = '{"id":-1,"error":"' . $err . '"}';
		http_response_code($code);
		sendResultInfoAsJson($retValue);
	}
	
	function returnWithInfo() {
		$retValue = '{"error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
