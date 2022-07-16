import React, { useMemo } from "react";

import "./assets/styles/style.css";
import initQuestions from "./questions.json";
import Board from "./components/Board/Board";

import ProgressBar from "./components/ProressBar/ProgressBar";

function App() {
  const [questions, setQuestions] = React.useState(initQuestions);
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = React.useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = React.useState(false);

  React.useEffect(() => {
    setCurrentQuestion(formatQuestion(questions[0]));
  }, []);

  const formatQuestion = (question) => {
    question.question = decodeURIComponent(question.question);
    question.category = decodeURIComponent(question.category);
    if (question.type === "multiple") {
      question.correct_answer = decodeURIComponent(question.correct_answer);
      question.incorrect_answers = question.incorrect_answers.map((item) =>
        decodeURI(item)
      );
    }
    if (question.type === "boolean") {
      question.incorrect_answers[0] = getBooleanFromString(
        question.incorrect_answers[0]
      );
      question.correct_answer = getBooleanFromString(question.correct_answer);
    }
    return question;
  };

  const getBooleanFromString = (arg) => {
    if (arg === "True") return true;
    return false;
  };

  const getQuestionIndex = () => questions.indexOf(currentQuestion);

  const onAnswerSelected = (result) => {
    setIsAnswerSubmitted(true);
    let isCorrect = result === "correct";
    if (isCorrect) {
      setIsAnswerCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    if (getQuestionIndex() + 1 !== questions.length) {
      setIsAnswerSubmitted(false);
      setIsAnswerCorrect(false);
      setCurrentQuestion(formatQuestion(questions[getQuestionIndex() + 1]));
    }
  };

  const getAllQuestionsProgress = useMemo(
    () => ((getQuestionIndex() + 1) / questions.length) * 100,
    [currentQuestion, questions]
  );

  const getCurrentProgress = useMemo(() => {
    return Math.ceil((correctAnswers / (getQuestionIndex() + 1)) * 100);
  }, [currentQuestion, correctAnswers]);

  const getLowestPossibleProgress = useMemo(() => {
    return Math.ceil((correctAnswers / questions.length) * 100);
  }, [currentQuestion, correctAnswers]);

  const getHighestPossibleProgress = useMemo(() => {
    return Math.ceil(
      ((correctAnswers + (questions.length - getQuestionIndex())) /
        questions.length) *
        100
    );
  }, [currentQuestion]);

  return (
    <div>
      <ProgressBar
        data={[{ progress: getAllQuestionsProgress, color: "lightgray" }]}
      />

      <Board
        question={currentQuestion}
        currentIndex={getQuestionIndex() + 1}
        totalQuestions={questions.length}
        onAnswerSelected={onAnswerSelected}
        disabled={isAnswerSubmitted}
      />
      {isAnswerSubmitted && (
        <div style={{ textAlign: "center" }}>
          <h3>{isAnswerCorrect ? "Correct" : "Sorry!"}</h3>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}

      <div className="footer">
        <p>Lowest Score: {getLowestPossibleProgress}%</p>
        <p>Score: {getCurrentProgress}%</p>
        <p>Highest Score: {getHighestPossibleProgress}%</p>
        <ProgressBar
          data={[
            { progress: getHighestPossibleProgress, color: "lightgrey" },
            { progress: getCurrentProgress, color: "gray" },
            { progress: getLowestPossibleProgress, color: "black" },
          ]}
          styles={{ position: "absolute", bottom: 0 }}
        />
      </div>
    </div>
  );
}

export default App;
