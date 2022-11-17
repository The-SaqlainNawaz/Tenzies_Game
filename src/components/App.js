import React from "react";
import Die from "./Die";
import "./style.css"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(Random_Num_array);
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        setTenzies(false)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    function Hold(id) {
        setDice(dice.map(die => {
            return {
                ...die,
                isHeld: die.id === id ? !die.isHeld : die.isHeld
            }
        }))
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function Random_Num_array() {
        var arr = [];
        for (var i = 0, t = 10; i < t; i++) {
            arr.push(generateNewDie())
        }
        return arr
    }

    const diceElements = dice.map(die =>
        <Die key={die.id}
            number={die.value}
            isHeld={die.isHeld}
            hold={() => Hold(die.id)}
        />)


    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
                die :
                generateNewDie()
        }))
    }
    function newGame() {
        setDice(Random_Num_array)
    }
    return (
        <div className="Tenzies">
            {tenzies && <Confetti />}
            <div className="White_Card">
                <div className="title">Tenzies</div>
                <div className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
                <div className="cards_grid" >
                    {diceElements}
                </div>
                <div><button className="but" onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"} </button></div>
            </div>

        </div>
    )
}
