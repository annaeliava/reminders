import React from "react"
import styles from "./List.module.css"
import Title from "../Title/Title"
import ListItem from '../ListItem/ListItem'
import plus from '../../assets/img/add.svg'

const List = (props) => {
    const {
        handleAdd,
        isModal,
        currentList,
        setLists,
        lists,
        setIsModal,
        setIsEdit,
        setIsNew,
        setCurrentTask
    } = props;

    // массив текущего списка
    const arr = lists[currentList];

    // задача выполнена
    const handleTaskCompleted = (e) => {
        if (e.target.checked) {
            // убираем завершенный
            const updatedLists = lists[currentList].filter((task) => task.id !== e.target.id);
            // отображаем список с задержкой
            setTimeout(() => setLists({
                ...lists,
                [currentList]: updatedLists
            }), 500);
        }
    }

    return (
        <div className={`${styles.container} ${isModal ? styles.container__modal : ''}`}>
            <Title
                className={styles.title}
                text={currentList}
                {...{
                    lists,
                    setLists,
                    currentList,
                    setIsModal
                }}
            />
            <div className={styles.container__main}>
                <button className={styles.btn__add} onClick={handleAdd}>
                    <img
                        src={plus}
                        alt="add"
                        className={styles.btn__add__img} />
                </button>
                <div className={styles.reminders}>
                    {
                        arr.map((a) => (
                            <ListItem
                                data={a}
                                key={a.id}
                                handleClick={(e) => {
                                    setIsModal(true);
                                    setIsEdit(true);
                                    setIsNew(false);
                                    setCurrentTask(a.id);
                                }}
                                handleChange={handleTaskCompleted}
                            />
                        ))
                    }
                </div>
            </div>
        </div >
    );
}

export default List;