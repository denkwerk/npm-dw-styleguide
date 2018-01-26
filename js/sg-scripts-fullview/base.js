/**
 * sg-custom-fullview.js
 */

var SGB = window.SGB || {};

( function( w, SGB, undefined ) {

    var doc = w.document; //html

    // Cut the mustard
    if ( 'querySelector' in doc && Array.prototype.forEach ) {

        /*
        ** recalculate the height of the content of the current sg-section
        ** so that the next sticky header knows its new position
        ** when source code or documentation is toggled.
        ** b/c the function in Instagram-Like sticky headers fires on documend.load
        ** -jLaz & mbuescher
        */

        SGB._recalculateStickies = function() {
            if ( navigator.userAgent.toLowerCase().indexOf( 'firefox' ) > -1 ) {
                // no sticky headres for firefox
                // b/c there is a bug with the non-fixed elements and transform
            } else {
                SGB.stickyInfo.forEach( function( info ) {
                    info.originalHeight = info.el.scrollHeight;
                    info.originalPosition = info.el.getBoundingClientRect().top;
                    info.el.parentElement.style.height = info.el.scrollHeight + 'px';
                } );
            }
        };

        Array.prototype.forEach.call( SGB.queryAll( '.js-sg-btn-responsive-toggle' ), function( el ) {
            el.addEventListener( 'click', SGB.changeIframeWidth );
            el.addEventListener( 'click', SGB.toggleNavigationContainer );
            el.addEventListener( 'click', SGB.toggleOpeningClosingClass );
        } );

    }
}( this, SGB ) );

