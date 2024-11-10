import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { backendUrlAtom } from '../../Atoms/addTaskAtom';
import { todosAtom } from '../../Atoms/tasksSelector';

type Todo = {
    id: string;
    title: string;
    description?: string;
    deadline: string;
    priority: string;
    state: string;
};

type TodoCardProps = {
    todos: Todo[];
    onDragStart?: (todo: Todo) => void;
}

const formatDate = (date: string): string => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export default function TodoCard({ todos, onDragStart = () => {} }: TodoCardProps): JSX.Element {
    const url = useRecoilValue(backendUrlAtom);
    const setTodos = useSetRecoilState(todosAtom);

    const handleDelete = async (todoTitle: string) => {
        try {
            await axios.delete(`${url}/todo/${todoTitle}`);
            
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.title !== todoTitle));
        } catch (error) {
            console.error("Failed to delete todo:", error);
        }
    };

    return (
        <>
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className="relative w-[314px] min-h-[100px] bg-white px-4 py-3 mb-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-2xl flex flex-col gap-1.5 cursor-pointer"
                    draggable
                    onDragStart={() => onDragStart(todo)}
                >
                    <div className="flex justify-between content-center">
                        <div className='w-9 h-[23] rounded bg-[#DFA874] bg-opacity-20 font-normal text-xs leading-4 text-[#D58D49] text-center flex flex-col justify-center'>
                            {todo.priority}
                        </div>
                        <Trash2 className="cursor-pointer" onClick={() => handleDelete(todo.title)} />
                    </div>
                    <div className="font-sans text-lg font-semibold leading-5 w-4/5 text-[#0D062D]">
                        {todo.title}
                    </div>
                    <div className="w-4/5 font-sans text-xs font-normal mb-4 leading-[14.5px] text-[#787486] mt-1">
                        {todo.description}
                    </div>
                    <p className="relative font-sans text-xs ">
                        <b className='font-bold font-medium'>Deadline:</b> {formatDate(todo.deadline)}
                    </p>
                </div>
            ))}
        </>
    );
}