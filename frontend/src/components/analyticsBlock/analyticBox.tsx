import { Plus } from 'lucide-react';
import AnalyticCard from './analytics';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { addTaskState } from '../../Atoms/addTaskAtom';
import { todosAtom, onProgressAtom, completedAtom } from '../../Atoms/tasksSelector';

type Analytics = {
  logo: string;
  color: string;
  title: string;
  count: string;
}[];

export default function AnalyticBox(): JSX.Element {
  const setAddTask = useSetRecoilState(addTaskState);

  const todos = useRecoilValue(todosAtom);
  const onProgress = useRecoilValue(onProgressAtom);
  const completed = useRecoilValue(completedAtom);

  const expiredTasksCount = todos.filter(task => new Date(task.deadline) < new Date()).length;
  const activeTasksCount = todos.length + onProgress.length;
  const completedTasksCount = `${completed.length}/${todos.length + onProgress.length + completed.length}`;

  const analytics: Analytics = [
    {
      logo: 'TriangleAlert',
      color: '#F42D20',
      title: 'Expired Tasks',
      count: expiredTasksCount.toString(),
    },
    {
      logo: 'BriefcaseBusiness',
      color: '#E89271',
      title: 'All Active Tasks',
      count: activeTasksCount.toString(),
    },
    {
      logo: 'Clock4',
      color: '#70A1E5',
      title: 'Completed Tasks',
      count: completedTasksCount,
    },
  ];

  const handleAddTask = () => {
    setAddTask(true);
  };

  return (
    <div className="w-[268px] h-[668px] flex flex-col box-border gap-[16px]">
      <div className="flex-1 box-border flex flex-col gap-[16px]">
        {analytics.map((item, index) => (
          <AnalyticCard key={index} logo={item.logo} color={item.color} title={item.title} count={item.count} />
        ))}
      </div>
      <button
        onClick={handleAddTask}
        className="flex gap-[6px] justify-center items-center h-[48px] w-[268px] rounded-[19px] content-center pt-[6px] pb-[6px] pl-[12px] pr-[21px] bg-[#0D062D] text-white"
      >
        <Plus className="text-white h-[14px] w-[14px]" />
        <p className="font-sans font-medium text-sm leading-5 h-[18px] w-[65px]">Add Task</p>
      </button>
    </div>
  );
}