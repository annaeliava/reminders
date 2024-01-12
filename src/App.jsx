import React, { useState, useEffect } from 'react'
import styles from './assets/styles/App.module.css'
import Nav from './js/Nav/Nav.jsx'
import List from './js/List/List.jsx'
import Modal from './js/Modal/Modal.jsx'
import Loader from './js/Loader/Loader.jsx'


function App() {
  // loading
  const [isLoading, setIsLoading] = useState(true);
  // текущий список
  const [currentList, setCurrentList] = useState('list');
  // текущая задача 
  const [currentTask, setCurrentTask] = useState(null);
  // все списки
  const [lists, setLists] = useState({
    list: []
  });
  // модальное окно
  const [isModal, setIsModal] = useState(false);
  // модальное окно для редактирование
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(true);
  // меньше навбар
  const [lessNav, setLessNav] = useState(true);
  // уведомления
  function scheduleNotification() {
    Object.keys(lists).forEach((list) => {
      const listArr = lists[list];
      if (list.length > 0) {
        listArr.forEach((l) => {
          const now = new Date();
          let timeDifference;
          let task;
          if (l.deadline != null && l.deadline != undefined && l.deadline.length > 0) {
            timeDifference = l.deadline - now;
            task = l.task;
            setTimeout(() => {
              new Notification('Reminder', {
                body: `${task}: ${l.task}`,
              });
            }, timeDifference);
          }
        });
      }
    });
  }
  // загружаем списки из localStorage, если отсутствует - добавляем дефолтный пустой список
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('lists')) || { list: [] };
    setLists(storage);
    // первый список в localstorage
    setCurrentList(Object.keys(storage)[0]);
    scheduleNotification();
    setTimeout(() => { setIsLoading(false) }, 2000);
  }, []);
  // обновляем список в localStorage, если lists меняется
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
    scheduleNotification();
  }, [lists]);

  // меняем список
  const switchList = (name) => {
    setCurrentList(name);
  };
  return (
    <>
      {
        isLoading ?
          <Loader />
          :
          <div className={`${styles.container} ${lessNav ? '' : styles.container__wider}`}>
            <Nav
              handleAddList={() => {
                setIsModal(true);
                setIsEdit(false);
              }}
              {...{
                switchList,
                lists,
                lessNav,
                setLessNav,
                setIsNew
              }}
            />
            <List
              handleAdd={() => {
                setIsModal(true);
                setIsEdit(true);
                setIsNew(true);
              }}
              {...{
                isModal,
                currentList,
                lists,
                setLists,
                setIsModal,
                setIsEdit,
                setIsNew,
                setCurrentTask
              }}
            />

            {
              isModal ?
                <Modal
                  {...{
                    isEdit,
                    setIsEdit,
                    setIsModal,
                    lists,
                    setLists,
                    currentList,
                    isNew,
                    currentTask,
                    setCurrentTask,
                    scheduleNotification,
                  }} />
                :
                ''
            }
          </div >
      }
    </>
  )
}

export default App
