function namify(users) {
  if( !Array.isArray( users ) )
    return null;

  return users.map( (user)=>{ return user.name; });
}
