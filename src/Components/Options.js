function Options({ questions, dispatch, answer }) {
  const hasAnswer = answer !== null;
  
  return (
    <div>
      <h4>{questions.question}</h4>
      <div className="options">
        {questions.options.map((option, index) => (
          <button
          className={`btn btn-option ${
            index === answer
              ? "answer" 
              : ""
          }
            ${
              hasAnswer
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Options;
