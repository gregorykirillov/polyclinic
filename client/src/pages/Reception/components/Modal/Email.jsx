import {formUrl} from '../../../../Admin/pages/routes';
import request from '../../../../util/request';
import {doctorInfo} from '../DoctorsList';
import {selectedDate} from './Schedule';


export const sendEmail = () => {
    const options = {'lastName': '', 'firstName': '', 'middleName': '', 'phone': ''};

    Object.keys(options).map((key) => {
        options[key] = document.getElementsByClassName(key)[0].value;
    });
    options['doctorId'] = doctorInfo.id;
    options['doctorName'] = doctorInfo.fullName;
    options['doctorSpecialty'] = doctorInfo.specialty;
    options['date'] = selectedDate;

    request(formUrl, {
        method: 'POST',
        body: JSON.stringify(options)});
};
