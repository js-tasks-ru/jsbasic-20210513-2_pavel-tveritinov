import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    if( !slides.length )
      throw "No slides";

    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.className = "carousel";
    this._currentSlide = 0;
    this._lastSlideIndex = ( this.slides.length - 1 );

    this._fillNavigation();
    this._fillSlides();
    this._updateButtons();
  }

  _fillNavigation() {
    this._btnForward = document.createElement('div');
    this._btnForward.className = "carousel__arrow carousel__arrow_right";
    this._btnForward.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    this._btnForward.addEventListener( 'click', () => { this._doMove( 1 ); } );
    this.elem.appendChild( this._btnForward );

    this._btnBack = document.createElement('div');
    this._btnBack.className = "carousel__arrow carousel__arrow_left";
    this._btnBack.innerHTML = `<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">`;
    this._btnBack.addEventListener( 'click', () => { this._doMove( -1 ); } );
    this.elem.appendChild( this._btnBack );
  }

  _updateButtons() {
    this._btnForward.style.display = ( this._currentSlide < this._lastSlideIndex )? '' : 'none';
    this._btnBack.style.display = ( this._currentSlide > 0 )? '' : 'none';
  }

  _doMove ( addSlides ) {

    let offsetWidth = this.elem.offsetWidth;

    const selectedSlide = this._currentSlide;

    this._currentSlide += addSlides;

    // check corners:
    if( this._currentSlide > this._lastSlideIndex ) {
      this._currentSlide = this._lastSlideIndex;
    } else if( this._currentSlide < 0 ) {
      this._currentSlide = 0;
    }

    if( this._currentSlide === selectedSlide ) {
      return; // do nothing
    }

    this._inner.style.transform = `translateX(-${offsetWidth*this._currentSlide}px)`;
    this._updateButtons();
  }

  _makeSlide( slide ) {
    let slideElem = document.createElement('div');
    slideElem.className = "carousel__slide";
    slideElem.dataset.id = slide.id;
    let realPrice = slide.price.toFixed( 2 );
    slideElem.innerHTML = 
    `<img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${realPrice}</span>
      <div class="carousel__title">${slide.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>`;
    return slideElem;
  }  

  _fillSlides() {
    this._inner = document.createElement('div');
    this._inner.className = "carousel__inner";

    for( let item of this.slides ) {
      this._inner.appendChild( this._makeSlide( item ) );
    }

    this.elem.appendChild( this._inner );
    this._inner.addEventListener( 'click', ( event )=>{ this._onAdd( event ); } );
  }

  _onAdd( event ){
    if( !event.target.closest( '.carousel__button' ) ){
      return;
    }

    let itemClicked = event.target.closest( '.carousel__slide' );

    if( itemClicked ) {
      this.elem.dispatchEvent( new CustomEvent("product-add", { detail: itemClicked.dataset.id, bubbles: true } ) );
    }
  }
}

