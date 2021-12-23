import React from 'react';
import useSWR from 'swr';

import {onEditItem} from '../ButtonsHandler';
import {getDocUrl} from '../../routes';

import editIcon from '../../../../../assets/svg/edit_icon.svg';

import {useSpec} from '../index';

const Doctors = () => {
    const {data: doctors} = useSWR(getDocUrl);
    const {setModalActive} = useSpec();

    return (
        <div>
            {doctors?.map(({id, name: fullName, specialty, position, image}) => {
                return (
                    <div className='doctorRow' key={id}>
                        <div className='info fullName'>
                            {fullName}
                        </div>
                        <div className='info specialty'>
                            {specialty}
                        </div>
                        <div className='info position'>
                            {position}
                        </div>
                        <div className="info img">
                            <a href={image} target="_blank" rel='noreferrer'>
                                <img className='imgPreview' src={image} />
                            </a>
                        </div>
                        <div className="buttons">
                            <button
                                onClick={() => onEditItem(setModalActive, {
                                    id,
                                    fullName,
                                    specialty,
                                    position,
                                    image,
                                })}
                            >
                                <img src={editIcon} className='edit_button' />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Doctors;
