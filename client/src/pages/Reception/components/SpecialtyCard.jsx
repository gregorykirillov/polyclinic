import React from 'react';
import useSWR from 'swr';

import {useSpec} from '../index';

const useSpecsList = () =>
    useSWR('http://localhost:3001/api/get-specialties');

const SpecialtyCard = () => {
    const {setSpec} = useSpec();
    const {data, error} = useSpecsList();

    if (error) return <div>Ошибка загрузки</div>;
    if (!data) return <div>Загрузка...</div>;

    return (
        <div className="specialty_cards">
            {data.map(({specialty, id}) => {
                return (
                    <div key={id} className="specialty_card">
                        <ul>
                            <li onClick={() => setSpec(specialty)}>
                                {specialty}
                            </li>
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default SpecialtyCard;
