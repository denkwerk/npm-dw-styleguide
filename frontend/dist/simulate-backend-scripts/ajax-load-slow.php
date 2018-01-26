<?php

$seconds = isset($_GET['delay']) ? $_GET['delay'] : 1;
$src = isset($_GET['src']) ? $_GET['src'] : 'media-slider-1-medium-2x.jpg';
//$src = '../../../../../../frontend/src/img/dummy/' . $src;
//$src = '../../../../../../' . $src;
sleep($seconds);


header ('content-type: application/json');
$src = 'http://' . $_SERVER['SERVER_NAME'] . $src;
//$src = $_SERVER['HTTP_HOST'] . $src;


readfile($src);



