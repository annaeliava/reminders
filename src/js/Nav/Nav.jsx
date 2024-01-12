import React from "react"
import styles from './Nav.module.css'
import NavItem from "./NavItem/NavItem"
import switchImg from '../../assets/img/nav.svg'
import addImg from '../../assets/img/add.svg'

const Nav = (props) => {
    const {
        switchList,
        lists,
        handleAddList,
        lessNav,
        setLessNav
    } = props;
    return (
        <div className={`${styles.container} ${lessNav ? styles.container__less : styles.container__wider}`}>
            <div className={styles.container__nav}>
                <div className={`${styles.container__nav__btnSwitch} ${lessNav ? styles.container__nav__btnSwitch__less : styles.container__nav__btnSwitch__wider}`}>
                    <button
                        className={`${styles.btn} ${styles.nav__switch}`}
                        onClick={() => setLessNav(!lessNav)}>
                        <img
                            src={switchImg}
                            alt="switch"
                            className={styles.nav__img}
                        />
                    </button>
                </div>
                <div className={styles.nav__list}>
                    {
                        Object.keys(lists).map((list) => (
                            <NavItem
                                key={list}
                                name={list}
                                handleClick={() => switchList(list)}
                                lessNav={lessNav}
                            />
                        ))
                    }
                </div>
                <button className={`${styles.btn} ${styles.nav__add}`} onClick={handleAddList}>
                    <img
                        src={addImg}
                        alt="add"
                        className={styles.nav__img}
                    />
                </button>
            </div>
        </div>
    );
}

export default Nav;