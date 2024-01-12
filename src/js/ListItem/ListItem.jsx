import React from "react"
import styles from './ListItem.module.css'
import img from '../../assets/img/edit.svg'

const ListItem = (props) => {
    const { data, handleChange, handleClick } = props;
    return (
        <>
            <div className={styles.container}>
                <span className={styles.container__reminder}>
                    <input
                        type="radio"
                        name={data.name}
                        id={data.id}
                        className={styles.input}
                        onChange={(e) => handleChange(e)} />
                    <span className={styles.container__txt}>
                        <span className={styles.txt}>{data.task}</span>
                        <span className={styles.description}>{data.description}</span>
                        <span className={styles.deadline}>{data.deadline}</span>
                    </span>
                </span>
                <button className={styles.btn} onClick={(e) => handleClick(e)} id={data.id}>
                    <img src={img} alt="edit" id={data.id} />
                </button>
            </div>
        </>
    );
}

export default ListItem;