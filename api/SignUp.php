<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $inData = getRequestInfo();
	
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
		returnWithError( $conn->connect_error );
    } else {
        // check if user already exists
        $stmt = $conn->prepare("SELECT ID FROM Users WHERE Login = ?");
        $stmt->bind_param("s", $inData["login"]);
        $stmt->execute();
        $result = $stmt->get_result();
	
        if ($result->num_rows > 0) {
            returnWithError("User already exists");
        } else {
            // create user
            $stmt = $conn->prepare("INSERT INTO Users (Login, Password) Values (?, ?)");
            $stmt->bind_param("ss", $inData["login"], $inData["password"]);

            if ($stmt->execute()) {
                $id = $stmt->insert_id;
                returnWithInfo($id);
            } else {
                returnWithError("Could not make account right now");
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
	
	function returnWithError($err) {
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
	
	function returnWithInfo($id) {
		$retValue = '{"id":' . $id . '","error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
