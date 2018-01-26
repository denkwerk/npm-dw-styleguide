<?php
$seconds = isset($_GET['delay']) ? $_GET['delay'] : 1;
$src = isset($_GET['src']) ? $_GET['src'] : 'media-slider-1-medium-2x.jpg';
sleep($seconds);
header ('content-type: text/html');
$src = 'http://' . $_SERVER['SERVER_NAME'] . $src;
readfile($src);
