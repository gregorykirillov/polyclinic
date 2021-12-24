import {delDiagUrl, getDiagUrl, setDiagUrl} from '.././routes';
import {mutate} from 'swr';
import request from '../../../util/request';

let id = -1;

export const onEditItem = ({...props}) => {
    const input = document.getElementsByClassName('input')[0];
    input.value = props.name;
    input.id = props.id;

    id = props.id;
};

export const onClearItem = async ({id, name}) => {
    if (!confirm(`Вы действительно хотите удалить ${name}?`)) return;

    await request(delDiagUrl, {
        method: 'DELETE',
        body: JSON.stringify({id})
    });

    await mutate(getDiagUrl);
};

export const onSubmit = async () => {
    const diagnose = document.getElementsByClassName('input')[0];

    const postData = {id};
    id = -1;

    if (!diagnose) {
        alert('Выберите элемент для изменения');
        return;
    }

    postData[diagnose.name] = diagnose.value;
    diagnose.value = '';

    await request(setDiagUrl, {
        method: 'POST',
        body: JSON.stringify(postData)
    });
    await mutate(getDiagUrl);
};
