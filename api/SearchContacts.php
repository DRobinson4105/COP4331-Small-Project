<?php

	$inData = getRequestInfo();

	if (!isset($inData['startIndex']) /*|| !isset($inData['endIndex']) || !isset($inData['userId']) || !isset($inData['firstName']) || !isset($inData['lastName'])*/) {
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

	$Limit = $inData["endIndex"] - $inData["startIndex"];

    //Connect to database.
	$conn = new mysqli("localhost", $database_username, $database_password, $database_name); 
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error , 500);
	} 
	else
	{
        //Search through names 
        $stmt = $conn->prepare("select * from Contacts where UserID=? and FirstName like ? or LastName like ? LIMIT ? OFFSET ?");
		$contactFName = "%" . $inData["firstName"] . "%";
		$contactLName = "%" . $inData["lastName"] . "%";
		$stmt->bind_param("sssss", $inData["UserId"], $contactFName, $contactLName, $Limit, $startIndex); 
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		$contacts = array();
			while ($row = $result->fetch_assoc()) 
			{
				$contact = array(
					"id" => $row["ID"],
					"firstName" => $row["FirstName"],
					"lastName" => $row["LastName"],
					"phone" => $row["Phone"],
					"email" => $row["Email"],
				);
				$contacts[] = $contact;
			}


		
		// while($row = $result->fetch_assoc())
		// {	
		// 	$myContact = new Contact();
		// 	$myContact->fname = $row["FirstName"];
		// 	$myContact->lname = $row["LastName"];
		// 	$myContact->id = $row["ID"];
		// 	$myContact->userid = $row["UserID"];
		// 	$myContact->phone = $row["Phone"];
		// 	$myContact->email = $row["Email"];
		// 	if( $searchCount > 0 )
		// 	{
		// 		$searchResults .= ",";
		// 	}
		// 	$searchCount++;
		// 	$searchResults .= '"' . $myContact . '"';
		// }
		$stmt->close();
		$conn->close();
		
		returnWithInfo(json_encode($contacts));
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
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>