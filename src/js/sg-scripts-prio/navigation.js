var SGB = window.SGB || {};
( function( w, SGB, undefined ) {
// All the stuff I can't do in vanilla js b/c I'm a noob.
// REFACTOR THIS!
// -jLaz

// some navigation magic

    var lv0LinkParent = document.querySelectorAll( '.sg-nav-link-lv-0.js-sg-nav-link-parent' );
    var lv1activeClass = 'nav-lv1-is-active';
    var closeLV1Button = document.querySelector( '.js-sg-sub-nav-toggle' );
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
        if ( !transitionActive ) {
            SGB._toggleClass( html, 'nav-is-active' );
        }
    };

    var transitionActive = false; // prevents errors caused by actions while transition is running
    SGB.toggleOpeningClosingClass = function() {
        var navContainer = document.querySelector( '.sg-navigation-container' );
        if ( !transitionActive && html.classList.contains( 'nav-opened' ) ) {
            html.classList.remove( 'nav-opened' );
            html.classList.add( 'nav-closing' );
            transitionActive = true;
            navContainer.addEventListener( SGB.transitionEndEventName(), function( event ) {
                html.classList.remove( 'nav-closing' );
                html.classList.add( 'nav-closed' );
                transitionActive = false;
                // eslint-disable-next-line no-caller
                event.target.removeEventListener( event.type, arguments.callee );
            } );

        } else {
            if ( !transitionActive ) {
                html.classList.remove( 'nav-closed' );
                html.classList.add( 'nav-opening' );
                transitionActive = true;
                navContainer.addEventListener( SGB.transitionEndEventName(), function( event ) {
                    html.classList.remove( 'nav-opening' );
                    html.classList.add( 'nav-opened' );
                    transitionActive = false;
                    // eslint-disable-next-line no-caller
                    event.target.removeEventListener( event.type, arguments.callee );
                } );
            }

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


    document.addEventListener( 'click', function( event ) {
        var elClosest = SGB._getClosest( event.target, '.sg-nav-toggle-container' );
        var elClosest2 = SGB._getClosest( event.target, '.sg-navigation-container' );
        if ( elClosest === null && elClosest2 === null && html.classList.contains( 'nav-opened' ) ) {
            document.querySelector( '.js-sg-nav-toggle' ).click();
        }
    } );

    /**/

    var navLinkParent = '.js-sg-nav-link-parent';
    var navOpenedClass = 'sg-nav-opened';
    var navOpenedSelector = '.' + navOpenedClass;

    // $( document ).on( 'click', navLinkParent, function( event ) {
    var navLinkParentEls = document.querySelectorAll( navLinkParent );

    Array.prototype.forEach.call( navLinkParentEls, function( el ) {
        if ( !el.classList.contains( 'js-sg-nav-link-parent-one-child-with-same-name' ) ) {
            el.addEventListener( 'click', function( event ) {

                if ( event.target && event.target.classList.contains( 'sg-nav-text-link' ) ) {
                    return;
                }

                current = this;

                /*
                 ** Open the current next level list.
                 */

                // var thisSiblingItem = $( this ).siblings().find( '> .js-sg-nav-item' );

                // :scope has not good browser support, so work with children
                // (https://developer.mozilla.org/de/docs/Web/API/Element/querySelectorAll)
                // var thisSiblingItem = SGB.siblings( this )[ 0 ].querySelectorAll( ':scope > .js-sg-nav-item' );
                // Array.prototype.forEach.call( thisSiblingItem, function( el ) {
                //     SGB._toggleClass( el, 'sg-show-item' );
                // } );

                var thisSiblingItem = SGB.siblings( this )[ 0 ];

                Array.prototype.forEach.call( thisSiblingItem.children, function( el ) {
                    if ( el.classList.contains( 'js-sg-nav-item' ) ) {
                        SGB._toggleClass( el, 'sg-show-item' );
                    }
                } );

                /*
                 ** add an extra class b/c the icon toggle is buggy when it comes to multiple levels
                 */

                SGB._toggleClass( this, navOpenedClass );

                /*
                 ** detect if nav-text has more than one line and if yes, add class multiline
                 */

                var navText = document.querySelectorAll( '.js-sg-nav-text' );

                Array.prototype.forEach.call( navText, function( el ) {
                    if ( SGB.height( el ) > 30 ) {
                        el.parentNode.classList.add( 'multiline' );
                    }
                } );

            } );

        }
    } );


    // extra class in action: using this to find all items with minus icons
    // to resolve the bug where lv1 items were still on minus when closed.
    // b/c of that, the next toggle gave them the plus icon but they were then open
    // so it was the opposite way around.
    // -jLaz

    var navOpenedSelectorEls = document.querySelectorAll( navOpenedSelector );
    Array.prototype.forEach.call( navOpenedSelectorEls, function( el ) {
        el.addEventListener( 'click', function( event ) {
            if ( event.target && event.target.classList.contains( 'sg-nav-text-link' ) ) {
                return;
            }

            this.classList.remove( navOpenedClass );
            this.parentNode.querySelector( navOpenedSelector ).classList.remove( navOpenedClass );
            this.parentNode.querySelector( navShowItemSelector ).classList.remove( navShowItemClass );

            // eslint-disable-next-line no-caller
            event.target.removeEventListener( event.type, arguments.callee );
        } );
    } );

    // media query event handler for screen <=768px
    // https://www.sitepoint.com/javascript-media-queries/
    // -jLaz

    if ( window.matchMedia ) {
        var toMQ = window.matchMedia( '(max-width: 768px)' );
        toMQ.addListener( WidthChange );
        WidthChange( toMQ );
    }

    // media query change
    function WidthChange( toMQ ) {
        if ( toMQ.matches ) {

            // add an active class for lv1 navigation
            Array.prototype.forEach.call( lv0LinkParent, function( el ) {
                el.addEventListener( 'click', function( event ) {
                    if ( !document.querySelector( 'html' ).classList.contains( lv1activeClass ) ) {
                        document.querySelector( 'html' ).classList.add( lv1activeClass );
                    }
                } );
            } );

            // mobile nav close button for lv1
            closeLV1Button.addEventListener( 'click', function( event ) {
                document.querySelector( 'html' ).classList.remove( lv1activeClass );

                // we cant use .toggle here b/c this leads to problematic behaviour
                // so we need to do special things for special elements

                // var navList = $( current ).siblings( '.sg-nav-list' );
                var navList = SGB.siblings( current, function( el ) {
                    return el.classList.contains( 'sg-nav-list' );
                } );


                Array.prototype.forEach.call( navList, function( navListSingle ) {
                    if ( navListSingle.classList.contains( 'sg-nav-lv-1' ) ) {
                        navListSingle.addEventListener( SGB.transitionEndEventName(), function( event ) {

                            var showItems = event.target.querySelectorAll( navShowItemSelector );

                            if ( showItems !== null ) {
                                Array.prototype.forEach.call( showItems, function( item ) {
                                    item.classList.remove( navShowItemClass );
                                } );
                            }

                            var navOpenedSelectorDom = document.querySelectorAll( navOpenedSelector );
                            Array.prototype.forEach.call( navOpenedSelectorDom, function( item ) {
                                item.classList.remove( activeClass );
                                item.classList.remove( navOpenedClass );
                            } );
                            // eslint-disable-next-line no-caller
                            event.target.removeEventListener( event.type, arguments.callee );
                        } );

                    } else {
                        document.querySelector( navOpenedSelector + ' + .sg-nav-lv-1' ).addEventListener(
                            SGB.transitionEndEventName(), function( event ) {

                                var showItems = event.target.querySelectorAll( navShowItemSelector );
                                if ( showItems !== null ) {
                                    Array.prototype.forEach.call( showItems, function( item ) {
                                        item.classList.remove( navShowItemClass );
                                    } );
                                }

                                var navOpenedSelectorDom = document.querySelectorAll( navOpenedSelector );
                                Array.prototype.forEach.call( navOpenedSelectorDom, function( item ) {
                                    item.classList.remove( activeClass );
                                    item.classList.remove( navOpenedClass );
                                } );

                                // eslint-disable-next-line no-caller
                                event.target.removeEventListener( event.type, arguments.callee );

                            } );
                    }
                } );

            } );

        }

    }
}( this, SGB ) );
