import React from "react"
import styles from './MenuItem.module.css'
import down from '../../../assets/img/arrow-down.svg'
import up from '../../../assets/img/arrow-up.svg'

const MenuItem = (props) => {
    const { data, isClicked } = props;
    const img = isClicked ? up : down;
    return (
        <>
            <div className={styles.container} onClick={data.handleClick}>
                {
                    data.isImg ?
                        <img
                            className={styles.img}
                            src={img}
                            alt="img"
                        />
                        :
                        <></>
                }
                <span className={`${styles.txt} ${isClicked ? styles.txt__clicked : styles.txt__default}`}>{data.txt}</span>
            </div>
        </>
    );
}

export default MenuItem;