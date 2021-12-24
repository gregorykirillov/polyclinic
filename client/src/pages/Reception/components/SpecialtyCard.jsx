import React, {useState} from 'react';
import useSWR from 'swr';
import {getSpecUrl} from '../../../Admin/pages/routes';

import {useSpec} from '../index';

const useSpecsList = () =>
    useSWR(getSpecUrl);

const SpecialtyCard = () => {
    const {setSpec} = useSpec();
    const {data, error} = useSpecsList();
    const [activeId, setActiveId] = useState(null);

    if (error) return <div>Ошибка загрузки</div>;
    if (!data) return <div>Загрузка...</div>;

    return (
        <div className="specialty_cards">
            {data.map(({specialty, id}) => {
                return (
                    <div key={id} className="specialty_card">
                        <button
                            className={id === activeId ? 'active' : null}
                            onClick={() => {
                                setSpec(id);
                                setActiveId(id);
                            }}
                        >
                            {specialty}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default SpecialtyCard;
