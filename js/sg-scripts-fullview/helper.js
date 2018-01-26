var SGB = window.SGB || {};

SGB.html = document.querySelector( 'html' );

// Syntactic sugar for querySelectorAll and event delegates courtesy
// @paul_irish: https://gist.github.com/paulirish/12fb951a8b893a454b32
SGB.queryAll = document.querySelectorAll.bind( document );

// Add functionality to toggle classes on elements
SGB._hasClass = function( el, cl ) {
    var regex = new RegExp( '(?:\\s|^)' + cl + '(?:\\s|$)' );
    return !!el.className.match( regex );
};

SGB._addClass = function( el, cl ) {
    el.className += ' ' + cl;
};

SGB._removeClass = function( el, cl ) {
    var regex = new RegExp( '(?:\\s|^)' + cl );
    el.className = el.className.replace( regex, '' );
};

SGB._toggleClass = function( el, cl ) {
    SGB._hasClass( el, cl ) ? SGB._removeClass( el, cl ) : SGB._addClass( el, cl );
};

/**
 * Get the closest element for the given selector
 *
 * @param {HTMLElement} element
 * @param {String} selector
 * @return {HTMLElement|null}
 * @private
 */
SGB._getClosest = function( element, selector ) {
    if ( !element ) {
        return null;
    }

    return element.matches( selector ) ? element :
        SGB. _getClosest( element.parentElement, selector );
};
