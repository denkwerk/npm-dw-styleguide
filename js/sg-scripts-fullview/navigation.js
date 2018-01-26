( function( w, SGB, undefined ) {
// All the stuff I can't do in vanilla js b/c I'm a noob.
// REFACTOR THIS!
// -jLaz

// some navigation magic

    var lv0LinkParent = $( '.sg-nav-link-lv-0.js-sg-nav-link-parent' );
    var lv1activeClass = 'nav-lv1-is-active';
    var closeLV1Button = $( '.js-sg-sub-nav-toggle' );
    var navShowItemClass = 'sg-show-item';
    var navShowItemSelector = '.' + navShowItemClass;

    var current;

    var activeClass = 'active';

    /*
     ** highlight active section in navigation
     ** useful???
     */

    Array.prototype.forEach.call( document.querySelectorAll( '.js-sg-section' ), function( section ) {
        section.addEventListener( 'mouseenter', function( event ) {
            var anchor = event.currentTarget.querySelector( '.js-sg-section-anchor' ),
                id = anchor ? anchor.id : null;

            Array.prototype.forEach.call( document.querySelectorAll( '[href="#' + id + '"]' ), function( link ) {
                link.classList.add( activeClass );
            } );
        } );

        section.addEventListener( 'mouseleave', function( event ) {
            var anchor = event.currentTarget.querySelector( '.js-sg-section-anchor' ),
                id = anchor ? anchor.id : null;

            Array.prototype.forEach.call( document.querySelectorAll( '[href="#' + id + '"]' ), function( link ) {
                link.classList.remove( activeClass );
            } );
        } );
    } );

    /*
     ** toggle navigation container when we click the menu/close button
     ** and also when we click on a nav link
     */

    var html = SGB.html;

    SGB.toggleNavigationContainer = function() {
        SGB._toggleClass( html, 'nav-is-active' );
    };

    SGB.toggleOpeningClosingClass = function() {
        if ( SGB._hasClass( html, 'nav-opened' ) ) {
            SGB._removeClass( html, 'nav-opened' );
            SGB._addClass( html, 'nav-closing' );

            $( '.sg-navigation-container' ).one( 'transitionend', function( event ) {
                SGB._removeClass( html, 'nav-closing' );
                SGB._addClass( html, 'nav-closed' );
            } );

        } else {
            SGB._removeClass( html, 'nav-closed' );
            SGB._addClass( html, 'nav-opening' );

            $( '.sg-navigation-container' ).one( 'transitionend', function( event ) {
                SGB._removeClass( html, 'nav-opening' );
                SGB._addClass( html, 'nav-opened' );
            } );
        }
    };

    Array.prototype.forEach.call( SGB.queryAll( '.js-sg-nav-toggle' ), function( el ) {
        el.addEventListener( 'click', SGB.toggleNavigationContainer );
        el.addEventListener( 'click', SGB.toggleOpeningClosingClass );
    } );

    Array.prototype.forEach.call( SGB.queryAll( '.js-sg-nav-link-child' ), function( el ) {
        el.addEventListener( 'click', SGB.toggleNavigationContainer );
        el.addEventListener( 'click', SGB.toggleOpeningClosingClass );
    } );

    /**/

    var navLinkParent = '.js-sg-nav-link-parent';
    var navOpenedClass = 'sg-nav-opened';
    var navOpenedSelector = '.' + navOpenedClass;

    $( document ).on( 'click', navLinkParent, function( event ) {

        if ( event.target && $( event.target ).hasClass( 'sg-nav-text-link' ) ) {
            return;
        }

        current = this;

        /*
         ** Open the current next level list.
         */

        var thisSiblingItem = $( this ).siblings().find( '> .js-sg-nav-item' );
        thisSiblingItem.toggleClass( 'sg-show-item' );
        //SGB._toggleClass( thisSiblingItem, 'sg-show-item' );

        /*
         ** add an extra class b/c the icon toggle is buggy when it comes to multiple levels
         */

        SGB._toggleClass( this, navOpenedClass );

        /*
         ** detect if nav-text has more than one line and if yes, add class multiline
         */

        var $navText = $( '.js-sg-nav-text' );

        $navText.each( function() {
            if ( $( this ).height() > 30 ) {
                $( this ).parent().addClass( 'multiline' );
            }
        } );
    } );

    // extra class in action: using this to find all items with mius icons
    // to resolve the bug where lv1 items were still on minus when closed.
    // b/c of that, the next toggle gave them the plus icon but they were then open
    // so it was the opposite way around.
    // -jLaz

    $( document ).on( 'click', navOpenedSelector, function( event ) {
        if ( event.target && $( event.target ).hasClass( 'sg-nav-text-link' ) ) {
            return;
        }

        $( this ).removeClass( navOpenedClass );
        $( this ).parent().find( navOpenedSelector ).removeClass( navOpenedClass );
        $( this ).parent().find( navShowItemSelector ).removeClass( navShowItemClass );

    } );

    // media query event handler for screen <=768px
    // https://www.sitepoint.com/javascript-media-queries/
    // -jLaz

    if ( matchMedia ) {
        var toMQ = window.matchMedia( '(max-width: 768px)' );
        toMQ.addListener( WidthChange );
        WidthChange( toMQ );
    }

    // media query change
    function WidthChange( toMQ ) {
        if ( toMQ.matches ) {

            // add an active class for lv1 navigation

            lv0LinkParent.on( 'click', function( ) {

                if ( !$( 'html' ).hasClass( lv1activeClass ) ) {
                    $( 'html' ).addClass( lv1activeClass );
                }

            } );

            // mobile nav close button for lv1

            closeLV1Button.on( 'click', function( event ) {

                $( 'html' ).removeClass( lv1activeClass );

                // we cant use .toggle here b/c this leads to problematic behaviour
                // so we need to do special things for speacial elements

                var navList = $( current ).siblings( '.sg-nav-list' );

                if ( navList.hasClass( 'sg-nav-lv-1' ) ) {
                    navList.one( 'transitionend', function( event ) {

                        $( event.target ).find( navShowItemSelector ).removeClass( navShowItemClass );
                        $( navOpenedSelector ).removeClass( activeClass ).removeClass( navOpenedClass );

                    } );
                } else {
                    $( navOpenedSelector + ' + .sg-nav-lv-1' ).one( 'transitionend', function( event ) {

                        $( event.target ).find( navShowItemSelector ).removeClass( navShowItemClass );
                        $( navOpenedSelector ).removeClass( activeClass ).removeClass( navOpenedClass );

                    } );
                }

            } );

        } else {
            // window width is >=769px
        }

    }
}( this, SGB ) );
