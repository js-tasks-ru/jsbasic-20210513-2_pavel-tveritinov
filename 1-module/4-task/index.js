function checkSpam(str) {
  if( typeof str !== "string" ) 
    return false;

  let lowCase = str.toLowerCase();

  return ( lowCase.includes( '1xbet' ) || lowCase.includes( 'xxx' ) );
}
