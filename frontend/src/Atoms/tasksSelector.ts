import { atom } from 'recoil';

type Todo = {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  state: 'todos' | 'onProgress' | 'completed';
};

export const todoListAtom = atom<Todo[]>({
  key: 'todoListAtom',
  default: [],
});

export const todosAtom = atom<Todo[]>({
  key: 'todosAtom',
  default: [],
});

export const onProgressAtom = atom<Todo[]>({
  key: 'onProgressAtom',
  default: [],
});

export const completedAtom = atom<Todo[]>({
  key: 'completedAtom',
  default: [],
});