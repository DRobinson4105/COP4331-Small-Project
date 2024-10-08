<?php
	$inData = getRequestInfo();

	if (!isset($inData['startIndex']) || !isset($inData['endIndex']) || !isset($inData['userId']) || !isset($inData['fullName'])) {
		returnWithError("Invalid input", 400);
		return;
	}
	
	$searchResults = "";
	$searchCount = 0;

	$database_username = "User";
	$database_password = "COP4331OMg";
	$database_name = "COP4331";

	$startIndex = $inData["startIndex"];
	$endIndex = $inData["endIndex"];

	$limit = $inData["endIndex"] - $inData["startIndex"];
    $userId = $inData["userId"];

    //Connect to database.
	$conn = new mysqli("localhost", $database_username, $database_password, $database_name); 
	if ($conn->connect_error) {
		returnWithError( $conn->connect_error , 500);
	} else {
        //Search through names 
        $stmt = $conn->prepare("select * from Contacts where UserID=? and FullName like ? LIMIT ? OFFSET ?");
		$contactFullName = "%" . $inData["fullName"] . "%";
		$stmt->bind_param("ssss", $userId, $contactFullName, $limit, $startIndex); 
			if ($userId < 1){
				returnWithError("User Id is not valid.", 400);
			}
		    else{
                $stmt->execute();
                
                $result = $stmt->get_result();
                
                $contacts = array();
                while ($row = $result->fetch_assoc()) {
                    $contact = array(
                        "id" => $row["ID"],
                        "firstName" => $row["FirstName"],
                        "lastName" => $row["LastName"],
                        "phone" => $row["Phone"],
                        "email" => $row["Email"],
                    );
                    $contacts[] = $contact;
                }
              returnWithInfo(json_encode($contacts));
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
	
	function returnWithInfo($searchResults) {
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
