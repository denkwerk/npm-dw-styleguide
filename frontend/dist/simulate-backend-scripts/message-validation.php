<?php


$jsonSend = file_get_contents("php://input");
//$jsonDecode = $jsonSend;
$jsonDecode = json_decode($jsonSend);
//$jsonDecode = $jsonSend;

//$val = 'test';
$max = sizeof($jsonDecode) - 1;
$val = $jsonDecode[0]->value;
//$message = $jsonDecode[$max]->message;

//$valid = "false";
////$val = '';
//if ( $val != '' ) {
//    $valid = "true";
//}


$valid = "error";
//$val = '';
if ( $val != '' ) {
    $valid = "success";
}


//$message = addslashes($message);

//$json =
//    '
//{
//   "success": '.$valid.',
//   "message": "'.$message.'"
//}
//';

$json =
    '
{
   "status": "' . $valid . '",
    "states" : [
    {
        "success": {
          "message": "                  <div aria-live=\"assertive\">                        <div class=\"msg-feedback-pos space-bottom-40\">                            <span class=\"msg-feedback__icon\"></span>                            <p class=\"msg-feedback__msg\">Ihr Passwort wurde erfolgreich zurückgesetzt.</p>                        </div>                        <p class=\"copy-m text-center\">Wir haben Ihnen das neue Passwort per E-Mail geschickt,                            bitte gehen Sie in Ihren Posteingang und lorem ipsum sic semper para solas.</p>                    </div>"
        }
    }
    ]
                            
}	   
';

echo $json;

?>
