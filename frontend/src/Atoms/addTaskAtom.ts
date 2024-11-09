import { atom } from "recoil";

type NewTask = {
    title: string;
    description: string;
    deadline: string;
};

export const addTaskState = atom<boolean>({
    key: 'addTaskState',
    default: false,
});

export const newTaskAtom = atom<NewTask>({
    key: 'newTaskAtom',
    default: {
        title: '',
        description: '',
        deadline: '',
    },
});