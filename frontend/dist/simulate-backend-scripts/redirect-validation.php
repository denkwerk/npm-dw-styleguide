<?php


$jsonSend = file_get_contents("php://input");
//$jsonDecode = $jsonSend;
$jsonDecode = json_decode($jsonSend);
//$jsonDecode = $jsonSend;

//$val = 'test';
$val = $jsonDecode[0]->value;

$valid = "error";
//$val = '';
//if ( $val == '1' ) {
if ($val != '') {
    $valid = "success";
}


$valid = "error";
$valid = "success";

$json =
    '
{
   "status": "' . $valid . '",
    "states" : [
    {
        "success": {
            "targetUrl": "http"
        }
    },
    {
        "error": {
            "message": "<div aria-live=\"assertive\">                        <div class=\"msg-feedback-neg space-bottom-40\">                            <span class=\"msg-feedback__icon\"></span>                            <p class=\"msg-feedback__msg\">Ihre Login-Daten sind nicht korrekt.</p>          </div>"                                    
        }
    }
    ]
                            
}	   
';


echo $json;

?>
