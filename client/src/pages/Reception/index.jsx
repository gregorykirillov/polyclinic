/* eslint-disable camelcase */
import React, {useState, createContext, useContext} from 'react';

import './reception.scss';

const SPECS = [{specialty: 'dental'}, {specialty: 'end'}];
const DOCTORS_REPO = [
    {
        id: '1',
        full_name: 'grish',
        spec: 'dental',
    },
    {
        id: '2',
        full_name: 'kirill',
        spec: 'end',
    },
    {
        id: '3',
        full_name: 'art',
        spec: 'dental',
    },
];

const defaultSpec = {
    get spec() {throw new Error();},
    setSpec() {throw new Error();},
};
const SpecContext = createContext(defaultSpec);

export const useSpec = () => useContext(SpecContext);
const WithSpec = ({children}) => {
    const [spec, setSpec] = useState(null);

    return (
        <SpecContext.Provider value={{spec, setSpec}}>
            {children}
        </SpecContext.Provider>
    );
};

// const useDoctors = spec =>
//     useSWR('http://localhost:3001/api/get-doctors-by-specialty', spec ? {specialty: spec} : {});

// const useSpecsList = () =>
//     useSWR('http://localhost:3001/api/get-specialties');

const useDoctors = spec => ({
    data: spec ? DOCTORS_REPO.filter(d => d.spec === spec) : DOCTORS_REPO,
    isValidating: false,
});
const useSpecsList = () => ({data: SPECS, isValidating: false});


const SpecialtyCard = () => {
    const {setSpec} = useSpec();
    const {data, error, isValidating} = useSpecsList();

    if (error) return <div>failed to load</div>;
    if (!data || isValidating) return <div>loading...</div>;

    return (
        <div className="specialty_cards">
            {data.map(({specialty, id}) => {
                return (
                    <div key={id} className="specialty_card">
                        <button onClick={() => setSpec(specialty)}>
                            {specialty}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

const DoctorsList = () => {
    const {spec} = useSpec();
    const {data: doctors} = useDoctors(spec);

    return (
        <div className="doctors">
            {
                doctors.map(({id, full_name: fullName}) => (
                    <div key={id} className="doctor">{fullName}</div>
                ))
            }
        </div>
    );
};

const About = () => (
    <WithSpec>
        <div className="container">
            <h1 className="main_title">Reception</h1>

            <SpecialtyCard />
            <DoctorsList />
        </div>
    </WithSpec>
);


export default About;
