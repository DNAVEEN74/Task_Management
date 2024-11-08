import AnalyticBox from './analyticBox';
import SearchBar from './searchBar';
import TasksBoard from './tasksBoard';



export default function HomePage (){


    return (
        <div className="flex flex-col h-[936px] w-[1561px] pt-[50px] pr-[21px] pb-[18px] pl-[21px] gap-[54px]" >
            <SearchBar />
            <div className="flex flex-row w-[1519px] h-[688px] gap-[54px]">
                <AnalyticBox />
                <TasksBoard />
            </div>
        </div>
    )
}