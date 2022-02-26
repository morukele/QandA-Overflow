/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import AnswerList from "../components/AnswerList";
import Page from "../components/Page";
import { getQuestion, postAnswer } from "../QuestionsData";
import {
  FieldContainer,
  FieldLabel,
  Fieldset,
  FieldTextArea,
  FormButtonContainer,
  gray3,
  gray6,
  PrimaryButton,
  SubmissionSuccess,
} from "../Styles";
import { QuestionData } from "../types";

type FormData = {
  content: string;
};

const QuestionPage = () => {
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

  const { questionId } = useParams();

  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
  }, [questionId]);

  const {
    register,
    formState: { errors },
    formState,
    handleSubmit,
  } = useForm<FormData>({ mode: "onBlur" });

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: "Fred",
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? "" : question.title}
        </div>
        {question !== null && (
          <>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${
                question.userName
              } on ${question.created.toLocaleDateString()} ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <form
              onSubmit={handleSubmit(submitForm)}
              css={css`
                margin-top: 20px;
              `}
            >
              <Fieldset
                disabled={formState.isSubmitting || successfullySubmitted}
              >
                <FieldContainer>
                  <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                  <FieldTextArea
                    id="content"
                    {...(register("content"),
                    {
                      required: true,
                      minLength: 50,
                    })}
                  />
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>
                {successfullySubmitted && (
                  <SubmissionSuccess>
                    Your answer was successfully submitted
                  </SubmissionSuccess>
                )}
              </Fieldset>
            </form>
          </>
        )}
      </div>
    </Page>
  );
};

export default QuestionPage;
