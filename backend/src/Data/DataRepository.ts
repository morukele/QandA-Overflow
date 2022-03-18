import { PrismaClient } from "@prisma/client";
import { empty } from "@prisma/client/runtime";
import {
	AnswerGetResponse,
	AnswerPostRequest,
	QuestionGetManyResponse,
	QuestionPostRequest,
	QuestionPutRequest,
	QuestionGetSingleResponse,
} from "./Models";

interface IDataRepository {
	GetQuestions(): Promise<QuestionGetManyResponse[]>;
	GetQuestionsBySearch(search: string): Promise<QuestionGetManyResponse[]>;
	GetUnansweredQuestions(): Promise<QuestionGetManyResponse[]>;
	GetQuestion(questionId: number): Promise<QuestionGetSingleResponse>;
	QuestionExists(questionId: number): Promise<Boolean>;
	GetAnswer(answerId: number): Promise<AnswerGetResponse>;
	PostQuestion(
		question: QuestionPostRequest
	): Promise<QuestionGetSingleResponse>;
	PutQuestion(
		questionId: number,
		question: QuestionPutRequest
	): Promise<QuestionGetSingleResponse>;
	DeleteQuestion(questionId: number): Promise<void>;
	PostAnswer(answer: AnswerPostRequest): Promise<AnswerGetResponse>;
}

const repository = new PrismaClient();

const DataRepository: IDataRepository = {
	GetQuestions: async () => {
		const questions = await repository.question.findMany();

		return questions;
	},

	GetQuestionsBySearch: async (
		search: string
	): Promise<QuestionGetManyResponse[]> => {
		const questions = await repository.question.findMany({
			where: {
				OR: [
					{
						title: { contains: search },
						content: { contains: search },
					},
				],
			},
		});

		return questions;
	},

	GetUnansweredQuestions: async (): Promise<QuestionGetManyResponse[]> => {
		const questions = await repository.question.findMany({
			where: {
				answers: undefined,
			},
		});

		return questions;
	},

	GetQuestion: async (
		questionId: number
	): Promise<QuestionGetSingleResponse> => {
		const question = await repository.question.findFirst({
			where: {
				questionId: questionId,
			},
			include: {
				answers: true,
			},
		});

		return question as QuestionGetSingleResponse;
	},

	QuestionExists: async (questionId: number): Promise<Boolean> => {
		const question = await repository.question.findFirst({
			where: {
				questionId: questionId,
			},
		});

		return question ? true : false;
	},

	GetAnswer: async (answerId: number): Promise<AnswerGetResponse> => {
		const answer = await repository.answer.findFirst({
			where: {
				answerId: answerId,
			},
		});

		return answer as AnswerGetResponse;
	},

	PostQuestion: async (
		question: QuestionPostRequest
	): Promise<QuestionGetSingleResponse> => {
		const createdQuestion = await repository.question.create({
			data: question,
			include: {
				answers: true,
			},
		});

		return createdQuestion;
	},

	PutQuestion: async (
		questionId: number,
		question: QuestionPutRequest
	): Promise<QuestionGetSingleResponse> => {
		const updatedQuestion = await repository.question.update({
			where: {
				questionId: questionId,
			},
			data: {
				title: question.title,
				content: question.content,
			},
			include: {
				answers: true,
			},
		});

		return updatedQuestion;
	},

	DeleteQuestion: async (questionId: number): Promise<void> => {
		await repository.question.delete({
			where: {
				questionId: questionId,
			},
		});
	},

	PostAnswer: async (
		answer: AnswerPostRequest
	): Promise<AnswerGetResponse> => {
		const postedAnswer = await repository.answer.create({
			data: answer,
		});

		return postedAnswer;
	},
};

export default DataRepository;
