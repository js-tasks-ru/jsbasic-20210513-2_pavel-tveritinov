function toggleText() {
  let btnHide = document.querySelector( '.toggle-text-button' );

  if( btnHide ) {
    btnHide.addEventListener( 'click', ()=>{
      let text = document.getElementById( 'text' );

      if( text ) {
        text.hidden = !text.hidden;
      }
    });
  }
}
