/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Page from "../components/Page";
import QuestionList from "../components/QuestionList";
import { searchQuestions } from "../QuestionsData";
import { searchedQuestionsAction, searchingQuestionsAction } from "../Store";
import { AppState, QuestionData } from "../types";

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const questions = useSelector((state: AppState) => state.questions.searched);

  const search = searchParams.get("criteria") || "";

  useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestionsAction());
      const foundResults = await searchQuestions(criteria);
      dispatch(searchedQuestionsAction(foundResults));
    };
    doSearch(search);
  }, [search]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};

export default SearchPage;
