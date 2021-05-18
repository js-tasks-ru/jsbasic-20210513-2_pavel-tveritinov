function factorial(n) {

  if( typeof n !== "number" )
    return NaN;

  if( n < 0 )
    return null;

  if( ( n === 0 ) || ( n === 1 ) )
    return 1;

  let retVal = n;

  for( let i = ( n - 1); i > 0; --i )
    retVal *= i;

  return retVal;
}
