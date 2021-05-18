function ucFirst(str) {
  if( typeof str !== "string" )
    return null;

  if( str ) 
    return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
  
  return '';
}
