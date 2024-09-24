<?php
	$inData = getRequestInfo();

	if (!isset($inData['login']) || !isset($inData['password'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$id = 0;
	$firstName = "";
	$lastName = "";

	// database credentials
	$database_username = "User";
	$database_password = "COP4331OMg";
	$database_name = "COP4331";

	$conn = new mysqli("localhost", $database_username, $database_password, $database_name);
	
	if ($conn->connect_error) {
		returnWithError($conn->connect_error, 500);
	} else {
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=? AND Password =?");
		$stmt->bind_param("ss", $inData["login"], $inData["password"]);

		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		returnWithInfo($row['ID']);
			

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
