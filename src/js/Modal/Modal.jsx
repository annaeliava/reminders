import React, { useState } from "react"
import styles from './Modal.module.css'
import cross from '../../assets/img/cross.svg'
import Input from "../Input/Input"

const ListModal = [
    { name: 'newlist', id: 'newlist-0', type: 'text', label: 'название' }
];

const EditText = [
    { name: 'newReminder', id: 'newreminder-0', type: 'text', label: 'задача:' }
];

const EditDescription = [
    { name: 'newDescription, id: newdescription-0', type: 'text', label: 'описание:' }
];

const Modal = (props) => {
    const {
        isEdit,
        setIsModal,
        lists,
        setLists,
        currentList,
        isNew,
        currentTask,
        scheduleNotification
    } = props;
    // инпут новый список
    const [value, setValue] = useState('');
    // инпут новая задача
    const [task, setTask] = useState('');
    // инпут описание новой задачи 
    const [description, setDescription] = useState('');
    // срок выполнения
    const [deadline, setDeadline] = useState('');
    // закрыть модальное окно
    const handleCloseModal = () => {
        setIsModal(false);
    }
    // добавить новый список
    const handleSave = (name) => {
        setLists({
            ...lists,
            [name]: []
        });
        setIsModal(false);
        console.log(lists)
    }
    // задача
    const handleSaveReminder = (e) => {
        // текущий список
        const current = lists[currentList];

        if (isNew) {
            // новый id для задачи
            const id = `${currentList}-${Date.now()}`;
            current.push({ task: task, description: description, deadline: deadline, isCompleted: false, id: id });
            setLists({
                ...lists,
                [currentList]: current
            });
        } else {
            const updatedList = current.map((a) => {
                const currentID = a.id;
                if (currentID === currentTask) {
                    if (task.length > 0 && description.length > 0 && deadline.length > 0) {
                        return { ...a, task: task, description: description, deadline: deadline };
                    } else if (task.length > 0 && description.length > 0) {
                        return { ...a, task: task, description: description };
                    } else if (deadline.length > 0 && description.length > 0) {
                        return { ...a, description: description, deadline: deadline };
                    } else if (task.length > 0) {
                        return { ...a, task: task };
                    } else if (description.length > 0) {
                        return { ...a, description: description };
                    } else {
                        return { ...a, deadline: deadline };
                    }
                } else {
                    return a;
                }
            });

            setLists({
                ...lists,
                [currentList]: updatedList
            });
        }

        setIsModal(false);
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.modal}>
                    <button className={styles.closeBtn} onClick={handleCloseModal}>
                        <img src={cross} alt="closeBtn" />
                    </button>
                    {
                        isEdit ?
                            <>
                                <div className={styles.modal__edit}>
                                    {
                                        EditText.map((edit) => (
                                            <Input
                                                data={edit}
                                                key={edit.id}
                                                error={false}
                                                textarea={false}
                                                value={task}
                                                handleChange={(e) => setTask(e.target.value)}
                                            />
                                        ))
                                    }
                                    {
                                        EditDescription.map((edit) => (
                                            <Input
                                                data={edit}
                                                key={edit.id}
                                                error={false}
                                                textarea={true}
                                                value={description}
                                                handleChange={(e) => setDescription(e.target.value)}
                                            />
                                        ))
                                    }
                                    <div className={styles.modal__deadline__container}>
                                        <label
                                            htmlFor="deadline"
                                            className={styles.modal__deadline__label}>
                                            срок выполнения:
                                        </label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            id="deadline"
                                            value={deadline}
                                            pattern="\d{1,2}/\d{1,2}/\d{4}"
                                            onChange={(e) => setDeadline(e.target.value)}
                                            className={styles.modal__deadline} />
                                    </div>
                                </div>
                                <div className={styles.container__btns}>
                                    <button className={`${styles.btn} ${styles.deleteBtn}`}>удалить</button>
                                    <button
                                        className={`${styles.btn} ${styles.addBtn}`}
                                        onClick={(e) => handleSaveReminder(e)}>
                                        {`${isNew ? 'добавить' : 'изменить'}`}
                                    </button>
                                </div>
                            </>
                            :
                            <>
                                {
                                    ListModal.map((a) => (
                                        <Input
                                            data={a}
                                            key={a.id}
                                            error={false}
                                            value={value}
                                            handleChange={(e) => setValue(e.target.value)}
                                        />
                                    ))
                                }
                                <button
                                    className={`${styles.btn} ${styles.addBtn}`}
                                    onClick={() => handleSave(value)}>
                                    создать
                                </button>
                            </>
                    }
                </div>
            </div>
        </>
    );
}

export default Modal;