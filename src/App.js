import "./App.css"
import {useRef, useState} from "react";

const GUESS_THE_NUMBER_STRING = "Guess the target number";
const LESS_THAN_STRING = "The number is less";
const GREATER_THAN_STRING = "The number is greater";
const CORRECT_GUESS_STRING = "Yay! You guessed the number!";
const LOSER_STRING = "You lost!";
const ATTEMPTS_REMAINING_STRING = "Attempts remaining: ";

function App() {
    const [status, setStatus] = useState(GUESS_THE_NUMBER_STRING);
    const [attempts, setAttempts] = useState(10);

    const numberToBeGuessed = useRef(guessInteger());

    function handleSubmit(guessedNumber) {
        if (attempts === 0 || status === CORRECT_GUESS_STRING) {
            return;
        }

        if (guessedNumber === numberToBeGuessed.current) {
            setStatus(CORRECT_GUESS_STRING);
        } else if (guessedNumber < numberToBeGuessed.current) {
            setStatus(LESS_THAN_STRING);
        } else {
            setStatus(GREATER_THAN_STRING);
        }

        if (attempts === 1) {
            setStatus(LOSER_STRING + " The number is " + numberToBeGuessed.current);
        }

        setAttempts(attempts - 1);
    }

    function handleReset() {
        numberToBeGuessed.current = guessInteger();
        setAttempts(10);
        setStatus(GUESS_THE_NUMBER_STRING);
    }

    return (
        <>
            <p>{status}</p>
            <p>{ATTEMPTS_REMAINING_STRING + attempts}</p>
            <input type="number" id="guessedNumberField"/>
            <div className="buttonsDiv">
                <button className="buttons"
                        onClick={() => handleSubmit(parseInt(document.getElementById("guessedNumberField").value))}>Submit
                </button>
                <button className="buttons" onClick={handleReset}>Reset</button>
            </div>
        </>
    );
}

function guessInteger(maxLimit = 101) {
    let randomNumber = Math.random() * maxLimit;
    return Math.floor(randomNumber);
}

export default App;
