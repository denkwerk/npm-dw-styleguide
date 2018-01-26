<?php


$html =
    '
<li class="list-table__row">
    <div class="list-table__cell">
        <p class="message-availab-neg js-filter-status" data-filter-status="2">AJAX Reserviert</p>
        <p class="js-filter-nr" data-filter-nr="231456781">BUCHUNGSNR. MO-231456787</p>
        <p class="js-filter-name">Max Mustermann 1</p>
    </div>
    <div class="list-table__cell">
        <p class="js-filter-hotel">Motel One München-Deutsches Museum</p>
        <p class="js-filter-date" data-filterdate="1">25.08.2016 - 26.08.2016</p>
        <p class="js-filter-price" data-filter-price="1128">1128,00 €</p>
    </div>
    <div class="list-table__cell list-table__cell--md-right">
        <a href="#" class="button-three-forward">Details</a>
    </div>
</li>
';

$html =  $html . $html . $html . $html . $html . $html . $html . $html . $html . $html;

$html = json_encode($html);


$str = '
{
    "loadMoreStillPossible":"1",
    "html":

';

$str .= $html;


$str .= '}';

echo $str;

?>
