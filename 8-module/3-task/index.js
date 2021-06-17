export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let cartItem = this.cartItems.find( (item) => { return ( product.id === item.product.id ); });

    if( cartItem ) {
      ++cartItem.count;
    } else {
      cartItem = { product: product, count: 1 };
      this.cartItems.push( cartItem );
    }

    this.onProductUpdate( cartItem );
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find( (item) => { return ( productId === item.product.id ); });

    if( !cartItem ) {
      return;
    } 

    cartItem.count += amount;

    if( cartItem.count < 1 ) {
      this.cartItems.splice( this.cartItems.indexOf(cartItem), 1);
    }

    this.onProductUpdate( cartItem );
  }

  isEmpty() {
    return ( this.cartItems.length === 0 );
  }

  getTotalCount() {
    let val = 0;
    this.cartItems.forEach( (item) => { val += item.count; });
    return val;
  }

  getTotalPrice() {
    let val = 0;
    this.cartItems.forEach( (item) => { val += ( item.count * item.product.price ); });
    return val;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

