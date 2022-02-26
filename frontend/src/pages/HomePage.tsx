/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { getUnansweredQuestions } from "../QuestionsData";
import { PrimaryButton } from "../Styles";
import { QuestionData } from "../types";
import Page from "../components/Page";
import PageTitle from "../components/PageTitle";
import QuestionList from "../components/QuestionList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const navigate = useNavigate();

  const handleAskQuestionClick = () => {
    navigate("ask");
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div>loading...</div>
      ) : (
        <QuestionList data={questions} />
      )}
    </Page>
  );
};

export default HomePage;
