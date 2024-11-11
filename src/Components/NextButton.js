export default function Nextbutton({ dispatch, answer,index,numQuestions }) {
  if (answer === null) return null;
  if(index < numQuestions -1 )
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextquestion" })}
    >
      {" "}
      Next{" "}
    </button>
  );

  if(index === numQuestions -1 )
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Finish" })}
      >
        {" "}
        Finish{" "}
      </button>
    );
}
