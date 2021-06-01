function initCarousel() {
  let carousel = document.querySelector( '.carousel__inner' );
  let btnForward = document.querySelector( '.carousel__arrow_right' );
  let btnBack = document.querySelector( '.carousel__arrow_left' );
  const slidesCount = 4;
  const lastSlideIndex = slidesCount - 1;
  let currentSlide = 0;
  let offsetWidth = carousel.offsetWidth;

  let updateButtons = () => {
    btnForward.style.display = ( currentSlide < lastSlideIndex )? '' : 'none';
    btnBack.style.display = ( currentSlide > 0 )? '' : 'none';
  };

  let doMove = ( addSlides ) => {
    const selectedSlide = currentSlide;

    currentSlide += addSlides;

    // check corners:
    if( currentSlide > lastSlideIndex ) {
      currentSlide = lastSlideIndex;
    } else if( currentSlide < 0 ) {
      currentSlide = 0;
    }

    if( currentSlide === selectedSlide )
      return; // do nothing

    carousel.style.transform = `translateX(-${offsetWidth*currentSlide}px)`;
    updateButtons();
  };

  btnForward.addEventListener( 'click', () => { doMove( 1 ); } );
  btnBack.addEventListener( 'click', () => { doMove( -1 ); } );

  updateButtons();
}

