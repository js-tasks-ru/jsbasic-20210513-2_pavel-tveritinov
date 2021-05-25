function filterRange(arr, a, b) {
  if( !Array.isArray( arr ) )
    return null;

  if( a > b )
    b = [a, a = b][0];

  return arr.filter( (val)=>{ return ( ( val >= a ) && ( val <= b ) ); });
}
