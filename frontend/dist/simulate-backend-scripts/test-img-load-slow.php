<?php

$seconds = isset($_GET['delay']) ? $_GET['delay'] : 1;
$ext = isset($_GET['ext']) ? $_GET['ext'] : 'jpeg';
if ( $ext == 'jpg') {
    $ext = 'jpeg';
}
$src = isset($_GET['src']) ? $_GET['src'] : 'media-slider-1-medium-2x.jpg';
//$src = '../../../../../../frontend/src/img/dummy/' . $src;
//$src = '../../../../../../' . $src;
sleep($seconds);


header ('content-type: image/' . $ext);
//header ('content-type: image/jpeg');
$src = 'http://' . $_SERVER['SERVER_NAME'] . $src;
//$src = $_SERVER['HTTP_HOST'] . $src;


readfile($src);



