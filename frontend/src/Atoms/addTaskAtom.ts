import { atom } from "recoil";

type NewTask = {
    title: string;
    description: string;
    deadline: string;
    priority: string;
    state: string;
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
        priority:'',
        state:'todos',
    },
});

export const backendUrlAtom = atom({
    key:'backendUrlAtom',
    default:'http://localhost:3000'
})