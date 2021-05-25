function showSalary(users, age) {
  if( !Array.isArray( users ) || ( age < 0 ) )
    return null;

  return users.filter( user => user.age <= age ).map( user => user.name + ', ' + user.balance ).join( '\n' );
}
