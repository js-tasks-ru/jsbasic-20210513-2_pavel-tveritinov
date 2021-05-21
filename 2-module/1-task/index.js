function sumSalary(salaries) {
  if( typeof salaries !== "object" )
    return null;

  let sumSalaries = 0;

  for( let key in salaries ) {
    
    let item = salaries[ key ];

    if( ( typeof item !== "number" ) || !isFinite( item ) || ( item < 0 ) )
      continue;

    sumSalaries += item;
  }

  return sumSalaries;
}
