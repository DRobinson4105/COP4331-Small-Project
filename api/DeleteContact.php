<?php
	$inData = getRequestInfo();

	if (!isset($inData['id'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$id = $inData["id"];
    if($id < 1){
        returnWithError("ID is not valid", 400);
    }
    else{

        $conn = new mysqli("localhost", "User", "COP4331OMg", "COP4331");

        if ($conn->connect_error) {
            returnWithError( $conn->connect_error, 500);
        } else {
            $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID =?");
            $stmt->bind_param("s", $id);

            if ($stmt->execute()) {
                returnWithInfo();
            } else {
                returnWithError("Unable to delete the provided contact. Ensure contant exists.", 500);
            }
            
            $stmt->close();
            $conn->close();
        }
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
