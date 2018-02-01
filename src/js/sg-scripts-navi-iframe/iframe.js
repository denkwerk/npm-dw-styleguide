var SGB = window.SGB || {};
( function( w, SGB, undefined ) {
    /*
     ** init iframe resizer
     ** https://github.com/davidjbradshaw/iframe-resizer
     ** http://davidjbradshaw.github.io/iframe-resizer/
     */
    // eslint-disable-next-line no-undef
    var iframeResize = iFrameResize( {
        checkOrigin: false, // https://github.com/davidjbradshaw/iframe-resizer/issues/45
        //hide timeout warnings
        warningTimeout: 0,
        // include pos: absolute elements and bigger elements coming in when interacting with sth
        // heightCalculationMethod: 'min',
        // recalculate the sticky headers
        initCallback: function() {
            SGB._recalculateStickies();

            document.addEventListener( SGB.transitionEndEventName(), function( event ) {
                SGB._recalculateStickies();
            } );
        },
        resizedCallback: function() {

            SGB._recalculateStickies();

            // TODO: why this?
            // $( this ).bind( 'transitionend', function( event ) {
            //     _recalculateStickies();
            // } );
        }
    }, 'iframe' );

    var iframes = document.querySelectorAll( 'iframe' );

    SGB.changeIframeWidth = function( event ) {
        var newWidth = event.currentTarget.getAttribute( 'data-width' ),
            navigationContainer = document.querySelector( '.sg-navigation-container' ),
            buttonActiveClass = 'sg-btn-active',
            responsiveToggleButton = document.querySelector(
                '.js-sg-btn-responsive-toggle.' + buttonActiveClass
            );

        Array.prototype.forEach.call( iframes, function( iframe ) {

            // add this class to html for styling purposes
            // we have a modal showing up from closing navigation till resizing iframe width & height
            SGB.html.classList.add( 'sg-refreshing-modules-modal' );
            // resize iframe width after navigation has closed
            navigationContainer.addEventListener( 'transitionend', function( event ) {
                iframe.style.width = newWidth;
            } );

            // resize iframe height after iframe width is done
            // also recalculate the sticky headers and remove the styling class
            iframe.addEventListener( 'transitionend', function( event ) {
                iframe.iFrameResizer.resize();
                SGB._recalculateStickies();
                SGB.html.classList.remove( 'sg-refreshing-modules-modal' );
            } );

            // set active class to clicked button

            if ( responsiveToggleButton ) {
                responsiveToggleButton.classList.remove( buttonActiveClass );
                responsiveToggleButton.removeAttribute( 'disabled', 'disabled' );
            }
            event.currentTarget.classList.add( buttonActiveClass );
            event.currentTarget.setAttribute( 'disabled', 'disabled' );
        } );
    };

}( this, SGB ) );
