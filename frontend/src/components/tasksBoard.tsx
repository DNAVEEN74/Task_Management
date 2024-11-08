import { Dot } from 'lucide-react';
import TodoCard from './todoCard';

type ColumnProps = {
    children: React.ReactNode;
};

type TopBandProps = {
    title:string;
    count:number;
    color:string
}

export default function TasksBoard (){

    return (
        <>
            <div className="flex gap-[54px] w-[1197px] h-[668px] box-border">
                <Column>
                    <TopBand title="To Do" count={3} color="#5030E5" />
                    <TodoCard />
                </Column>
                <Column>
                    <TopBand title="On Progress" count={2} color="#FFA500" />
                </Column>
                <Column>
                    <TopBand title="Completed" count={2} color="#8BC48A" />
                </Column>
            </div>
        </>
    )
};

function TopBand ({title, count, color}: TopBandProps): JSX.Element {
    return (
        <div className="h-9 w-[314px] flex justify-center gap-2 " style={{ borderBottom: `2px solid ${color}` }}>
            <Dot style={{color:`${color}`}} />
            <p className='font-medium text-base leading-[19.36px]' >{title}</p>
            <p className='h-5 w-5 text-[#625F6D] font-medium text-xs rounded-full bg-[#E0E0E0] text-center ' >{count}</p>
        </div>
    )
}

export function Column({ children }: ColumnProps): JSX.Element {
    return (
        <div className="w-[354px] h-[668px] rounded-[10px] py-5 flex flex-col gap-[9px] items-center bg-[#ECEDEE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            {children}
        </div>
    );
}