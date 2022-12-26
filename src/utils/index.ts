import List from '@Models/list';
import Todo from '@Models/todo';
import { ITodo, CreateTodoReqBody } from '@Interfaces/I_todo';

export async function checkListIdValid(listId: string) {
  try {
    const data = await List.findById(listId).exec();
    return !!data?._id;
  } catch (err) {
    console.log(err);
  }
}

export async function addTodo(todo: CreateTodoReqBody) {
  try {
    const data = await Todo.create(todo);
    const newTodo: ITodo = {
      id: data._id,
      title: data.title,
      status: data.status,
      listId: data.listId,
    };
    return newTodo;
  } catch (err) {
    console.log(err);
  }
}
