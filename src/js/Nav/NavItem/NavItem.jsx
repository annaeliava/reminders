import React from "react"
import img from '../../../assets/img/list.svg'
import styles from './NavItem.module.css'

const NavItem = (props) => {
    const { handleClick, lessNav, name } = props;
    return (
        <>
            <button className={`${styles.btn} ${lessNav ? styles.btn__less : styles.btn__wider}`} onClick={handleClick}>
                <img
                    src={img}
                    alt="nav-item"
                    className={styles.img}
                />
                {
                    lessNav ?
                        ''
                        : <span className={styles.txt}>{name}</span>
                }
            </button>
        </>
    );
}

export default NavItem;