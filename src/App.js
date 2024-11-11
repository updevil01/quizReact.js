import Main from "./Components/Main";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import { useEffect, useReducer } from "react";
import Question from "./Components/Question";
import Nextbutton from "./Components/NextButton";
import Progress from "./Components/Progress";
const initialState = {
  questions: [],
  //loading
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "dataFailed",
      };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextquestion" :
      return {...state,index:state.index + 1,answer:null}
    default:
      throw new Error("Action unknown");
  }
}
export default function App() {
  const [{ questions, status, index, answer,points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev,cur)=> prev + cur.points,0)
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
          <Progress answer={answer} index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} />
          <Question
            questions={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Nextbutton dispatch={dispatch} answer={answer}/>
          </>
        )}
      </Main>
      {/* <DateCounter /> */}
    </div>
  );
}
