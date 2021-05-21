let calculator = {
  // From my point of view, implementation have to be more complicated,
  // like check previos call to 'read' before 'mul' or 'some'
  // but it not required and don't checked by auto-tests

  read(a, b) {
    this.a = a;
    this.b = b;
  },

  sum() {
    return ( this.a + this.b );
  },

  mul(){
    return ( this.a * this.b );
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
