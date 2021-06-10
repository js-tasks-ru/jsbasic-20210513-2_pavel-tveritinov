import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.realPrice = this.product.price.toFixed( 2 );
    this.elem = document.createElement('div');
    this._makeCardHTML();
  }

  _makeCardHTML() {

    let htmlText = `<div class="card">
                      <div class="card__top">
                          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
                          <span class="card__price">€${this.realPrice}</span>
                      </div>
                      <div class="card__body">
                          <div class="card__title">${this.product.name}</div>
                          <button type="button" class="card__button">
                              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                          </button>
                      </div>
                  </div>`;
    this.elem.innerHTML = htmlText;
    let btn = this.elem.querySelector( '.card__button' );
    btn.addEventListener( 'click', ()=> { this._onAdd(); });
  }

  _onAdd(){
    this.elem.dispatchEvent( new CustomEvent("product-add", { detail: this.product.id, bubbles: true } ) );
  }
}
