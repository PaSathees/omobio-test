<?php
//setting header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//function to create response msg
function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

//include Database class file
require __DIR__.'/classes/Database.php';

//create object of Database class and try to connect to DB
$db_connection = new Database();
$conn = $db_connection->dbConnection();

//get data from the request
$data = json_decode(file_get_contents("php://input"));

//array for return value
$returnData = [];

//check request method
if($_SERVER["REQUEST_METHOD"] != "POST"){
 $returnData = msg(0,404,'No such request Found!');
} 
//validate data
elseif(!isset($data->username) || !isset($data->password) 
       || empty(trim($data->username)) || empty(trim($data->password))){
 $returnData = msg(0,422,'Please fill all required fields');
}
else {
 //create variables for recieved data
  $username = $data->username;  
  $password = $data->password;  

  try {
   //create query to get the user of the email and run
   $query = "SELECT * FROM `User` WHERE `username`=:username";
   $query_stmt = $conn->prepare($query);
   $query_stmt->bindValue(':username', $username, PDO::PARAM_STR);
   $query_stmt->execute();

   //if user is found
   if($query_stmt->rowCount()){
    $row = $query_stmt->fetch(PDO::FETCH_ASSOC);

    //if password is correct, send response with user's details
    if($password === $row['password']){  
     $id = $row['id'];
     $uName = $row['username'];
     $name = $row['name'];
     $email = $row['email'];

     $returnData = [
      'success' => 1,
      'message' => 'Successfully logged in.',
      'id' => $id,
      'username' => $uName,
      'name' => $name,
      'email' => $email,
     ];
    } else {
     $returnData = msg(0,422,'Incorrect Password!');
    }
   } else {
    $returnData = msg(0,422,'No such email found!');
   }
  } catch (PDOException $e) {
   $returnData = msg(0,500,$e->getMessage());
  }
}

//send response
echo json_encode($returnData);
?>