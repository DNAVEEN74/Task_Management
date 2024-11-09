import { Dot } from 'lucide-react';
import TodoCard from './todoCard';
import { useEffect, useState } from 'react';

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

type TodoList = Todo[];

export default function TasksBoard() {
    const [todos, setTodos] = useState<TodoList>([]);
    const [onProgress, setOnProgress] = useState<TodoList>([]);
    const [completed, setCompleted] = useState<TodoList>([]);
    const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);

    const todoList: TodoList = [
        { id: '1', title: 'going to gym', description: 'go for about 365 days', deadline: '07/07/2025', priority: 'high', state: 'todos' },
        { id: '2', title: 'going to gym', description: 'go naveen naveen naveen for about 365 days', deadline: '07/07/2025', priority: 'high', state: 'todos' },
        { id: '3', title: 'going to gym', description: 'go for about 365 days', deadline: '07/07/2025', priority: 'high', state: 'onProgress' },
        { id: '4', title: 'going to gym', description: 'go for about 365 days', deadline: '07/07/2025', priority: 'high', state: 'completed' },
    ];

    const tabs = [
        { id: 'todos', list: todos, setList: setTodos, color: '#5030E5', title: 'To Do' },
        { id: 'onProgress', list: onProgress, setList: setOnProgress, color: '#FFA500', title: 'On Progress' },
        { id: 'completed', list: completed, setList: setCompleted, color: '#8BC48A', title: 'Completed' },
    ];

    useEffect(() => {
        const todosFiltered = todoList.filter((item) => item.state === 'todos');
        const onProgressFiltered = todoList.filter((item) => item.state === 'onProgress');
        const completedFiltered = todoList.filter((item) => item.state === 'completed');

        setTodos(todosFiltered);
        setOnProgress(onProgressFiltered);
        setCompleted(completedFiltered);
    }, []);

    const handleDragStart = (todo: Todo) => {
        setDraggedTodo(todo);
    };

    const handleDrop = (destinationId: string) => {
        if (draggedTodo) {
            if (draggedTodo.state === destinationId) {
                setDraggedTodo(null);
                return;
            }
    
            const sourceList = tabs.find((tab) => tab.id === draggedTodo.state)?.list;
            const destinationList = tabs.find((tab) => tab.id === destinationId)?.list;
            const setSourceList = tabs.find((tab) => tab.id === draggedTodo.state)?.setList;
            const setDestinationList = tabs.find((tab) => tab.id === destinationId)?.setList;
    
            if (sourceList && destinationList && setSourceList && setDestinationList) {
                setSourceList(sourceList.filter((item) => item.id !== draggedTodo.id));
                setDraggedTodo({ ...draggedTodo, state: destinationId });
    
                setDestinationList([...destinationList, { ...draggedTodo, state: destinationId }]);
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