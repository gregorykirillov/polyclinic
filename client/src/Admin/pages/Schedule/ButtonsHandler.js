import {mutate} from 'swr';
import request from '../../../util/request';

import {getDocUrl, setDocUrl} from '../routes';

let id = -1;

const getCurrentId = () => id;
const resetCurrentId = () => id = -1;

export const doctorInfo = {};

export const onEditItem = (setModalActive, {...props}) => {
    setModalActive(true);
    for(const key in props) {
        doctorInfo[key] = props[key];
    }
    id = props.id;
};


const getInputValues = inputs => {
    const res = {};

    inputs.forEach((val) => {
        res[val.name] = val.value;
        val.tagName == 'INPUT' ? val.value = '' : (val.selectedIndex = 0);
    });

    return res;
};

export const onSubmit = async () => {
    const inputValues = Array.from(document.getElementsByClassName('input'));
    if (!inputValues[1].selectedIndex) {
        alert('Выберите специальность');
        return;
    }

    const vals = getInputValues(inputValues);

    const postData = {id: getCurrentId(), ...vals};
    resetCurrentId();


    await request(setDocUrl, {
        method: 'POST',
        body: JSON.stringify(postData)});

    await mutate(getDocUrl);
};
