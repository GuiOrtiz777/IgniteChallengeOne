import react, { useCallback, useState, FormEvent, ChangeEvent, useEffect, InvalidEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './Task';

import { PlusCircle, ClipboardText } from 'phosphor-react'

import styles from './Todo.module.css';

export interface TaskState {
    key: string;
    text: string;
    isDone: boolean;
}

interface Tasks {
    content: TaskState;
}

export function Todo() {

    const [listTasks, setListTask] = useState<Tasks[]>([]);
    const [newTaskText, setNewTaskText] = useState<string>('');
    const [taskCount, setTaskCount] = useState(0);


    useEffect(() => {
        const countTasksChecked = listTasks.filter(task => task.content.isDone === true)
        setTaskCount(countTasksChecked.length);
    }, [listTasks])

    function handleCreateNewTask(event: FormEvent) {
        event?.preventDefault();

        setListTask([...listTasks, {  
            content: { 
                key: uuidv4(), 
                text: newTaskText,
                isDone: false,
            } 
        }]);

        setNewTaskText('');
    }

    function handleNewTaskText(event: ChangeEvent<HTMLInputElement>) {
        event?.target?.setCustomValidity('')

        setNewTaskText(event.target.value);
        
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
        event?.target?.setCustomValidity('Esse campo é obrigatório')
    }

    function deleteTask(idTaskToDelete: string) {
        const tasksWithoutDeleteOne = listTasks.filter(task => {
            return task.content.key !== idTaskToDelete;
        })
        setListTask(tasksWithoutDeleteOne);
    }

    function taskCheckedDone(checked: boolean, idTaskChecked: string) {
        const newTasksWithChecked = listTasks.map(task => {
            
            if (task.content.key === idTaskChecked) {
                return {
                    ...task,
                    content: { 
                        key: task.content.key, 
                        text: task.content.text, 
                        isDone: checked,
                    }
                }
            }
            return task;
        })

        setListTask(newTasksWithChecked)
        console.log(newTasksWithChecked)
       
    }

    const isNewTextTaskEmpty = newTaskText.length === 0;

    return (
        <div className={styles.wrapper}>
            <form className={styles.box} onSubmit={handleCreateNewTask}>
                <input 
                    className={styles.input} 
                    placeholder='Escreva uma tarafa'
                    value={newTaskText} 
                    onInvalid={handleNewTaskInvalid}
                    onChange={handleNewTaskText}
                    required
                />
                <button 
                    className={styles.button} 
                    type='submit' 
                    disabled={isNewTextTaskEmpty}>
                        Criar 
                        <PlusCircle />
                </button>
            </form>
            <div className={styles.infoListTasks}>
                <div className={styles.infoListTasksCreated}>
                    <span className={styles.description}>Tarefas criadas</span>
                    <span className={styles.info}>{listTasks.length}</span>
                </div>
                <div className={styles.infoListTasksCompleted}>
                    <span className={styles.description}>Concluída</span>
                    <div className={styles.info}>
                        {listTasks && listTasks.length > 0 ?
                            <span>{listTasks.length} de {taskCount}</span>
                            :
                            <span>{listTasks.length}</span>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.listTasks}>
                {listTasks && listTasks.length > 0 ? 
                    listTasks.map(item => 
                        <Task 
                            content={item.content} 
                            onDeleteTask={deleteTask}
                            onCheckDoneTask={taskCheckedDone}
                            key={item.content.key}
                        /> 
                    )
                    :
                    <footer className={styles.footer}>
                        <ClipboardText size={56} />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </footer>
                }
                
            </div>
        </div>
    )
}
