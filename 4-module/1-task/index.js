function makeFriendsList(friends) {
  if( !Array.isArray( friends ) ) {
    return null;
  }

  let ulObj = document.createElement( 'ul' );

  friends.forEach( ( item ) => {
    let liObj = document.createElement( 'li' );
    liObj.textContent = item.firstName + ' ' + item.lastName;
    ulObj.appendChild( liObj );
  } );

  return ulObj;
}
