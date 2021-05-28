function makeDiagonalRed(table) {
  for( let r = 0; r < table.rows.length; ++ r) {
    if( table.rows[ r ].cells.length >= r ) {
      table.rows[ r ].cells[r].style.backgroundColor = "red";
    }
  }
}
