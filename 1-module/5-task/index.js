function truncate(str, maxlength) {
  if( ( typeof str !== "string" ) || ( maxlength < 1 ) )
    return null;

  if( str.length <= maxlength )
    return str;

  return str.substring( 0, maxlength - 1 ) + "…";
}
