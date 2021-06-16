import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = document.createElement('div');
    this.elem.className = "ribbon";

    this._fillCategories();
  }

  _updateButtons() {
    let scrollLeft = this._inner.scrollLeft;

    if( scrollLeft > 0 ) {
      if( !this._btnBack.classList.contains( "ribbon__arrow_visible" ) ){
        this._btnBack.classList.add( "ribbon__arrow_visible" )
      }
    } else {
      this._btnBack.classList.remove( "ribbon__arrow_visible" )
    }

    let scrollWidth = this._inner.scrollWidth;
    let clientWidth = this._inner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;    

    if( scrollRight > 1 ) {
      if( !this._btnForward.classList.contains( "ribbon__arrow_visible" ) ){
        this._btnForward.classList.add( "ribbon__arrow_visible" )
      }
    } else {
      this._btnForward.classList.remove( "ribbon__arrow_visible" )
    }
  }

  _makeCategory( category ) {
    let categoryElem = document.createElement('a');
    categoryElem.className = "ribbon__item";
    categoryElem.dataset.id = category.id;
    categoryElem.textContent = category.name;
    categoryElem.href = "#";

    return categoryElem;
  }  

  _fillCategories() {
    this._btnBack = document.createElement('button');
    this._btnBack.className = "ribbon__arrow ribbon__arrow_left";
    this._btnBack.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    this._btnBack.addEventListener( 'click', () => { 
      this._inner.scrollBy( -350, 0 ); 
    } );

    this._inner = document.createElement('nav');
    this._inner.className = "ribbon__inner";
    this._inner.addEventListener( 'scroll', () => { this._updateButtons(); } );

    for( let item of this.categories ) {
      this._inner.appendChild( this._makeCategory( item ) );
    }

    this.elem.appendChild( this._inner );

    this.elem.appendChild( this._btnBack );
    this._btnForward = document.createElement('button');
    this._btnForward.className = "ribbon__arrow ribbon__arrow_right ribbon__arrow_visible";
    this._btnForward.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    this._btnForward.addEventListener( 'click', () => { 
      this._inner.scrollBy( 350, 0 ); 
    } );

    this.elem.appendChild( this._btnForward );

    this._inner.addEventListener( 'click', ( event )=>{ this._onClick( event ); } );
  }

  _onClick( event ){
    if( event.target.className != "ribbon__item" ) {
      return;
    }

    event.preventDefault();

    this.elem.dispatchEvent( new CustomEvent("ribbon-select", { detail: event.target.dataset.id, bubbles: true } ) );
  }
}
