function getMinMax(str) {

//  if( typeof str !== "string" )
//    return null;

  let items = str.split( new RegExp( " |," ) );

  let result = {};
  
  items.forEach( ( item ) =>{
    if( !isFinite( item ) )
      return;
    
    let numItem = Number( item );
    
    if( ( result.min === undefined ) || ( numItem < result.min ) )
      result.min = numItem;
        
    if( ( result.max === undefined ) || ( numItem > result.max ) )
      result.max = numItem;
        
  } );

  return result;
}
