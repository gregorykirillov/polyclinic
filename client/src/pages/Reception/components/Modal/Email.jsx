import {formUrl} from '../../../Admin/pages/routes';
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

    fetch(formUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options)});
};
