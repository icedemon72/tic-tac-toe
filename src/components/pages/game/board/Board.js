import React, { useState, useRef } from 'react';
import { checkForWin, determineTheTypeOfWin, chunk } from './board-func';

// Module CSS
import style from './Board.module.css';

// Bootstrap
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PopupButton from './PopupButton';

export const Board = () => {
  const [board, setBoard] = useState(new Array(9).fill(''));
  const [round, setRound] = useState(0);
  const [turn, changeTurn] = useState('X');
  const [isOver, setIsOver] = useState(false);

  const body = useRef();

  const addElement = (ind) => {
    if(board[ind] !== '' || isOver) {
      return;
    }
    
    board[ind] = turn;
    changeTurn(prevTurn => prevTurn === 'X' ? 'O' : 'X');
    setBoard(prevBoard => prevBoard = board);
    setRound(prevRound => prevRound + 1);
  
    body.current.children[parseInt(ind / 3)].children[ind % 3].classList += ` ${style[turn.toLowerCase()]}`;

    if(round < 4) {
      return;
    }

    checkIfOver();
  }

  const checkIfOver = () => {    
    const updatedBoardArr = chunk(board, 3);
    const checkForWinObject = checkForWin(updatedBoardArr, isOver);

    if(!checkForWinObject.overStatus) {
      if(round === 8) {
        setIsOver(true);
        console.log('draw!');
      }
      return;
    }

    setIsOver(true);
    determineTheTypeOfWin(checkForWinObject, body, style);
    console.log(`${turn} WINS!`);

  }

  const setPlaceholder = (index, remove = false) => {
    if(board[index] !== '' || isOver) {
      return;
    }
    body.current.children[parseInt(index / 3)].children[index % 3].innerHTML = (remove) ? '' : turn;
  }
  

  return (
    <>
      <Container fluid='sm' className={style.container_wrap}>
        <Row className={style.table_container}>
          <Col>
            <Table>
              <tbody ref={body} className={style.table_body}>
                <tr className={style.tr_1}>
                  {['', '', ''].map((elem, ind) => <td onMouseOver={() => setPlaceholder(ind)} onMouseLeave={() => setPlaceholder(ind, true)} onClick={() => addElement(ind)} key={ind}>{board[ind]}</td>)}
                </tr>
                <tr className={style.tr_2}>
                  {['', '', ''].map((elem, ind) => <td onMouseOver={() => setPlaceholder(ind + 3)} onMouseLeave={() => setPlaceholder(ind + 3, true)} onClick={() => addElement(ind + 3)} key={ind + 3}>{board[ind + 3]}</td>)}
                </tr>
                <tr className={style.tr_3}>
                  {['', '', ''].map((elem, ind) => <td onMouseOver={() => setPlaceholder(ind + 6)} onMouseLeave={() => setPlaceholder(ind + 6, true)}onClick={() => addElement(ind + 6)} key={ind + 6}>{board[ind + 6]}</td>)}
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          {isOver && <PopupButton />}
        </Row>
      </Container>
    </>
  )
}

export default Board;


