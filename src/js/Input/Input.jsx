import React from "react"
import styles from './Input.module.css'

const Input = (props) => {
    const {
        data,
        value,
        handleChange,
        error,
        textarea
    } = props;
    return (
        <>
            <div className={styles.container}>
                <label htmlFor={data.name} className={`${styles.label} ${error ? styles.label__error : ''}`}>{data.label}</label>
                <input
                    type={data.type}
                    name={data.name}
                    className={`${styles.input} ${error ? styles.input__error : ''} ${textarea ? styles.input__textarea : ''}`}
                    id={data.id}
                    value={value}
                    onChange={handleChange}
                    autoComplete="on" />
                {
                    error ?
                        <div className={styles.input__error__txt}>Введите {data.label}</div>
                        : ''
                }
            </div>
        </>
    );
}

export default Input