import {mutate} from 'swr';
import request from '../../../util/request';
import {delDocUrl, getDocUrl, setDocUrl} from '../routes';
import {inputs} from './index';

let id = -1;

export const onEditItem = ({...props}) => {
    Array.from(inputs).forEach((val) => {
        val.value = props[val.name];
    });

    id = props.id;
};

export const onClearItem = async (id, fullName) => {
    const confirmed = confirm(`Вы действительно хотите удалить ${fullName}?`);
    if (confirmed) {
        await request(delDocUrl, {
            method: 'DELETE',
            body: JSON.stringify({id})});
        await mutate(getDocUrl);
    }
};

export const onSubmit = async () => {
    const inputValues = Array.from(document.getElementsByClassName('input'));
    if (!inputValues[1].selectedIndex) {
        alert('Выберите специальность');
        return;
    }

    const postData = {id};
    id = -1;
    inputValues.forEach((val) => {
        postData[val.name] = val.value;
        val.tagName == 'INPUT' ? val.value = '' : (val.selectedIndex = 0);
    });

    await request(setDocUrl, {
        method: 'POST',
        body: JSON.stringify(postData)});

    await mutate(getDocUrl);
};
