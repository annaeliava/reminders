import React from "react"
import styles from './Loader.module.css'

const Loader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.lds__ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loader;