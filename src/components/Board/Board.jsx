import React, { useMemo } from "react";

import Star from "./../star/Star";

export default function Board({
  currentIndex,
  question,
  totalQuestions,
  onAnswerSelected,
  disabled,
}) {
  const getShuffledArray = (unshuffled) =>
    unshuffled
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  const handleOptionClick = (item) => {
    if (disabled) return;
    if (item === question.correct_answer) {
      onAnswerSelected("correct");
    } else {
      onAnswerSelected("incorrect");
    }
  };

  const renderOptions = () => {
    if (question.type === "multiple") {
      const optionsList = getShuffledArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);

      return (
        <>
          {optionsList.map((item) => (
            <button
              key={item}
              disabled={disabled}
              onClick={() => handleOptionClick(item)}
            >
              {item}
            </button>
          ))}
        </>
      );
    }
    if (question.type === "boolean") {
      const optionsList = getShuffledArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);

      return (
        <>
          {optionsList.map((item) => (
            <button
              key={item}
              disabled={disabled}
              onClick={() => handleOptionClick(item)}
            >
              {item ? "Yes" : "No"}
            </button>
          ))}
        </>
      );
    } else {
      return <p>Not valid question</p>;
    }
  };

  const getRating = useMemo(() => {
    if (question.difficulty === "easy") return 1;
    if (question.difficulty === "medium") return 2;
    return 3;
  }, [question.difficulty]);

  return (
    <div>
      <h2>
        Question {currentIndex} of {totalQuestions}
      </h2>
      <h4>{question.category} </h4>
      <Star total={3} slected={getRating} size={25} />
      <p>{question.question}</p>

      {renderOptions()}
    </div>
  );
}
