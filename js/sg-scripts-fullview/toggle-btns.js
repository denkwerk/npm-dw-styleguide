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
                SGB._addClass( button, 'sg-btn-active' );
            } );

            Array.prototype.forEach.call( allDocContainer, function( container ) {
                SGB._addClass( container, 'sg-active' );
            } );

            SGB._recalculateStickies();
        } else {
            Array.prototype.forEach.call( allDocBtns, function( button ) {
                SGB._removeClass( button, 'sg-btn-active' );
            } );

            Array.prototype.forEach.call( allDocContainer, function( container ) {
                SGB._removeClass( container, 'sg-active' );
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
