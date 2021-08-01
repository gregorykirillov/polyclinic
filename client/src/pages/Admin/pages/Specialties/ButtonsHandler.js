/* eslint-disable no-unused-vars */
import {setSpecUrl, getSpecUrl, delSpecUrl} from '.././routes';
import {mutate} from 'swr';

let id = -1;

export const onEditItem = ({...props}) => {
    const input = document.getElementsByClassName('input')[0];
    input.value = props.specialty;
    input.id = props.id;

    id = props.id;
};

export const onClearItem = async (id, specialty) => {
    if (confirm(`Вы действительно хотите удалить ${specialty}?\n\nВНИМАНИЕ!\n` +
    'При удалении специальности удалятся все доктора этой специальности')) {
        await fetch(delSpecUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})});
        await mutate(getSpecUrl);
    }
};

export const onSubmit = async () => {
    const specialty = document.getElementsByClassName('input')[0];

    const postData = {id};
    id = -1;

    if (!specialty) {
        alert('Выберите элемент для изменения');
        return;
    }

    postData[specialty.name] = specialty.value;
    specialty.value = '';

    await fetch(setSpecUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)});
    await mutate(getSpecUrl);
};
