import {mutate} from 'swr';
import {inputs} from './index';
import {setPatUrl, getPatUrl, delPatUrl} from '../routes';

let id = -1;

export const onEditItem = ({...props}) => {
    Array.from(inputs).forEach((val) => {
        val.value = props[val.name];
    });

    id = props.id;
};

export const onClearItem = async (id, fullName) => {
    if (confirm(`Вы действительно хотите удалить ${fullName}\n\nВНИМАНИЕ!\n` +
    'При удалении пациента также удалятся все осмотры этой пациента')) {
        await fetch(delPatUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})});
        await mutate(getPatUrl);
    }
};

export const onSubmit = async () => {
    const inputValues = Array.from(document.getElementsByClassName('input'));
    if (inputValues[1].value == 'Специальность') {
        alert('Выберите специальность');
        return;
    }

    const postData = {id};
    id = -1;
    inputValues.forEach((val) => {
        postData[val.name] = val.value;
        val.tagName == 'INPUT' ? val.value = '' : (val.selectedIndex = 0);
    });

    await fetch(setPatUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)});

    await mutate(getPatUrl);
};
