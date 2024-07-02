import { Task } from "../../models/Task";

export function storeNotifyTimes(tasks:Task[]|Task)
{
    debugger
    if (Array.isArray(tasks)) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].statusName.toLowerCase() === 'active') {
                let temp: string[]=[];
                temp.push(tasks[i].name);
                temp.push(tasks[i].notifyOn.toString());
                localStorage.setItem(tasks[i].id.toString(), temp.join(','));
                debugger
            }
        }
    } else {
        if (tasks.statusName.toLowerCase() === 'active') {
            let temp: string[]=[];
            temp.push(tasks.name);
            temp.push(tasks.notifyOn.toString());
            localStorage.setItem(tasks.id.toString(), temp.join(','));
        }
    }
    return;
}