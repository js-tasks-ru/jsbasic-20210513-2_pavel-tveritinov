/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  _deleteCol = "delete";

  constructor(rows) {
    this.elem = document.createElement('table');
    this._columns = this._fillHeader( this.elem.createTHead(), rows );
    this._fillRows( this.elem.createTBody(), rows );
  }

  _fillHeader( headerElem, rows ) {
    let names = new Array();

    for( let name in rows[ 0 ] ) {
      names.push( name );
    }

    names.push( this._deleteCol ); // Close button
    let header = '<tr>' + names.map( value => `<th>${value}</th>` ).join( '' ) + '</tr>';
    headerElem.innerHTML = header;
    return names;
  }

  _doDelete( event ) {
    if( event.target.closest( 'button' ) ){
      let rowClicked = event.target.closest( 'tr' );
      if( rowClicked ) {
        this.elem.deleteRow( rowClicked.rowIndex );
      }
    }
  }

  _fillRows(bodyElem, rows) {

    for( let user of rows ) {
      var userRow = bodyElem.insertRow();

      for( let item of this._columns ) {
        let nextCel = userRow.insertCell();
        if( item === this._deleteCol ) {
          var delButton = document.createElement('button');
          delButton.textContent=`[X]`;
          nextCel.appendChild(delButton);
        } else {
          nextCel.textContent = user[ item ];
        }
      }
    }

    bodyElem.addEventListener( 'click', (event) => { this._doDelete(event); } );
  }
}
