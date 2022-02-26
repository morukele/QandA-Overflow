/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { gray3 } from "../Styles";
import { AnswerData } from "../types";

interface Props {
  data: AnswerData;
}

const Answer = ({ data }: Props) => {
  return (
    <div
      css={css`
        padding: 10px 0px;
      `}
    >
      <div
        css={css`
          padding: 10px 0px;
          font-size: 13px;
        `}
      >
        {data.content}
      </div>
      <div
        css={css`
          font-size: 12px;
          font-style: italic;
          color: ${gray3};
        `}
      >
        {`Answered by ${
          data.userName
        } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
      </div>
    </div>
  );
};

export default Answer;
