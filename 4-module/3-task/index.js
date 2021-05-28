function highlight(table) {

  const ageIndex = 1;
  const genderIndex = 2;
  const statusIndex = 3;

  let bodies = table.tBodies;

  if( bodies.length < 1 )
    return;

  let body = bodies[ 0 ];

  for( let r = 0; r < body.rows.length; ++ r) {

    if( body.rows[ r ].cells.length >= statusIndex ) {
      if( body.rows[ r ].cells[ statusIndex ].dataset.available === undefined ){
        body.rows[ r ].hidden = true;
      } else {
        let available = body.rows[ r ].cells[ statusIndex ].dataset.available;
        if( available === "true" ){
          body.rows[ r ].classList.remove( "unavailable" );
          body.rows[ r ].classList.add( "available" );
        } else {
          body.rows[ r ].classList.add( "unavailable" );
          body.rows[ r ].classList.remove( "available" );
        }
      }
    }

    if( body.rows[ r ].cells.length >= genderIndex ) {
      let gender = body.rows[ r ].cells[ genderIndex ].textContent;
      if( gender === "m" ) {
        body.rows[ r ].classList.add( "male" );
      } else if( gender === "f" ) {
        body.rows[ r ].classList.add( "female" );
      }
    }

    if( body.rows[ r ].cells.length >= ageIndex ) {
      let age = body.rows[ r ].cells[ ageIndex ].textContent;

      if( isFinite( age ) && ( Number( age ) < 18 ) ) {
        body.rows[ r ].style.setProperty( "text-decoration", "line-through" );
      }
    }
  }
}
