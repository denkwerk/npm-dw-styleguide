( function( w, SGB, undefined ) {

    /*
     ** Instagram-Like sticky headers
     ** https://codepen.io/sales/pen/oxqzOe
     ** with modifications (comments)
     ** -jLaz
     **
     ** Without jQuery! Bouyah!
     ** -mariusbuescher
     **/

    if ( navigator.userAgent.toLowerCase().indexOf( 'firefox' ) > -1 ) {
        // no sticky headres for firefox
        // b/c there is a bug with the non-fixed elements and transform
    } else {

        SGB.stickyInfo = [];

        var stickyHeaders = ( function() {
            var load = function( stickies ) {
                stickyInfo = Array.prototype.map.call( stickies, function( el ) {

                    var wrapper = document.createElement( 'div' );
                    wrapper.classList.add( 'js-sticky-header-helper' );

                    el.parentElement.insertBefore( wrapper, el.parentElement.children[ 0 ] );
                    wrapper.appendChild( el );

                    wrapper.style.height = el.scrollHeight + 'px';

                    return {
                        el: el,
                        originalHeight: el.scrollHeight,
                        originalPosition: el.getBoundingClientRect().top
                    };
                } );

                window.addEventListener( 'scroll', function() {
                    _whenScrolling();
                } );
            };

            var _whenScrolling = function() {
                stickyInfo.forEach( function( info, i ) {
                    var nextSticky = stickyInfo[ i + 1 ];
                    if ( typeof nextSticky !== 'undefined' ) {
                        var nextStickyPosition = info.originalPosition - window.scrollY;

                        if ( nextStickyPosition <= 0 ) {
                            info.el.classList.add( 'fixed' );
                            if ( nextSticky.originalPosition - window.scrollY - info.originalHeight < 0 ) {
                                info.el.style.top =
                                    ( nextSticky.originalPosition - window.scrollY - info.originalHeight ) + 'px';
                            } else {
                                info.el.style.top = null;
                            }
                        } else {
                            info.el.classList.remove( 'fixed' );
                        }
                    }
                } );
            };

            return {
                load: load
            };
        }() );

        // because we're responsive, we need to update the height value on the sticky headers
        window.addEventListener( 'resize', function() {
            var stickyHeaderHelper = document.querySelector( '.js-sticky-header-helper' );
            // TODO: Check if stickyHeaderHelper is usefull or buggy only
            if ( stickyHeaderHelper !== null ) {
                stickyHeaderHelper.style.height = document.querySelector( '.js-sg-section-header' ).clientHeight + 'px';
            }
        } );

        // sticky headers - you can make it happen. You can make it REAL!
        // TODO: It's not working as expected by me - discuss with J.L.
        // $( function() {
        //     stickyHeaders.load( document.querySelectorAll( '.js-sg-section-header' ) );
        // } );

        // recalculate the sticky headers again after we toggle one of the documentation or source buttons
        SGB.recalculateStickiesOnDocumentationToggleBtn = function() {
            var thisContainer = SGB._getClosest( this, '.js-sg-section' )
                .querySelector( '.js-sg-documentation-container' );
            thisContainer.addEventListener( 'transitionend', function( event ) {
                SGB._recalculateStickies();
            } );
        };

        SGB.recalculateStickiesOnSourceToggleBtn = function() {
            var thisContainer = SGB._getClosest( this, '.js-sg-section' )
                .querySelector( '.js-sg-source-container' );
            thisContainer.addEventListener( 'transitionend', function( event ) {
                SGB._recalculateStickies();
            } );
        };

        Array.prototype.forEach.call( SGB.queryAll( '.js-sg-btn-documentation' ), function( el ) {
            el.addEventListener( 'click', SGB.recalculateStickiesOnDocumentationToggleBtn );
        } );

        Array.prototype.forEach.call( SGB.queryAll( '.js-sg-btn-source' ), function( el ) {
            el.addEventListener( 'click', SGB.recalculateStickiesOnSourceToggleBtn );
        } );
    }

}( this, SGB ) );
