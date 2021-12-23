import React, {useEffect, useState, createContext, useContext} from 'react';
import Modal from './components/Modal/Modal';
import Doctors from './components/Doctors';

export let inputs;

export const useSpec = () => useContext(ModalContext);

const defaultModal = {
    get modalActive() {throw new Error();},
    setModalActive() {throw new Error();},
};

const ModalContext = createContext(defaultModal);

const WithModal = ({children}) => {
    const [modalActive, setModalActive] = useState(false);

    return (
        <ModalContext.Provider value={{modalActive, setModalActive, children}}>
            {children}
        </ModalContext.Provider>
    );
};

const DoctorsSchedule = () => {

    useEffect(() => {
        inputs = document.getElementsByClassName('input');
    });

    return (
        <WithModal>
            <div className="admin-container">
                <h2>Расписание</h2>
                <div className="items_container">
                    <Doctors />
                </div>
                <Modal />
            </div>
        </WithModal>
    );
};

export default DoctorsSchedule;
