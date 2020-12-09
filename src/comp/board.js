import React, {useState} from 'react';

let lines=[
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

const Board = () => {
    const [squares, setsQuare]=useState(Array(9).fill(null))
    const [history, setHistory]=useState([])
    let win
    const generateValue=(idx)=>{
        if(winner || squares[idx] !== null) return
        const copySquares=[...squares]
        copySquares[idx]=nextPlayer(squares)
        setsQuare(copySquares)
        setHistory([...history ,`Сделал ход ${nextPlayer(squares)} по ячейке ${idx+1} `])

    }
    const reset=()=>{
        setsQuare(Array(9).fill(null))
    }
    const nextPlayer=(square)=>{
        const countX=square.filter(el=>el==='x').length
        const countY=square.filter(el=>el==='o').length
        return countX<=countY?'x':'o'

    }

    const detectWinner=(square)=>{
        for(let i=0 ; i<lines.length; i++){
            const[a,b,c]=lines[i]
            if(square[a]&&square[a]===square[b]&&square[a]===square[c]){
                win=lines[i]
                return square[a]
            }
        } return null
    }
    let winner= detectWinner(squares)

    const finalREsult=()=>{
        return winner ? `Win ${winner}`:squares.includes(null) ? ' Next step' : `Draw`
    }
    return (
        <div className="board container">
            <div className="board-box">
                {
                    squares.map((el, idx)=>(
                        <button onClick={()=>generateValue(idx)} className={winner &&(win.includes(idx) ? 'green' : 'red')}> {squares[idx]}</button>

                    ))
                }

            </div>
            <div className="d-flex justify-content-center w-100 mt-3" >
                <button className="btn w-20" onClick={reset} type="button">Reset</button>
            </div>
            <div className='text-center'>
                {finalREsult()}

                <ul>
                  {
                   history.map(el=><li>{el}</li>)
                  }
              </ul>

            </div>

        </div>
    );
};

export default Board;
