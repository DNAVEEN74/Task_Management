import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addTaskState, backendUrlAtom, newTaskAtom } from '../../Atoms/addTaskAtom';
import { Calendar1Icon, ChevronDownIcon } from 'lucide-react';
import CustomCalendar from '../calender/calendar';
import axios from 'axios';

const AddTask: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const setAddTask = useSetRecoilState(addTaskState);
  const setNewTask = useSetRecoilState(newTaskAtom);
  const newTask = useRecoilValue(newTaskAtom);
  const [date, setDate] = useState<string>('');
  const url = useRecoilValue(backendUrlAtom);

  const handleAddTask = async () => {
    try {
      const response = await axios.post(`${url}/post`, newTask);
      console.log("Task added successfully:", response.data);
      setAddTask(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

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

  const handleSetPriority = (priority: string) => {
    setNewTask((prevState) => ({
      ...prevState,
      priority,
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
          handleAddTask={handleAddTask}
          handleSetPriority={handleSetPriority}
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
  handleAddTask: () => void;
  handleSetPriority: (priority: string) => void;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  date: string;
};

const AddTaskCard: React.FC<AddTaskCardProps> = ({
  setCalendar,
  setAddTask,
  setDate,
  handleChange,
  handleDeadLineChange,
  handleAddTask,
  handleSetPriority,
  date,
}) => {
  const [showPriorityDropdown, setShowPriorityDropdown] = useState<boolean>(false);

  const handleDeadLineSet = () => {
    setCalendar((prevState) => !prevState);
  };

  const handleCancelAddTodo = () => {
    setAddTask(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center content-center">
        <h2 className="text-lg font-bold">ADD TASK</h2>
        <div className="relative">
          <button onClick={handleAddTask} className="text-xl font-bold">+</button>
          <button onClick={() => setShowPriorityDropdown(!showPriorityDropdown)} className="ml-2">
            <ChevronDownIcon className="w-5 h-5" />
          </button>
          {showPriorityDropdown && (
            <div className="absolute right-0 mt-2 w-24 bg-white border rounded-md shadow-md">
              {['Low', 'Medium', 'High'].map((priority) => (
                <button
                  key={priority}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => {
                    handleSetPriority(priority.toLowerCase());
                    setShowPriorityDropdown(false);
                  }}
                >
                  {priority}
                </button>
              ))}
            </div>
          )}
        </div>
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