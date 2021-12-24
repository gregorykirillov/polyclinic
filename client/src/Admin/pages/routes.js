import {getApiUrl} from '../../util/getApiUrl';

export const getSpecUrl = getApiUrl('/api/get-specialties');
export const setSpecUrl = getApiUrl('/api/set-specialty');
export const delSpecUrl = getApiUrl('/api/delete-specialty');

export const getPatUrl = getApiUrl('/api/get-patients');
export const setPatUrl = getApiUrl('/api/set-pacient');
export const delPatUrl = getApiUrl('/api/delete-patient');

export const getDocUrl = getApiUrl('/api/get-doctors');
export const getDocBySpecUrl = id => getApiUrl(`/api/get-doctors-by-specialty?specID=${id}`);
export const setDocUrl = getApiUrl('/api/set-doctor');
export const delDocUrl = getApiUrl('/api/delete-doctor');

export const getDiagUrl = getApiUrl('/api/get-diagnoses');
export const setDiagUrl = getApiUrl('/api/set-diagnose');
export const delDiagUrl = getApiUrl('/api/delete-diagnose');

export const getResUrl = getApiUrl('/api/get-results');
export const setResUrl = getApiUrl('/api/set-result');
export const delResUrl = getApiUrl('/api/delete-result');

export const getDocSchUrl = id => getApiUrl(`/api/get-doctor-schedule?id=${id}`);
export const setSchUrl = getApiUrl('/api/set-doctor-schedule');

export const formUrl = getApiUrl('/api/form');
