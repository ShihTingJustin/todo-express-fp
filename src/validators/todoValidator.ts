import { Schema } from 'express-validator';

export const todoSchemaValidateOption: { [key: string]: Schema } = {
  searchTodo: {
    keyword: {
      in: 'params',
      trim: true,
      escape: true,
      errorMessage: 'keyword is wrong',
    },
  },
  createTodo: {
    listId: {
      in: 'body',
      isMongoId: true,
      errorMessage: 'listId is wrong',
    },
    title: {
      in: 'body',
      isString: true,
      escape: true,
      errorMessage: 'title is wrong',
    },
    completed: {
      in: 'body',
      isBoolean: true,
      errorMessage: 'completed is wrong',
    },
  },
  updateTodo: {
    id: {
      in: 'body',
      isMongoId: true,
      errorMessage: 'id is wrong',
    },
    title: {
      in: 'body',
      isString: true,
      escape: true,
      optional: true,
      errorMessage: 'title is wrong',
    },
    completed: {
      in: 'body',
      isBoolean: true,
      errorMessage: 'completed is wrong',
    },
  },
  deleteTodo: {
    todoId: {
      in: 'params',
      isMongoId: true,
      errorMessage: 'todoId is wrong',
    },
  },
};
