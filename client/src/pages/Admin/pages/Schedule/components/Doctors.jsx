import React from 'react';
import useSWR from 'swr';

import {onEditItem} from '../ButtonsHandler';
import {getDocUrl} from '../../routes';

import editIcon from '../../../../../assets/svg/edit_icon.svg';

import {useSpec} from '../index';

function Doctors() {
    const {data: doctors} = useSWR(getDocUrl);
    const {setModalActive} = useSpec();

    return (
        <div>
            {doctors?.map(({id, name: fullName, specialty, position, image}) => {
                return (
                    <div className='doctorRow' key={id}>
                        <div className='info fullName'>{fullName}</div>
                        <div className='info specialty'>{specialty}</div>
                        <div className='info position'>{position}</div>
                        <div className="info img"><img className='imgPreview' src={image} /></div>
                        <div className="buttons">
                            <img src={editIcon}
                                className='edit_button'
                                onClick={() => onEditItem(setModalActive, {
                                    id,
                                    fullName,
                                    specialty,
                                    position,
                                    image,
                                })}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Doctors;
