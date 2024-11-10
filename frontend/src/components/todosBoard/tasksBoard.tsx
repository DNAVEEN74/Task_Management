import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { todosAtom, onProgressAtom, completedAtom, todoListAtom } from '../../Atoms/tasksSelector';
import TodoCard from './todoCard';
import { Dot } from 'lucide-react';
import axios from 'axios';
import { backendUrlAtom } from '../../Atoms/addTaskAtom';

type ColumnProps = {
  children: React.ReactNode;
};

type TopBandProps = {
  title: string;
  count: number;
  color: string;
};

type Todo = {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  priority: string;
  state: string;
};

type Tab = {
  id: string;
  list: Todo[];
  color: string;
  title: string;
  setList: any;
};

export default function TasksBoard() {
    const todolist = useRecoilValue(todoListAtom);
    const [todos, setTodos] = useRecoilState(todosAtom);
    const [onProgress, setOnProgress] = useRecoilState(onProgressAtom);
    const [completed, setCompleted] = useRecoilState(completedAtom);
    const setTodoList = useSetRecoilState(todoListAtom);
    const url = useRecoilValue(backendUrlAtom);

  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`${url}/get`);
      setTodoList(response.data);

      const fetchedTodos = response.data;
      setTodos(fetchedTodos.filter((task:Todo) => task.state === 'todos'));
      setOnProgress(fetchedTodos.filter((task:Todo) => task.state === 'onProgress'));
      setCompleted(fetchedTodos.filter((task:Todo) => task.state === 'completed'));
    };

    fetchTasks();
  }, [setTodoList, setTodos, setOnProgress, setCompleted, todolist]);

  const tabs: Tab[] = [
    { id: 'todos', list: todos, color: '#5030E5', title: 'To Do', setList: setTodos },
    { id: 'onProgress', list: onProgress, color: '#FFA500', title: 'On Progress', setList: setOnProgress },
    { id: 'completed', list: completed, color: '#8BC48A', title: 'Completed', setList: setCompleted },
  ];

  const handleDragStart = (todo: Todo) => {
    setDraggedTodo(todo);
  };

  const handleDrop = async (destinationId: string) => {
    if (draggedTodo) {
      if (draggedTodo.state === destinationId) {
        setDraggedTodo(null);
        return;
      }

      const sourceTab = tabs.find((tab) => tab.id === draggedTodo.state);
      const destinationTab = tabs.find((tab) => tab.id === destinationId);

      if (sourceTab && destinationTab) {
        sourceTab.setList(sourceTab.list.filter((item) => item.id !== draggedTodo.id));
        const updatedTodo = { ...draggedTodo, state: destinationId };
        destinationTab.setList([...destinationTab.list, updatedTodo]);

        try {
          await axios.put(`${url}/todo`, {
            id: draggedTodo.state,
            state: destinationId,
            title: draggedTodo.title,
          });
        } catch (error) {
          console.error('Failed to update task:', error);
        }
      }

      setDraggedTodo(null);
    }
  };

  return (
    <div className="flex gap-[54px] w-[1197px] h-[668px] box-border">
      {tabs.map((task) => (
        <Column key={task.id}>
          <TopBand title={task.title} count={task.list.length} color={task.color} />
          <div
            className="flex flex-col items-center overflow-y-auto max-h-[600px] w-full"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(task.id)}
          >
            {task.list.length > 0 ? (
              <TodoCard todos={task.list} onDragStart={handleDragStart} />
            ) : (
              <div className="w-full h-20 bg-gray-200 flex items-center justify-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(task.id)}
              >
                <p>Drop here</p>
              </div>
            )}
          </div>
        </Column>
      ))}
    </div>
  );
}

function TopBand({ title, count, color }: TopBandProps): JSX.Element {
  return (
    <div className="h-9 w-[314px] flex justify-center gap-2 sticky top-0 bg-[#ECEDEE] z-10" style={{ borderBottom: `2px solid ${color}` }}>
      <Dot style={{ color: `${color}` }} />
      <p className="font-medium text-base leading-[19.36px]">{title}</p>
      <p className="h-5 w-5 text-[#625F6D] font-medium text-xs rounded-full bg-[#E0E0E0] text-center">{count}</p>
    </div>
  );
}

export function Column({ children }: ColumnProps): JSX.Element {
  return (
    <div className="relative w-[354px] h-[668px] rounded-[10px] py-5 flex flex-col gap-[9px] items-center bg-[#ECEDEE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      {children}
    </div>
  );
}