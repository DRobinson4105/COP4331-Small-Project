<?php
	
	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	$fName = $inData["FirstName"];
	$lName = $inData["LastName"];
	$username = $inData["Username"];
	$password = $inData["Password"];
	$cpassword= $inData["CPassword"];
	

	$conn = new mysqli("localhost", "User", "COP4331OMg", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//creates a variable named fname using the variable fname from the html.
		/*The html variable is subject to changed based on the actual name
		$fname = $_POST['firstName'];
		$lname = $_POST['lastName'];
		$username = $_POST['login'];
		$password = $_POST['password'];
		$cpassword = $_POST['cpassword'];confirm password*/

		$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Username,Password) VALUES(?,?,?,?,?)");
		$stmt->bind_param("ssss", $fName, $lName, $username, $password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");


		if ($password == $cpassword)//Check if passwords match
		{
			//Check to see if the username is already in use
			$query = mysqli_query($mysqli, $username);

			if($result == TRUE)//Username is already in database
			{
			echo "Username already exists";
			}
			else//Username not in database
			{
				//Add the user
				$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
				$stmt->bind_param("ssss", $fname, $lname, $username, $password);
				$stmt->execute();
				$stmt->close();
				$conn->close();
				returnWithError("");
			}
		}
		else//If not, tell them it doesn't match
		{
			$_SESSION['message'] = "Passwords do not match.";
			//Should output to some place in the HTML files
			exit(0);

		}
	}


?>
