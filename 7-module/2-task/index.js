import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.fnKeyDown = (event) => {
      if( event.code === 'Escape' ) {
        this.close();
      }
    };
  }

  _addBody() {
    if( this.myBody ) {
      let bodyPlace = this.elem.querySelector( ".modal__body" );

      if( bodyPlace ){
        bodyPlace.appendChild( this.myBody );
      }
    }
  }

  setBody(node) {
    let modalOpened = document.body.classList.contains( "is-modal-open" );

    if( this.myBody ) {
      this.myBody.remove();
      this.myBody = null;
    }

    this.myBody = node;

    if( modalOpened ){
      this._addBody();
    }
  }

  setTitle( title ) {
    this.title = title;

    if( document.body.classList.contains( "is-modal-open" ) ){
      let item = this.elem.querySelector( ".modal__title" );
      if( item ) {
        item.textContent = title;
      }
    }
  }

  open() {

    this.elem = document.createElement('div');
    this.elem.className = "modal";

    this.elem.innerHTML = `<div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">${this.title}</h3>
        </div>
        <div class="modal__body">
        </div>
      </div>`;

    document.body.classList.add( "is-modal-open" );
    document.body.append( this.elem );
    this._addBody();

    let closeBtn = this.elem.querySelector( ".modal__close" );

    if( closeBtn ){
      closeBtn.addEventListener( 'click', () => { this.close(); });
    }

    document.addEventListener( 'keydown', this.fnKeyDown );
  }

  close() {
    document.removeEventListener( 'keydown', this.fnKeyDown );
    document.body.classList.remove( "is-modal-open" );

    if( this.elem ) {
      this.elem.remove();
      this.elem = null;
    }
  }
}
