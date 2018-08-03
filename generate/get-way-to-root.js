'use strict';

// Get way upto root level - needed on ftp protocol
function getWayToRoot( level ) {
    var str = '';
    for ( var i = 0; i < level; i++ ) {
        str += '../';
    }
    return str;
}

module.exports = getWayToRoot;
