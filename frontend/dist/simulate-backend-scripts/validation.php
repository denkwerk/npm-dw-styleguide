<?php

$valType = $_GET["validator"];
$jsonSend = file_get_contents("php://input");
$jsonDecode = json_decode($jsonSend);
$message = 'Bitte machen Sie eine Angabe.';

$val = $jsonDecode->{'input'};
$val2 = '';
$valid = "true";

if ( $val == '' || $val == 'checkbox-not-checked' ) {
    $valid = "false";
}

$validator = 'Notempty';

if ( $valType == 'notempty2') {
    $valid = "false";
    $validator = 'Notempty2';
} else if ( $valType === 'emailexists' ) {
    $valid = ($val === 'exists@example.com') ? 'false' : 'true';
    $validator = 'emailexists';
}

//$val2 = '';
if ( $valType == 'passwordRepeat') {
    $val2 = $jsonDecode->{'inputLinkedEl'};
    if ( $val != $val2 ) {
        $valid = "false";
    }
    $validator = 'PasswordRepeat';
    $message = 'Bitte geben Sie das gleiche Passwort ein.';
}

if ( $valType == 'email') {
    if ( $val == '' ) {
        $valid = "false";
    }
    $validator = 'email';
    $message = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
}


$removeLinkedElValidationDisplay = "false";
$removeInputValidationDisplay = "false";
if ( $valType == 'passwordAndCheckbox1') {
    $val2 = $jsonDecode->{'inputLinkedEl'};
    if ( $val2 != '' ) {
        if ( $val == '' ) {
            $valid = "false";
        }
    } else {
        $valid = "true";
        $removeLinkedElValidationDisplay = "true";
    }

    if ( $val == '' && $val2 == '' ) {
        $removeInputValidationDisplay = "true";
    }
    $validator = 'passwordAndCheckbox1';
    $message = 'Geben Sie das Passwort an.';
}

if ( $valType == 'passwordAndCheckbox2') {
    $val2 = $jsonDecode->{'inputLinkedEl'};
    if ( $val2 != '' ) {
        if ( $val == '' ) {
            $valid = "false";
        }
    } else {
        $valid = "true";
        $removeLinkedElValidationDisplay = "true";
    }
    if ( $val == '' && $val2 == '' ) {
        $removeInputValidationDisplay = "true";
    }
    $validator = 'passwordAndCheckbox2';
    $message = 'Haken Sie die Checkbox an.';
}


$json =
    '
{
   "isValid": '.$valid.',
   "message": "' . $message . '",
   "input": "'.$val. '",
   "removeInputValidationDisplay": ' . $removeInputValidationDisplay . ',
   "inputLinkedEl": "' .$val2. '",
   "removeLinkedElValidationDisplay": ' . $removeLinkedElValidationDisplay . ',
   "validator": "' . $validator. '",
   "options": [

   ]
}
';




echo $json;

?>
