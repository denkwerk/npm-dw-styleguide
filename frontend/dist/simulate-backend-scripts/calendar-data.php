<?php
$seconds = isset($_GET['delay']) ? $_GET['delay'] : 0;
$error = isset($_GET['error']) ? $_GET['error'] : '';
sleep($seconds);
if ( $error == '' ) {
    echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/frontend/dist/_data/arrival.json');
} else {
var_dump(http_response_code($error));
}
