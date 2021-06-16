export default class StepSlider {
  constructor( { steps, value = 0 }) {
    if( this.steps < 2 )
      throw Error( "No steps" );

    this.steps = steps;
    this.value = value;
    this._fillItems();
  }

  _fillItems() {
    this.elem = document.createElement('div');
    this.elem.className = "slider";

    let spans = '';

    for( let i = 0; i < this.steps; ++i ) {
      spans += '<span></span>';
    }

    this.elem.innerHTML = 
      `<div class="slider__thumb">
        <span class="slider__value">0</span>
       </div>
       <div class="slider__progress"></div>
       <div class="slider__steps">${spans}</div>`;

    this.elem.addEventListener( 'click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);

      if( this.value !== value ) {
        this.value = value;
        this._updateSelection();
        this.elem.dispatchEvent( new CustomEvent( 'slider-change', { detail: this.value, bubbles: true } ) );
      }
    });

    this._updateSelection();
  }

  _updateSelection() {
    let sliderSteps = this.elem.querySelector( '.slider__steps' ).childNodes;

    sliderSteps.forEach( element => {
      element.classList.remove( 'slider__step-active' ) 
    } );

    sliderSteps[ this.value ].classList.add( 'slider__step-active' );
    this.elem.querySelector( '.slider__value' ).textContent = this.value;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    
    let valuePercents = this.value / ( this.steps - 1 ) * 100;
    
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;    
  }
}
