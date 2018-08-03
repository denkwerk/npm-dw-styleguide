/**
 * sg-custom.js
 */

var SGB = window.SGB || {};

( function( w, SGB, undefined ) {

    /**
     * Get parent element with given selector
     *
     * @param {HTMLElement} element
     * @param {String} selector
     * @return {HTMLElement|null}
     */
    function getParent( element, selector ) {
        if ( !element.parentElement ) {
            return null;
        }

        return element.parentElement.matches( selector ) ? element.parentElement :
            getParent( element.parentElement, selector );
    }

    /**
     * Get all parent elements matching the given selector
     *
     * @param {HTMLElement} element
     * @param {String} selector
     * @return {HTMLElement[]}
     */
    function getParents( element, selector ) {
        var result = [],
            parent = getParent( element, selector );

        while ( parent !== null ) {
            result.push( parent );
            parent = getParent( parent, selector );
        }

        return result;
    }

    var doc = w.document,
        docEl = doc.documentElement;

    // Replace no-js class with js class
    // docEl.className = docEl.className.replace( /no-js/gi, '' );
    // docEl.className += ' js';
    // TODO: why ?

    // Cut the mustard
    if ( 'querySelector' in doc && Array.prototype.forEach ) {

        // TODO: check if class is already on. reduced view gets it twice
        // -jLaz
        // docEl.className += ' sg-enhanced';
        // TODO: ? -ask why

        // Syntactic sugar for querySelectorAll and event delegates courtesy
        // @paul_irish: https://gist.github.com/paulirish/12fb951a8b893a454b32
        var queryAll = document.querySelectorAll.bind( document );

        // Single toggles for documentation and source code
        // -jLaz

        SGB.toggleSingleDocBtn = function() {
            var button = this;

            SGB._toggleClass( button, 'sg-btn-active' );

        };

        Array.prototype.forEach.call( queryAll( '.js-sg-btn-documentation' ), function( el ) {
            el.addEventListener( 'click', SGB.toggleSingleDocBtn );
        } );

        SGB.toggleSingleSourceBtn = function() {
            var button = this;

            SGB._toggleClass( button, 'sg-btn-active' );
        };

        Array.prototype.forEach.call( queryAll( '.js-sg-btn-source' ), function( el ) {
            el.addEventListener( 'click', SGB.toggleSingleSourceBtn );
        } );

        // toggle active class when we click the documentation or source buttons
        SGB.DocumentationToggleBtn = function() {
            var thisContainer = SGB._getClosest( this, '.js-sg-section' )
                .querySelector( '.js-sg-documentation-container' );
            SGB._toggleClass( thisContainer, 'sg-active' );
        };

        SGB.SourceToggleBtn = function() {
            var thisContainer = this.closest( '.js-sg-section' ).querySelector( '.js-sg-source-container' );
            SGB._toggleClass( thisContainer, 'sg-active' );
        };

        Array.prototype.forEach.call( queryAll( '.js-sg-btn-documentation' ), function( el ) {
            el.addEventListener( 'click', SGB.DocumentationToggleBtn );
        } );

        Array.prototype.forEach.call( queryAll( '.js-sg-btn-source' ), function( el ) {
            el.addEventListener( 'click', SGB.SourceToggleBtn );
        } );

        /*!
         * @copyright Copyright (c) 2017 IcoMoon.io
         * @license   Licensed under MIT license
         *            See https://github.com/Keyamoon/svgxuse
         * @version   1.2.2
         */
        /*jslint browser: true */
        /*global XDomainRequest, MutationObserver, window */
        ( function() {
            'use strict';
            if ( window && window.addEventListener ) {
                var cache = Object.create( null ); // holds xhr objects to prevent multiple requests
                var checkUseElems;
                var tid; // timeout id
                var debouncedCheck = function() {
                    clearTimeout( tid );
                    tid = setTimeout( checkUseElems, 100 );
                };
                var unobserveChanges = function() {
                    return;
                };
                var observeChanges = function() {
                    var observer;
                    window.addEventListener( 'resize', debouncedCheck, false );
                    window.addEventListener( 'orientationchange', debouncedCheck, false );
                    if ( window.MutationObserver ) {
                        observer = new MutationObserver( debouncedCheck );
                        observer.observe( document.documentElement, {
                            childList: true,
                            subtree: true,
                            attributes: true
                        } );
                        unobserveChanges = function() {
                            try {
                                observer.disconnect();
                                window.removeEventListener( 'resize', debouncedCheck, false );
                                window.removeEventListener( 'orientationchange', debouncedCheck, false );
                            } catch ( ignore ) {/* eslint-disable */}
                            /* eslint-enable */
                        };
                    } else {
                        document.documentElement.addEventListener( 'DOMSubtreeModified', debouncedCheck, false );
                        unobserveChanges = function() {
                            document.documentElement.removeEventListener( 'DOMSubtreeModified', debouncedCheck, false );
                            window.removeEventListener( 'resize', debouncedCheck, false );
                            window.removeEventListener( 'orientationchange', debouncedCheck, false );
                        };
                    }
                };
                var createRequest = function( url ) {
                    // In IE 9, cross origin requests can only be sent using XDomainRequest.
                    // XDomainRequest would fail if CORS headers are not set.
                    // Therefore, XDomainRequest should only be used with cross origin requests.
                    function getOrigin( loc ) {
                        var a;
                        if ( loc.protocol !== undefined ) {
                            a = loc;
                        } else {
                            a = document.createElement( 'a' );
                            a.href = loc;
                        }
                        return a.protocol.replace( /:/g, '' ) + a.host;
                    }
                    var Request;
                    var origin;
                    var origin2;
                    if ( window.XMLHttpRequest ) {
                        Request = new XMLHttpRequest();
                        origin = getOrigin( location );
                        origin2 = getOrigin( url );
                        if ( Request.withCredentials === undefined && origin2 !== '' && origin2 !== origin ) {
                            Request = XDomainRequest || undefined;
                        } else {
                            Request = XMLHttpRequest;
                        }
                    }
                    return Request;
                };
                var xlinkNS = 'http://www.w3.org/1999/xlink';

                /* eslint-disable max-statements */
                /* eslint-disable complexity */
                checkUseElems = function() {
                    var base;
                    var bcr;
                    var fallback = '';
                    var hash;
                    var href;
                    var i;
                    var inProgressCount = 0;
                    var isHidden;
                    var isXlink = false;
                    var Request;
                    var url;
                    var uses;
                    var xhr;
                    function observeIfDone() {
                        // If done with making changes, start watching for chagnes in DOM again
                        inProgressCount -= 1;
                        if ( inProgressCount === 0 ) { // if all xhrs were resolved
                            unobserveChanges(); // make sure to remove old handlers
                            observeChanges(); // watch for changes to DOM
                        }
                    }
                    function attrUpdateFunc( spec ) {
                        return function() {
                            if ( cache[ spec.base ] !== true ) {
                                if ( spec.isXlink ) {
                                    spec.useEl.setAttributeNS( xlinkNS, 'xlink:href', '#' + spec.hash );
                                } else {
                                    spec.useEl.setAttribute( 'href', '#' + spec.hash );
                                }
                            }
                        };
                    }
                    function onloadFunc( xhr ) {
                        return function() {
                            var body = document.body;
                            var x = document.createElement( 'x' );
                            var svg;
                            xhr.onload = null;
                            x.innerHTML = xhr.responseText;
                            svg = x.getElementsByTagName( 'svg' )[ 0 ];
                            if ( svg ) {
                                svg.setAttribute( 'aria-hidden', 'true' );
                                svg.style.position = 'absolute';
                                svg.style.width = 0;
                                svg.style.height = 0;
                                svg.style.overflow = 'hidden';
                                body.insertBefore( svg, body.firstChild );
                            }
                            observeIfDone();
                        };
                    }
                    function onErrorTimeout( xhr ) {
                        return function() {
                            xhr.onerror = null;
                            xhr.ontimeout = null;
                            observeIfDone();
                        };
                    }
                    unobserveChanges(); // stop watching for changes to DOM
                    // find all use elements
                    uses = document.getElementsByTagName( 'use' );
                    for ( i = 0; i < uses.length; i += 1 ) {
                        try {
                            bcr = uses[ i ].getBoundingClientRect();
                        } catch ( ignore ) {
                            // failed to get bounding rectangle of the use element
                            bcr = false;
                        }
                        href = uses[ i ].getAttribute( 'href' );
                        if ( !href ) {
                            href = uses[ i ].getAttributeNS( xlinkNS, 'href' );
                            isXlink = true;
                        } else {
                            isXlink = false;
                        }
                        if ( href && href.split ) {
                            url = href.split( '#' );
                        } else {
                            url = [ '', '' ];
                        }
                        base = url[ 0 ];
                        hash = url[ 1 ];
                        isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
                        if ( bcr && bcr.width === 0 && bcr.height === 0 && !isHidden ) {
                            // the use element is empty
                            // if there is a reference to an external SVG, try to fetch it
                            // use the optional fallback URL if there is no reference to an external SVG
                            if ( fallback && !base.length && hash && !document.getElementById( hash ) ) {
                                base = fallback;
                            }
                            if ( base.length ) {
                                // schedule updating xlink:href
                                xhr = cache[ base ];
                                if ( xhr !== true ) {
                                    // true signifies that prepending the SVG was not required
                                    setTimeout( attrUpdateFunc( {
                                        useEl: uses[ i ],
                                        base: base,
                                        hash: hash,
                                        isXlink: isXlink
                                    } ), 0 );
                                }
                                if ( xhr === undefined ) {
                                    Request = createRequest( base );
                                    if ( Request !== undefined ) {
                                        xhr = new Request();
                                        cache[ base ] = xhr;
                                        xhr.onload = onloadFunc( xhr );
                                        xhr.onerror = onErrorTimeout( xhr );
                                        xhr.ontimeout = onErrorTimeout( xhr );
                                        xhr.open( 'GET', base );
                                        xhr.send();
                                        inProgressCount += 1;
                                    }
                                }
                            }
                        } else {
                            if ( !isHidden ) {
                                if ( cache[ base ] === undefined ) {
                                    // remember this URL if the use element was not empty and no request was sent
                                    cache[ base ] = true;
                                } else if ( cache[ base ].onload ) {
                                    // if it turns out that prepending the SVG is not necessary,
                                    // abort the in-progress xhr.
                                    cache[ base ].abort();
                                    delete cache[ base ].onload;
                                    cache[ base ] = true;
                                }
                            } else if ( base.length && cache[ base ] ) {
                                setTimeout( attrUpdateFunc( {
                                    useEl: uses[ i ],
                                    base: base,
                                    hash: hash,
                                    isXlink: isXlink
                                } ), 0 );
                            }
                        }
                    }
                    uses = '';
                    inProgressCount += 1;
                    observeIfDone();
                };
                /* eslint-enable */

                // The load event fires when all resources have finished loading,
                // which allows detecting whether SVG use elements are empty.
                window.addEventListener( 'load', function winLoad() {
                    window.removeEventListener( 'load', winLoad, false ); // to prevent memory leaks
                    tid = setTimeout( checkUseElems, 0 );
                }, false );

            }
        }() );

    }

    var colorClasses = [ 'bgcolor-1', 'bgcolor-2', 'bgcolor-3' ];

    Array.prototype.forEach.call( document.querySelectorAll( '.js-sg-btn-bgcolor' ), function( el ) {
        var clickCounter = 0,
            parents = getParents( el, '.js-sg-section' );

        el.addEventListener( 'click', function( event ) {
            event.preventDefault();

            Array.prototype.forEach.call( parents, function( el ) {
                el.classList.remove( colorClasses[ clickCounter ] );
                el.classList.add( colorClasses[ ( clickCounter + 1 ) % colorClasses.length ] );
            } );

            clickCounter = ( clickCounter + 1 ) % colorClasses.length;
        } );
    } );

}( this, SGB ) );

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
        heightCalculationMethod: 'max',
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


var SGB = window.SGB || {};
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
                SGB.stickyInfo = Array.prototype.map.call( stickies, function( el ) {

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
                SGB.stickyInfo.forEach( function( info, i ) {
                    var nextSticky = SGB.stickyInfo[ i + 1 ];
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
        // stickyHeaders.load( document.querySelectorAll( '.js-sg-section-header' ) );


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

var SGB = window.SGB || {};

( function( w, SGB, undefined ) {
    /* jshint ignore:end */

    /*
     ** Bulk toggle options for documentation and source code
     ** -jLaz & troth
     */

    var toggleAllDocBtn = document.querySelector( '#sg-toggle-all-doc' ),
        allDocBtns = document.querySelectorAll( '.js-sg-btn-documentation' ),
        allDocContainer = document.querySelectorAll( '.sg-documentation-container' );

    toggleAllDocBtn.addEventListener( 'click', function() {
        if ( toggleAllDocBtn.checked ) {
            Array.prototype.forEach.call( allDocBtns, function( button ) {
                button.classList.add( 'sg-btn-active' );
            } );

            Array.prototype.forEach.call( allDocContainer, function( container ) {
                container.classList.add( 'sg-active' );
            } );

            SGB._recalculateStickies();
        } else {
            Array.prototype.forEach.call( allDocBtns, function( button ) {
                button.classList.remove( 'sg-btn-active' );
            } );

            Array.prototype.forEach.call( allDocContainer, function( container ) {
                container.classList.remove(  'sg-active' );
            } );

            SGB._recalculateStickies();
        }
    } );

    var toggleAllSourceBtn = document.querySelector( '#sg-toggle-all-source' ),
        allSourceBtns = document.querySelectorAll( '.sg-btn-source' ),
        allSourceContainer = document.querySelectorAll( '.sg-source-container' );

    toggleAllSourceBtn.addEventListener( 'click', function() {
        if ( toggleAllSourceBtn.checked ) {
            Array.prototype.forEach.call( allSourceBtns, function( button ) {
                button.classList.add( 'sg-btn-active' );
            } );

            Array.prototype.forEach.call( allSourceContainer, function( container ) {
                container.classList.add( 'sg-active' );
            } );

            SGB._recalculateStickies();
        } else {
            Array.prototype.forEach.call( allSourceBtns, function( button ) {
                button.classList.remove( 'sg-btn-active' );
            } );

            Array.prototype.forEach.call( allSourceContainer, function( container ) {
                container.classList.remove( 'sg-active' );
            } );

            SGB._recalculateStickies();
        }
    } );

}( this, SGB ) );
