import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  }

  setBody(node) {
    this.myBody = node;
  }

  setTitle( title ) {
    this.title = title;
  }

  open() {

    this.elem = document.createElement('div');
    this.elem.className = "modal";

    this.elem.innerHtml = `<div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title"> ${this.title} </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>`;

    this._container = document.querySelector( ".container" );
    if( !this._container ) {
      throw "No container";
    }

    this._container.append( this.elem );

    document.body.classList.add( "is-modal-open" );

    if( this.myBody ) {
      let bodyPlace = this.elem.querySelector( ".modal__body" );

      if( bodyPlace ){
        bodyPlace.appendChild( this.myBody );
      }
    }

    let closeBtn = this.elem.querySelector( ".modal__close" );

    if( closeBtn ){
      closeBtn.addEventListener( 'click', () => { this.close(); });
    }
  }

  close() {
    document.body.classList.remove( "is-modal-open" );
    this._container.removeChild( this.elem );
    this.elem = null;
  }
}
