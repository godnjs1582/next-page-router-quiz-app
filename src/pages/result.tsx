import { TQuiz, TSavedAnswer } from "@/types/quiz";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const result = () => {
  const getAnswers =
    (typeof window !== "undefined" && localStorage.getItem("quiz")) ||
    JSON.stringify({});

  const answers: TSavedAnswer = JSON.parse(getAnswers);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(`./api/quiz`, fetcher);
  if (error) return <div>에러가 났습니다</div>;
  if (!data) return <div>Loading...</div>;
  let correctAnswer = 0;
  if (data) {
    data.map((quiz: TQuiz) => {
      if (quiz.answer === answers[quiz.id]) {
        correctAnswer = correctAnswer + 1;
      }
    });
  }
  return (
    <>
      <div>
        <Link href="/">다시 시작하기</Link>
      </div>
      <h2>
        {correctAnswer}개의 문제를 맞췄습니다.
        {correctAnswer > (data.length / 100) * 70 ? "Passed" : "Failed"}
      </h2>
      <br />
      {data.map((quiz: TQuiz) => (
        <>
          <div key={quiz.id}>
            <p>{quiz.question}</p>
          </div>
          <ul>
            {quiz.options.map((option: string, i: number) => (
              <li key={i}>
                {option === quiz.answer ? (
                  quiz.answer === answers[quiz.id] ? (
                    <span>{option}✅</span>
                  ) : (
                    <span>{option}</span>
                  )
                ) : answers[quiz.id] === option ? (
                  <span>{option}❌</span>
                ) : (
                  <span>{option}</span>
                )}
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  );
};

export default result;
