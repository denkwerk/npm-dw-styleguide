var SGB = window.SGB || {};

SGB.html = document.querySelector( 'html' );

// Syntactic sugar for querySelectorAll and event delegates courtesy
// @paul_irish: https://gist.github.com/paulirish/12fb951a8b893a454b32
SGB.queryAll = document.querySelectorAll.bind( document );


// Add functionality to toggle classes on elements
SGB._toggleClass = function( el, cl ) {
    el.classList.contains( cl ) ? el.classList.remove( cl ) : el.classList.add( cl );
};

/**
 * Get the closest element for the given selector
 *
 * @param {HTMLElement} element
 * @param {String} selector
 * @return {HTMLElement|null}
 * @private
 * @private
 */
SGB._getClosest = function( element, selector ) {
    if ( !element ) {
        return null;
    }

    return element.matches( selector ) ? element :
        SGB._getClosest( element.parentElement, selector );
};

//https://gist.github.com/Ledzz/570dbf27c523d7826814c299a86e91f6

SGB.transitionEndEventName = function transitionEndEventName() {
    var i,
        el = document.createElement( 'div' ),
        transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

    for ( i in transitions ) {
        if ( transitions.hasOwnProperty( i ) && el.style[ i ] !== undefined ) {
            return transitions[ i ];
        }
    }
};


SGB.siblings = function( el, filter ) {
    // var siblings = [].slice.call(element.parentElement.children);
    // siblings.splice(siblings.indexOf(element), 1);
    // return siblings;
    var siblings = [];
    var elOrg = el;
    el = el.parentNode.firstChild;
    do {
        if ( elOrg !== el && el instanceof HTMLElement && ( !filter || filter( el ) ) ) {
            siblings.push( el );
        }
        el = el = el.nextSibling;
    } while ( el );
    return siblings;
};

SGB.height = function( element ) {
    return parseInt( getComputedStyle( element ).height );
};
