import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { addTaskState, newTaskAtom } from '../../Atoms/addTaskAtom';
import { Calendar1Icon } from 'lucide-react';
import CustomCalendar from '../calender/calendar';

const AddTask: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const setAddTask = useSetRecoilState(addTaskState);
  const setNewTask = useSetRecoilState(newTaskAtom);
  const [date, setDate] = useState<string>('');

  const handleChange = (key: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewTask((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleDeadLineChange = (selectedDate: string) => {
    setDate(selectedDate);
    setNewTask((prevState) => ({
      ...prevState,
      deadline: selectedDate,
    }));
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-[333px] h-[504px] mx-auto ">
      <div className="relative flex justify-center items-center ">
        <AddTaskCard
          setCalendar={setShowCalendar}
          setAddTask={setAddTask}
          handleChange={handleChange}
          handleDeadLineChange={handleDeadLineChange}
          setDate={setDate}
          date={date}
        />
        {showCalendar && (
          <div className="absolute top-0 left-0 z-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ">
            <CustomCalendar handleDeadLineChange={handleDeadLineChange} />
          </div>
        )}
      </div>
    </div>
  );
};

type AddTaskCardProps = {
  setCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (key: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDeadLineChange: (selectedDate: string) => void;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  date: string;
};

const AddTaskCard: React.FC<AddTaskCardProps> = ({
  setCalendar,
  setAddTask,
  setDate,
  handleChange,
  handleDeadLineChange,
  date,
}) => {
  const handleDeadLineSet = () => {
    setCalendar((prevState) => !prevState); 
  };

  const handleCancelAddTodo = () => {
    setAddTask(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">ADD TASK</h2>
        <button className="text-xl font-bold">+</button>
      </div>
      <hr className="my-2" />
      <div>
        <input
          onChange={(e) => handleChange('title', e)}
          id="taskTitle"
          type="text"
          placeholder="Enter task title"
          className="w-full mt-2 p-2 border border-gray-300 rounded-md text-sm"
        />
        <textarea
          onChange={(e) => handleChange('description', e)}
          id="taskDescription"
          placeholder="Enter task description"
          className="w-full mt-2 p-2 border border-gray-300 rounded-md text-sm h-[330px] resize-none"
        />
      </div>
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="flex gap-2">
          <p className="font-semibold">Deadline:</p>
          <input
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              handleDeadLineChange(e.target.value);
            }}
            type="text"
            placeholder="DD/MM/YYYY"
            className="w-[80px]"
          />
          <Calendar1Icon
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={handleDeadLineSet}
          />
        </div>
        <button onClick={handleCancelAddTodo}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTask;