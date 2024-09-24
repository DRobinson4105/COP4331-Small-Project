<?php
	$inData = getRequestInfo();
	
	if (!isset($inData['login']) || !isset($inData['password'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$username = $inData["login"];
	$password = $inData["password"];

   	$id = 0;
   	$firstName = "";
   	$lastName = "";

	// database credentials
	$database_username = "User";
	$database_password = "COP4331OMg";
	$database_name = "COP4331";

	# connect to the database
	$conn = new mysqli("localhost", $database_username, $database_password, $database_name);
		
	if ($conn->connect_error) {
		returnWithError( $conn->connect_error, 500);
    } else {
        // check if user already exists
        $stmt = $conn->prepare("SELECT ID FROM Users WHERE Login = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            returnWithError("User already exists", 200);
        } else {
            // create user
            $stmt = $conn->prepare("INSERT INTO Users (Login, Password) Values (?, ?)");
            $stmt->bind_param("ss", $username, $password);

            if ($stmt->execute()) {
                $id = $stmt->insert_id;
                returnWithInfo($id);
            } else {
                returnWithError("Could not make an account right now", 500);
            }
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
