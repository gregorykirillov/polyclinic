import {getResUrl, setResUrl, delResUrl} from '.././routes';
import {mutate} from 'swr';
import {inputs} from './index';

let id = -1;

export const onEditItem = ({...props}) => {
    Array.from(inputs).forEach((val) => {
        val.value = props[val.name];
    });

    id = props.id;
};

export const onClearItem = async ({id, patientName}) => {
    if (confirm(`Вы действительно хотите удалить ${patientName}?`)) {
        await fetch(delResUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})});
        await mutate(getResUrl);
    }
};

export const onSubmit = async () => {
    const inputValues = Array.from(document.getElementsByClassName('input'));

    let filledAll = true;

    inputValues.every((val) => {
        if (!val.selectedIndex) {
            alert('Выберите все опции');
            filledAll = !filledAll;
            return filledAll;
        }
    });

    if (!filledAll) {
        return;
    }

    const postData = {id};
    id = -1;
    inputValues.forEach((val) => {
        postData[val.name] = val.value;
        if (val[val.selectedIndex]) {
            postData[val.name + 'ID'] = val[val.selectedIndex].id;
        }

        val.tagName == 'INPUT' ? val.value = '' : (val.selectedIndex = 0);
    });

    await fetch(setResUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)});

    await mutate(getResUrl);
};
