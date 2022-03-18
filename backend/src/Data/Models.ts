export type QuestionGetManyResponse = {
	questionId: number;
	title: string;
	content: string;
	userName: string;
	created: Date;
};

export type QuestionGetSingleResponse = {
	questionId: number;
	title: string;
	content: string;
	userName: string;
	userId: string;
	created: Date;
	answers?: AnswerGetResponse[];
};

export type AnswerGetResponse = {
	answerId: number;
	content: string;
	userName: string;
	created: Date;
};

export type QuestionPostRequest = {
	title: string;
	content: string;
	userId: string;
	userName: string;
	created: Date;
};

export type QuestionPutRequest = {
	title: string;
	content: string;
};

export type AnswerPostRequest = {
	questionId: number;
	content: string;
	userId: string;
	userName: string;
	created: Date;
};
