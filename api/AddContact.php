<?php
	$inData = getRequestInfo();
	
	if (!isset($inData['firstName']) || !isset($inData['lastName']) || !isset($inData['userId']) || !isset($inData['phoneNumber']) || !isset($inData['email'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$fName = $inData["firstName"];
	$lName = $inData["lastName"];
	$userId = $inData["userId"];
	$phoneNum = $inData["phoneNumber"];
	$email = $inData["email"];
	
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		returnWithError("Email is not valid.", 400);
		return;
	}

	$fullName = $fName.' '.$lName;
	
	$database_username = "User";
	$database_password = "COP4331OMg";
	$database_name = "COP4331";

	$conn = new mysqli("localhost", $database_username, $database_password, $database_name);
	
	if ($conn->connect_error) {
		returnWithError($conn->connect_error, 500);
	} else {
		//Parameters maybe different as we need a name, phone number, email
		$stmt = $conn->prepare("INSERT into Contacts (UserId,FullName,FirstName,LastName,Phone,Email) VALUES(?,?,?,?,?,?)");
		$stmt->bind_param("ssssss", $userId, $fullName, $fName, $lName, $phoneNum, $email);

		if ($stmt->execute()) {
			$id = $conn->insert_id;
			returnWithError($id);
		} else {
			returnWithError("Contact could not be added at this time", 500);
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
	
	function returnWithInfo($id) {
		$retValue = '{"id":' . $id . ',"error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
