import { Ellipsis } from 'lucide-react';

type Todo = {
    title:string;
    description?:string;
    deadline:string;
    priority:string;
}

export default function TodoCard (): JSX.Element {

    const todo:Todo = {
        title:'Assignment',
        description:'okey we can do this',
        deadline:'07/07/2025',
        priority:'high'
    }

    return (
        <div className="w-[314px] h-[177px] bg-white px-4 py-3" >
            <div className='flex justify-between' >
                <div>{todo.priority}</div>
                <Ellipsis />
            </div>
            <div className='font-sans text-lg font-semibold leading-5 w-4/5 color-[#0D062D]' >{todo.title}</div>
            <div className='w-4/5 font-sans text-xs font-normal ' >{todo.description}</div>
            <p className='relative bottom-[20px] ' >Deadline:{todo.deadline}</p>
        </div>
    )
}