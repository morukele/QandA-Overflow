import { compose } from "redux";
import { gettingUnansweredQuestionsAction } from "../Store";

export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}

export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}

export interface PostAnswerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[];
  readonly viewing: QuestionData | null;
  readonly searched: QuestionData[];
}

export interface AppState {
  readonly questions: QuestionsState;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
