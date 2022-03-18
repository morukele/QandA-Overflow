/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { getUnansweredQuestions } from "../QuestionsData";
import { PrimaryButton } from "../Styles";
import { AppState, QuestionData } from "../types";
import Page from "../components/Page";
import PageTitle from "../components/PageTitle";
import QuestionList from "../components/QuestionList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  gettingUnansweredQuestionsAction,
  gotUnansweredQuestionsAction,
} from "../Store";

const HomePage = () => {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: AppState) => state.questions.unanswered
  );
  const questionsLoading = useSelector(
    (state: AppState) => state.questions.loading
  );

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      dispatch(gettingUnansweredQuestionsAction());
      const unansweredQuestions = await getUnansweredQuestions();
      dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
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
