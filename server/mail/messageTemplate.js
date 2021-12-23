export const text = ({
    lastName,
    firstName,
    middleName,
    phone,
    doctorId,
    doctorName,
    doctorSpecialty,
    date
}) => 
    `ФИО: ${lastName} ${firstName} ${middleName}\n` + 
    `Телефон: ${phone}\n` +
    `ID врача: ${doctorId}\n` +
    `Врач: ${doctorName}\n` +
    `Специальность: ${doctorSpecialty}\n` +
    (
        date[0] ?
        `Дата: ${date[0]}\n` + `Время: ${date[1]}-${date[2]}` :
        ``
    )