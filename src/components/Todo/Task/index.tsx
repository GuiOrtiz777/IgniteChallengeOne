import react, { ChangeEvent } from 'react';

import { Trash } from 'phosphor-react'

import CheckIcon from '../../../assets/check.svg';

import { TaskState } from '../../Todo';

import styles from './Task.module.css';

interface TaskProps {
    content: TaskState;
    onDeleteTask: (id: string) => void;
    onCheckDoneTask: (checked: boolean, key: string) => void;
}

export function Task({ content, onDeleteTask, onCheckDoneTask }: TaskProps) {

    function handleDeleteTask() {
        onDeleteTask(content.key)
    }

    function handleCheckTask(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.checked)
        onCheckDoneTask(event.target.checked, content.key)
    }

    return (
        <div className={styles.task} key={content.key}>
            <label className={styles.roundCheckbox}>
                <input type="checkbox" onChange={handleCheckTask}/>
                <img src={CheckIcon} />
            </label>
            {!content.isDone ? 
                <p>{content.text}</p>
            : 
                <p className={styles.isDoneTextTask}>{content.text}</p>
            }
            <button><Trash color='#808080' size={20} onClick={handleDeleteTask}/></button>
        </div>
    )
}