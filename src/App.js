import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

const CardColumn = (props) => (
  <div onClick={() => props.onClick(props.column)}>
    { props.cards.map((card, idx) =>
      <img style={{
        position: 'absolute', 
        width: '100px', 
        float: 'left',
        left: (props.column -1) * 120,
        top: 140 + idx * 80
      }} src={`/cards/card${card}.png`} width="80px"/>
    )
  }
  </div>
);

const CardBoard = (props) => {
  const [count, setCount] = useState(0);
  let cards = [...Array(21).keys()].map(number => number + 1);
  const [selectedCard, setSelectedCard] = useState('');
  const instructions = [
    'Bem vindo ao Cartas Mágicas. Pense em uma carta do baralho e selecione a coluna que ela está.', 
    'Muito bem! Agora selecione a coluna onde está a carta em que você pensou.', 
    'Qual a coluna está a carta?',
    'A carta que você pensou foi: '
  ];

  const [instruction, setInstruction] = useState(instructions[0]);

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
    setInstruction(instructions[count + 1]);
  }

  return(
    <div>
      <div>
        <div><button onClick={resetButtonHandler}>Reiniciar</button></div>
        <div style={{float: 'left', width: '250px', padding: '10px'}}><br/>{instruction}</div>
        <div><img style={{width: '70px', display: (selectedCard === '' ? 'none' : 'block')}} src={`/cards/card${selectedCard}.png`} /></div>
      </div>
      
      
      <div>
        <CardColumn key={1} column={1} onClick={chooseColumn} cards={cards1}/>
        <CardColumn key={2} column={2} onClick={chooseColumn} cards={cards2}/>
        <CardColumn key={3} column={3} onClick={chooseColumn} cards={cards3}/>
        
      </div>

    </div>
  );
};


function App() {
  return <CardBoard />
}

export default App;
