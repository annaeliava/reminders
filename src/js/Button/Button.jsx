import React from "react"
import styles from './Button.module.css'

function Button(props) {
    const { data, handleClick } = props;
    return (
        <>
            <button
                className={styles.btn}
                style={{ width: data.width, background: data.background, color: data.color }}
                onClick={handleClick}>
                {data.text}
            </button>
        </>
    );
}

export default Button;