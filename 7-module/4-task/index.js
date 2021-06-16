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
      `<div class="slider__thumb" style="position: absolute;">
        <span class="slider__value">0</span>
       </div>
       <div class="slider__progress"></div>
       <div class="slider__steps">${spans}</div>`;

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    this.fnPointerDown = (event) => {
      event.preventDefault();
      this.elem.classList.add( 'slider_dragging' );
      let shiftX = this.elem.getBoundingClientRect().left;

      this._lastPos = this._updatePosition( event.clientX - shiftX, true );
      
      this.fnPointerMove = (eventMove)=>{ 
        eventMove.preventDefault();
        this._lastPos = this._updatePosition( eventMove.clientX - shiftX, true ); 
      };
    
      document.addEventListener( 'pointermove', this.fnPointerMove );

      this.fnPointerUp = (eventUp)=>{ 
        document.removeEventListener( 'pointermove', this.fnPointerMove );
        document.removeEventListener( 'pointerup', this.fnPointerUp );
        this.fnPointerMove = null;
        this.fnPointerUp = null;
        this.elem.classList.remove( 'slider_dragging' );
        this._setValue( this._lastPos );
        this._updateSelection( this.value );
        this._lastPos = undefined; 
      };

      document.addEventListener( 'pointerup', this.fnPointerUp );
    };

    thumb.addEventListener( 'pointerdown', this.fnPointerDown );

    this.elem.addEventListener( 'click', (event) => {
      this._setValue( this._updatePosition( event.clientX - this.elem.getBoundingClientRect().left ) );
    });

    this._updateSelection( this.value );
  }

  _setValue( value ) {
    if( this.value !== value ) {
      this.value = value;
      this.elem.dispatchEvent( new CustomEvent( 'slider-change', { detail: this.value, bubbles: true } ) );
    }
  }

  _updateSelectionSteps( value ) {
    let sliderSteps = this.elem.querySelector( '.slider__steps' ).childNodes;

    sliderSteps.forEach( element => {
      element.classList.remove( 'slider__step-active' ) 
    } );

    sliderSteps[ this.value ].classList.add( 'slider__step-active' );
    this.elem.querySelector( '.slider__value' ).textContent = value;
  }

  _updateSelectionPercents( percents ) {
    this.elem.querySelector('.slider__thumb').style.left = `${percents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${percents}%`;    
  }

  _updateSelection( value ) {
    this._updateSelectionSteps( value );
    this._updateSelectionPercents( value / ( this.steps - 1 ) * 100 );
  }

  _updatePosition( left, smooth = false ) {
    //console.log( 'Left: ' + left );
    let leftRelative = left / this.elem.offsetWidth;

    if( leftRelative < 0 ) {
      leftRelative = 0;
    } else if( leftRelative > 1 ) {
      leftRelative = 1;
    }

    let approximateValue = leftRelative * (this.steps - 1);
    let value = Math.round(approximateValue);
    
    this._updateSelectionPercents( smooth? ( leftRelative * 100 ) : ( value / ( this.steps - 1 ) * 100 ) );
    this._updateSelectionSteps( value );
    return value;
  }
}
