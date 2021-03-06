/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { css } from "@emotion/react";
import { fontFamily, fontSize, gray1, gray2, gray5, gray6 } from "../Styles";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormData = {
  search: string;
};

const Header = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [searchParams] = useSearchParams();
  const criteria = searchParams.get("criteria") || "";
  const navigate = useNavigate();

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const submitForm = ({ search }: FormData) => {
    navigate(`search?criteria=${search}`);
  };

  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
      `}
    >
      <Link
        to="./"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1};
          text-decoration: none;
        `}
      >
        Q & A
      </Link>
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          {...register("search")}
          type="text"
          placeholder="Search..."
          defaultValue={criteria}
          css={css`
            box-sizing: border-box;
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 8px 10px;
            border: 1px solid ${gray5};
            border-radius: 3px;
            color: ${gray2};
            background-color: white;
            width: 200px;
            height: 30px;
            :focus {
              outline-color: ${gray5};
            }
          `}
        />
      </form>
      <Link to="./signin">
        <FaUserAlt width="12px" opacity={0.6} color="black" />
        <span
          css={css`
            margin-left: 7px;
          `}
        >
          Sign In
        </span>
      </Link>
    </div>
  );
};

export default Header;
