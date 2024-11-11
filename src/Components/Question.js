import Options from "./Options"
function Question ({questions,dispatch,answer}){
    return (
        <div>
            <Options questions={questions} dispatch={dispatch} answer={answer} />
        </div>
    )
}

export default Question