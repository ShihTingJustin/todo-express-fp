import { ITodoDocument } from '@Models/todo';

export enum TodoPriority {
  LOW = 'low',
  MED = 'medium',
  HIGH = 'high',
}

export type ITodo = Pick<
  ITodoDocument,
  'title' | 'completed' | 'priority' | 'isDeleted' | 'listId'
> & {
  id: string;
};

export type CreateTodoReqBody = Omit<ITodo, 'id'>;
export type UpdateTodoReqBody = Partial<Omit<ITodo, 'id'>> & Pick<ITodo, 'id'>;
export type SearchTodoBody = {
  keyword: string;
};

export default ITodo;
