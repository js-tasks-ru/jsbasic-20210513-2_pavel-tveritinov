function hideSelf() {
  document.addEventListener( 'click', (event) => {
    if( event.target.className != 'hide-self-button') {
      return;
    }

    event.target.hidden = true;
  });
}
