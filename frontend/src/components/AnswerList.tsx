/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { gray5 } from "../Styles";
import { AnswerData } from "../types";
import Answer from "./Answer";

interface Props {
  data: AnswerData[];
}

const AnswerList = ({ data }: Props) => {
  return (
    <ul
      css={css`
        list-style: none;
        margin: 10px 0 0 0;
        padding: 0;
      `}
    >
      {data.map((a) => {
        return (
          <li
            key={a.answerId}
            css={css`
              border-top: 1px solid ${gray5};
            `}
          >
            <Answer data={a} />
          </li>
        );
      })}
    </ul>
  );
};

export default AnswerList;
