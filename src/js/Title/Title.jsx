import React, { useState } from "react"
import styles from "./Title.module.css"
import img from '../../assets/img/change-title-img.svg'
import Menu from "../Menu/Menu"

const Title = (props) => {
    const {
        text,
        lists,
        setLists,
        currentList,
        setIsModal
    } = props;
    const [isMenu, setIsMenu] = useState(false);
    // показываем/убираем меню списка
    const handleClick = () => {
        setIsMenu(!isMenu);
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>{text}</div>
                <button className={styles.btn}>
                    <img
                        src={img}
                        alt="btn"
                        onClick={handleClick}
                    />
                </button>
                {
                    isMenu ?
                        <div className={styles.menu}>
                            <Menu
                                {...{
                                    lists,
                                    setLists,
                                    currentList,
                                    setIsModal
                                }}
                            />
                        </div>
                        :
                        <></>
                }
            </div>
        </>
    );
}

export default Title;