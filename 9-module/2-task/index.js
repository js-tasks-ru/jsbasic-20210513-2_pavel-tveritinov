import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    
    let carouselHolder = document.querySelector( '[data-carousel-holder]' );
    this._carousel = new Carousel( slides );
    carouselHolder.appendChild( this._carousel.elem );

    let ribbonHolder = document.querySelector( '[data-ribbon-holder]' );
    this._ribbon = new RibbonMenu( categories );
    ribbonHolder.appendChild( this._ribbon.elem );

    let sliderHolder = document.querySelector( '[data-slider-holder]' );
    this._slider = new StepSlider( { steps: 5, value: 3 } );
    sliderHolder.appendChild( this._slider.elem );
    
    let cartIconHolder = document.querySelector( '[data-cart-icon-holder]' );
    this._cartIcon = new CartIcon();
    cartIconHolder.appendChild( this._cartIcon.elem );
    
    this._cart = new Cart( this._cartIcon );

    let json = await fetch( './products.json' );
    this._products = await json.json();

    let productsGridHolder = document.querySelector( '[data-products-grid-holder]' );
    this._productGrid = new ProductsGrid( this._products );
    productsGridHolder.innerHTML = ``;
    productsGridHolder.appendChild( this._productGrid.elem );

    this._productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this._slider.value,
      category: this._ribbon.value
    });

    document.body.addEventListener( 'product-add', (event) => { 
      let product = this._products.find( (item) => { return ( event.detail === item.id ); });
      this._cart.addProduct( product );
    });

    this._slider.elem.addEventListener( 'slider-change', (event) => { 
      this._productGrid.updateFilter( {  maxSpiciness: event.detail } );
    });

    this._ribbon.elem.addEventListener( 'ribbon-select', (event) => { 
      this._productGrid.updateFilter( { category: event.detail } );
    });

    document.getElementById( 'nuts-checkbox' ).addEventListener( 'change', (event) => { 
      this._productGrid.updateFilter( { noNuts: document.getElementById('nuts-checkbox').checked } );
    });

    document.getElementById( 'vegeterian-checkbox' ).addEventListener( 'change', (event) => { 
      this._productGrid.updateFilter( { vegeterianOnly: document.getElementById('vegeterian-checkbox').checked } );
    });
  }
}
