import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

const CardColumn = (props) => (
  <div onClick={() => props.onClick(props.column)} style={{width: '100px', float: 'left'}}>
    { props.cards.map(card =>
      <img src={`/cards/card${card}.png`} width="80px"/>
    )
  }
  <button onClick={() => props.onClick(props.column)}>Coluna {props.column}</button>
  </div>
);

const CardBoard = (props) => {
  const [count, setCount] = useState(0);
  let cards = [...Array(21).keys()].map(number => number + 1);
  const [selectedCard, setSelectedCard] = useState('');

  const ShuffleNumbers = (numbers) => {
    let result = {0: [], 1: [], 2: []};
    numbers.map((number, idx) => result[idx % 3].push(number));
    return result;
  };

  const [cards1, setCards1] = useState(ShuffleNumbers(cards)[0]);
  const [cards2, setCards2] = useState(ShuffleNumbers(cards)[1]);
  const [cards3, setCards3] = useState(ShuffleNumbers(cards)[2]);

  const resetButtonHandler = () => {
    setSelectedCard('');
    resetGame();
  }

  const resetGame = () => {
    setCount(0);
    setCards1(ShuffleNumbers(cards)[0]);
    setCards2(ShuffleNumbers(cards)[1]);
    setCards3(ShuffleNumbers(cards)[2]);
  }

  const chooseColumn = (column) => { 
    setCount(count + 1);
    if (column === 1) {
      cards = cards2.concat(cards1).concat(cards3);
    } else if(column === 2) {
      cards = cards1.concat(cards2).concat(cards3);
    } else {
      cards = cards1.concat(cards3).concat(cards2);    
    }
    
    if (count === 2) {
      setSelectedCard(cards[10]);
      resetGame();
    } else { 
      setCards1(ShuffleNumbers(cards)[0]);
      setCards2(ShuffleNumbers(cards)[1]);
      setCards3(ShuffleNumbers(cards)[2]);
    }
  }

  return(
    <div>
      <div style={{width: '300px', float: 'left'}}>
        <CardColumn key={1} column={1} onClick={chooseColumn} cards={cards1}/>
        <CardColumn key={2} column={2} onClick={chooseColumn} cards={cards2}/>
        <CardColumn key={3} column={3} onClick={chooseColumn} cards={cards3}/>
        <button onClick={resetButtonHandler}>Reiniciar</button>
      </div>
      <div><img style={{display: (selectedCard === '' ? 'none' : 'block')}} src={`/cards/card${selectedCard}.png`} /></div>
    </div>
  );
};


function App() {
  return <CardBoard />
}

export default App;
