import { TSavedAnswer } from "@/types/quiz";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/Quix.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Quiz = () => {
  const [pageIndex, setPageIndex] = React.useState(0);
  const { data, error } = useSWR(`/api/quiz?page=${pageIndex}`, fetcher);
  const [answered, setAnswered] = useState<TSavedAnswer>({}); //string key, string value가 온다
  if (error) {
    return (
      <div>
        <h3>에러가 발생했습니다</h3>
      </div>
    );
  }
  if (!data) {
    return (
      <div>
        <h3>loading</h3>
      </div>
    );
  }

  const { quiz, next, prev, page, total } = data;
  const addAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const latestAnswers = { ...answered, [name]: value };
    setAnswered(latestAnswers);
    localStorage.setItem("quiz", JSON.stringify(latestAnswers));
  };
  return (
    <>
      <div className={styles.info}>
        <p>
          {parseInt(page) + 1} of {total}
        </p>
      </div>
      <div>
        <p>
          {quiz.options.map((option: string, i: number) => (
            <li key={i} className={styles.option}>
              <input
                type="radio"
                name={quiz.id.toString()}
                onChange={(e) => addAnswer(e)}
                value={option}
                checked={answered[quiz.id] === option}
              />
              {option}
            </li>
          ))}
        </p>
      </div>
      <div className={styles.navBtns}>
        {prev ? (
          <button onClick={() => setPageIndex(pageIndex - 1)}>이전문제</button>
        ) : (
          <Link href="/">취소</Link>
        )}
        {next ? (
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={answered[quiz.id] === undefined}
            className={
              answered[quiz.id] === undefined ? "disabledBtn" : "activeBtn"
            }
          >
            다음문제
          </button>
        ) : (
          answered[quiz.id] !== undefined && <Link href="/result">끝</Link>
        )}
      </div>
    </>
  );
};

export default Quiz;
