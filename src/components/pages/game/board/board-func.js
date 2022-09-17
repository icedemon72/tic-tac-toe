// Function for splittin the 'arr' into chunks of size 'size'
export const chunk = (arr, size, out = []) => {
  if (!arr.length) return out;
  out.push(arr.slice(0, size));
  return chunk(arr.slice(size), size, out);
}

// Function that returns the object with 2 keys: overStatus (is the game over) and winningMoves (what kind of move had won the game)
export const checkForWin = (board, over = false) => {
  let rDiagonal = true, lDiagonal = true, winningObj = {
    overStatus: over,
    winningMoves: []
  };

  for(let i = 0; i < 3 /* :) */ && !winningObj.overStatus; i++) {
    let horizontal = true, vertical = true;
    
    for(let j = 0; j < 3; j++) {
      if(board[i][0] !== board[i][j] || board[i][j] === '') { // Horizontal check
        horizontal = false;
      }

      if(board[0][i] !== board[j][i] || board[j][i] === '') { // Vertical check
        vertical = false;
      }
      
    }

    if(horizontal) {
      winningObj.winningMoves.push({type: 'horizontal', index: i});
    }
    if(vertical) {
      winningObj.winningMoves.push({type: 'vertical', index: i});
    }
    winningObj.overStatus = horizontal || vertical;
  }

  for(let i = 0; i < 3; i++) {
    if(board[0][0] !== board[i][i] || board[i][i] === '') {
      lDiagonal = false;
    }

    if(board[0][2] !== board[i][2 - i] || board[i][2 - i] === '') {
      rDiagonal = false;
    }
  }

  if(lDiagonal) {
    winningObj.winningMoves.push({type: 'lDiagonal', index: null});
  }

  if(rDiagonal) {
    winningObj.winningMoves.push({type: 'rDiagonal', index: null});
  }

  winningObj.overStatus = winningObj.overStatus || lDiagonal || rDiagonal;

  return winningObj;
}

// Adds the 'win' class to those X's or O's that have won the game
export const determineTheTypeOfWin = (dataObj, body, style) => {
  dataObj.winningMoves.forEach(win => {
    switch(win.type) {
      case 'rDiagonal':
        body.current.childNodes.forEach((elem, ind) => {
          elem.children[2 - ind].classList += ` ${style.win}`;
        });
        break;

      case 'lDiagonal':
        body.current.childNodes.forEach((elem, ind) => {
          elem.children[ind].classList += ` ${style.win}`;
        });
        break;

      case 'vertical':
        body.current.childNodes.forEach(elem => {
          elem.children[win.index].classList += ` ${style.win}`;
        });
        break;

      default:
        body.current.children[win.index].childNodes.forEach(elem => {
          elem.classList += ` ${style.win}`;
        });
    }
  });
}