import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.cards = null;
    this._createGrid();
    this.updateFilter(null);
  }

  _createGrid() {
    this.elem = document.createElement( "div" );
    this.elem.className = "products-grid";
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`;
  }

  doFilter( filters, item ) {
    if( filters.noNuts && item.nuts ) {
      return false;
    }

    if( filters.vegeterianOnly && ( item.vegeterian !== true ) ) {
      return false;
    }

    if( isFinite( filters.maxSpiciness ) && ( item.spiciness > filters.maxSpiciness ) ){
      return false;
    }

    if( filters.category && ( item.category !== filters.category ) ){
      return false;
    }

    return true;
  }

  updateFilter(filters) {
    let inner = this.elem.querySelector( ".products-grid__inner" );

    if( filters ) {
      for( let filter in filters ) {
        this.filters[ filter ] = filters[ filter ];
      }
    }

    // Let's clear first:
    inner.innerHTML = '';
    this.cards = null;

    this.cards = new Array();

    for( let elem of this.products ) {
      if( this.doFilter( this.filters, elem ) ) {
        let card = new ProductCard( elem );
        inner.appendChild( card.elem );
        this.cards.push( card );
      }
    }
  }
}
