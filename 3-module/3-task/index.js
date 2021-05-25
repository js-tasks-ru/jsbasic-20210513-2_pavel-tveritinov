function camelize(str) {
  if( typeof str !== "string" )
    return null;

  if( str === '' )
    return '';

  let words = str.split( '-' );

  if( words.length > 1 ) {
    for( let i = 1; i < words.length; ++i ) 
      words[ i ] = words[ i ].charAt( 0 ).toUpperCase() + words[ i ].slice( 1 );
  }

  return words.join( '' );
}
