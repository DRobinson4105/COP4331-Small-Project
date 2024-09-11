<?php
	$inData = getRequestInfo();
	//error_reporting(E_ALL);
	//ini_set('display_errors', 1);
	
	if (!isset($inData['firstName']) || !isset($inData['lastName']) || !isset($inData['userId']) || !isset($inData['phoneNumber']) || !isset($inData['email'])) {
		returnWithError("Invalid input", 400);
		return;
	}

	$fName = $inData["firstName"];
	$lName = $inData["lastName"];
	$userId = $inData["userId"];
	$phoneNum = $inData["phoneNumber"];
	$email = $inData["email"];
    	$fullName = $fName.' '.$lName;
	echo $fullName;
	
	$database_username = "User";
	$database_password = "COP4331OMg";
	$database_name = "COP4331";

    	$conn = new mysqli("localhost", $database_username, $database_password, $database_name);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error, 500);
	} 
	else
	{
		//Parameters maybe different as we need a name, phone number, email
		$stmt = $conn->prepare("INSERT into Contacts (UserId,FullName,FirstName,LastName,Phone,Email) VALUES(?,?,?,?,?)");
		$stmt->bind_param("ssssss", $userId, $fullName, $fName, $lName, $phoneNum, $email);
		if($stmt->execute()){
			$stmt->close();
			
			$Id = $conn->insert_id;
			$conn->close();
			sendResultInfoAsJson($Id);
			returnWithError("", 200);
		}
		else
		{
			returnWithError("Contact could not be added at this time", 500);
			$conn->close();
		}
		//echo $fName," ", $userId," ", $lName,"", $email," ";
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
	
?>
