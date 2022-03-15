export interface Todo {
  id: number;
  title: string;
  difficulty: string;
  justTodo: boolean;
  inProgress: boolean;
  completed: boolean;
  editing: boolean;
}

type makeTodoTypeInterface<T, Key> = {
  [K in keyof T]: K extends Key ? true : T[K];
};

export type TodosInProgress = makeTodoTypeInterface<Todo, 'inProgress'>;
export type TodosCompleted = makeTodoTypeInterface<Todo, 'completed'>;
