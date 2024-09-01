<?php
    $inData = getRequestInfo();
	
    $id = 0;
    $firstName = "";
    $lastName = "";

    // database credentials
    $database_username = "User";
    $database_password = "COP4331OMg";
    $database_name = "COP4331";

	$conn = new mysqli("localhost", $database_username, $database_password, $database_name); 	
	if ($conn->connect_error) {
		returnWithError( $conn->connect_error );
    } else {
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=? AND Password =?");
		$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if ($row = $result->fetch_assoc()) {
			returnWithInfo($row['ID']);
		} else {
			returnWithError("Username or password is wrong");
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
	
	function returnWithError($err) {
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
	
	function returnWithInfo($id) {
		$retValue = '{"id":' . $id . ',"error":""}';
		sendResultInfoAsJson($retValue);
	}
	
?>
