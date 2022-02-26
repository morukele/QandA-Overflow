/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Page from "../components/Page";
import QuestionList from "../components/QuestionList";
import { searchQuestions } from "../QuestionsData";
import { QuestionData } from "../types";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const search = searchParams.get("criteria") || "";

  useEffect(() => {
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      setQuestions(foundResults);
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
