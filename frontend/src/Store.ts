import { combineReducers, compose, createStore, Store } from "redux";
import { AppState, QuestionData, QuestionsState } from "./types";

const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: [],
};

//Actions
export const GETTINGUNANSWEREDQUESTIONS = "GettingUnansweredQuestions";
export const gettingUnansweredQuestionsAction = () =>
  ({
    type: GETTINGUNANSWEREDQUESTIONS,
  } as const);

export const GOTUNANSWEREDQUESTIONS = "GotUnansweredQuestions";
export const gotUnansweredQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: GOTUNANSWEREDQUESTIONS,
    questions: questions,
  } as const);

export const GETTINGQUESTION = "GettingQuestion";
export const gettingQuestionAction = () =>
  ({
    type: GETTINGQUESTION,
  } as const);

export const GOTQUESTION = "GotQuestion";
export const gotQuestionAction = (question: QuestionData | null) =>
  ({
    type: GOTQUESTION,
    question: question,
  } as const);

export const SEARCHINGQUESTIONS = "SearchingQuestions";
export const searchingQuestionsAction = () =>
  ({
    type: SEARCHINGQUESTIONS,
  } as const);

export const SEARCHEDQUESTIONS = "SearchedQuestions";
export const searchedQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: SEARCHEDQUESTIONS,
    questions,
  } as const);

//Defining reducer types
type QuestionsActions =
  | ReturnType<typeof gettingUnansweredQuestionsAction>
  | ReturnType<typeof gotUnansweredQuestionsAction>
  | ReturnType<typeof gettingQuestionAction>
  | ReturnType<typeof gotQuestionAction>
  | ReturnType<typeof searchingQuestionsAction>
  | ReturnType<typeof searchedQuestionsAction>;

const questionsReducer = (
  state = initialQuestionState,
  action: QuestionsActions
): QuestionsState => {
  switch (action.type) {
    case GETTINGUNANSWEREDQUESTIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOTUNANSWEREDQUESTIONS: {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case GETTINGQUESTION: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case GOTQUESTION: {
      return {
        ...state,
        viewing: action.question,
        loading: false,
      };
    }
    case SEARCHINGQUESTIONS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }
    case SEARCHEDQUESTIONS: {
      return {
        ...state,
        searched: action.questions,
        loading: false,
      };
    }
  }
  return state;
};

const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (): Store<AppState> => {
  const store = createStore(rootReducer, composeEnhancers());
  return store;
};
