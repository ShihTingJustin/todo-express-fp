export enum TodoPriority {
  LOW = 'low',
  MED = 'medium',
  HIGH = 'high',
}

export enum TodoStatus {
  FINISH = 'finished',
  UNFINISH = 'unfinished',
}

export type ITodo = {
  id: string;
  listId: string;
  title: string;
  status: TodoStatus;
  priority?: TodoPriority;
};

export default ITodo;
