<?php
	$inData = getRequestInfo();

	if (!isset($inData['id'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$id = $inData["id"];


        $conn = new mysqli("localhost", "User", "COP4331OMg", "COP4331");

        if ($conn->connect_error) {
            returnWithError( $conn->connect_error, 500);
        } else {
            $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID =?");
            $stmt->bind_param("s", $id);

            $stmt->execute();
            returnWithInfo();
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
