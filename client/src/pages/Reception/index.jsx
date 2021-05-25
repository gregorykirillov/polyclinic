/* eslint-disable camelcase */
import React, {useState, createContext, useContext} from 'react';

import Modal from './components/Modal/Modal';
import DoctorsList from './components/DoctorsList';
import SpecialtyCard from './components/SpecialtyCard';
import './reception.scss';

export const useSpec = () => useContext(SpecContext);

const defaultSpec = {
    get spec() {throw new Error();},
    setSpec() {throw new Error();},
    get modalActive() {throw new Error();},
    setModalActive() {throw new Error();},
};
const SpecContext = createContext(defaultSpec);

const WithSpec = ({children}) => {
    const [spec, setSpec] = useState(null);
    const [modalActive, setModalActive] = useState(false);

    return (
        <SpecContext.Provider value={{spec, setSpec, modalActive, setModalActive, children}}>
            {children}
        </SpecContext.Provider>
    );
};

const About = () => {
    return(
        <WithSpec>
            <div className="container">
                <h1 className="main_title">Reception</h1>
                <SpecialtyCard />
                <DoctorsList />
                <Modal />
            </div>
        </WithSpec>
    );
};


export default About;
