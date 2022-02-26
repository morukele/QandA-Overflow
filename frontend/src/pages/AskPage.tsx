import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Page from "../components/Page";
import { postQuestion } from "../QuestionsData";
import {
  FieldContainer,
  FieldError,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  SubmissionSuccess,
} from "../Styles";

type FormData = {
  title: string;
  content: string;
};

const AskPage = () => {
  const {
    register,
    formState,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({ mode: "onBlur" });
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

  const submitForm = async (data: FormData) => {
    const result = await postQuestion({
      title: data.title,
      content: data.content,
      userName: "Fred",
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page title="Ask a question">
      <form onSubmit={handleSubmit(submitForm)}>
        <Fieldset disabled={formState.isSubmitting || successfullySubmitted}>
          <FieldContainer>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <FieldInput
              id="title"
              type="text"
              {...register("title", {
                required: true,
                minLength: 10,
              })}
            />
            {errors.title && errors.title.type === "required" && (
              <FieldError>You must enter the question title</FieldError>
            )}
            {errors.title && errors.title.type === "minLength" && (
              <FieldError>The title must be at least 10 characters</FieldError>
            )}
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content">Content</FieldLabel>
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
            <PrimaryButton type="submit">Submit Your Question</PrimaryButton>
          </FormButtonContainer>
          {successfullySubmitted && (
            <SubmissionSuccess>
              Your question was successfully submitted
            </SubmissionSuccess>
          )}
        </Fieldset>
      </form>
    </Page>
  );
};

export default AskPage;
