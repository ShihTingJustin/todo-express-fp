export enum TodoPriority {
  LOW = 'low',
  MED = 'medium',
  HIGH = 'high',
}

export enum TodoStatus {
  FINISH = 'finished',
  UNFINISH = 'unfinished',
}

export interface ITodo {
  id: string;
  listId: string;
  title: string;
  status: TodoStatus;
  priority?: TodoPriority;
}

export type CreateTodoReqBody = Omit<ITodo, 'id'>;

export default ITodo;
