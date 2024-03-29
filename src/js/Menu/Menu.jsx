import React, { useState } from "react"
import styles from './Menu.module.css'
import MenuItem from "./MenuItem /MenuItem";

const Menu = (props) => {
    const { lists, setLists, currentList, setIsMenu } = props;
    // список открыт ил нет
    const [isClicked, setIsClicked] = useState(false);
    // удалить список
    const deleteList = () => {
        const updatedList = { ...lists };
        delete updatedList[currentList];
        setLists(updatedList);
        localStorage.setItem('lists', JSON.stringify(updatedList));
        setIsModal(false)
    }

    const showSorting = () => {
        setIsClicked(!isClicked);
    }

    const compareDeadline = (a, b) => {
        if (a.deadline < b.deadline) {
            return -1;
        }
        if (a.deadline > b.deadline) {
            return 1;
        }
        return 0;
    }

    const compareCreateDate = (a, b) => {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }

    const handleSortingCreatedDate = () => {
        const tasks = lists[currentList];
        const sortedData = tasks.sort(compareCreateDate);
        setLists({
            ...lists,
            [currentList]: sortedData
        });
        setIsMenu(false);
    }

    const handleSortingDeadline = () => {
        const tasks = lists[currentList];
        const sortedData = tasks.sort(compareDeadline);
        setLists({
            ...lists,
            [currentList]: sortedData
        });
        setIsMenu(false);
    }

    const MenuArr = [
        { isImg: false, txt: 'удалить', handleClick: deleteList, id: 0 },
        { isImg: true, txt: 'сортировать список', handleClick: showSorting, id: 1 }
    ];

    const MenuSortArr = [
        { isImg: false, txt: 'по дате создания', handleClick: handleSortingCreatedDate, id: 2 },
        { isImg: false, txt: 'по сроку выполнения', handleClick: handleSortingDeadline, id: 3 }
    ];

    return (
        <>
            <div className={styles.container}>
                <div className={`${styles.menu} ${styles.menu__main} ${isClicked ? styles.menu__main__clicked : ''}`}>
                    {
                        MenuArr.map((menu) => (
                            <MenuItem
                                data={menu}
                                key={menu.id}
                                {...{
                                    isClicked
                                }}
                            />
                        ))
                    }
                </div>
                <div className={`${styles.menu} ${isClicked ? styles.menu__sort : styles.menu__none}`}>
                    {
                        isClicked ?
                            MenuSortArr.map((menu) => (
                                <MenuItem
                                    data={menu}
                                    key={menu.id}
                                    isClicked={false}
                                />
                            ))
                            :
                            <></>
                    }
                </div>
            </div>
        </>
    );
}

export default Menu;