import { useRecoilValue } from 'recoil';
import AnalyticBox from './analyticsBlock/analyticBox';
import SearchBar from './searchBar';
import TasksBoard from './todosBoard/tasksBoard';
import { addTaskState as addTaskAtom } from '../Atoms/addTaskAtom';
import AddTask from './addTask/addTask';

export default function HomePage() {
    const addTask = useRecoilValue<boolean>(addTaskAtom);

    return (
        <div className="flex flex-col h-[936px] w-[1561px] pt-[50px] pr-[21px] pb-[18px] pl-[21px] gap-[54px]">
            <SearchBar />
            <div className="flex flex-row w-[1519px] h-[688px] gap-[54px]">
                <AnalyticBox />
                <TasksBoard />
            </div>
            { addTask && <div className='absolute h-[936px] w-full bg-transparent backdrop-blur-lg z-10 flex items-center'>
                <AddTask />
            </div> }
        </div>
    );
}