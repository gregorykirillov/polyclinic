# Система управления поликлиникой

## Установка зависимостей

### `cd client` & `npm i`

### `cd server` &  `npm i`

Для работы приложения необходимо создать файл `.env` в директории `server`.

### Файл `.env` должен содержать:
- DB_HOST
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE
- MAIL_USER - *Почта пользователя, с которой будут отправляться заявки*
- MAIL_PASSWORD - *Пароль пользователя, с почты которого будут отправляться заявки*
- MAIL_RECEIVER - *Получатель, на почту которого будут отправляться заявки*

В данном проекте использовалась база данных **MySQL**, размещенная на хостинге **Heroku**

## Запуск клиента
### `cd client & npm start`

## Запуск сервера
### `cd server & npm run dev`

## Описание проекта
### Возможности пользователя
- Ознакомиться со списком врачей в соответствующем разделе
- Записаться на приём врача
  - Выбрать специальность врача
  - Выбрать одного врача из предложенных в выбранной специальности
  - Указать ФИО, телефон и выбрать дату приёма, если она доступна
### Возможности администратора
- *CRUD*
  - специальностей врачей
  - докторов с выбором одной из имеющихся специальностей, указанием ФИО, должности и URL фотографии
  - расписания врачей с выбором даты начала и даты окончания работы в любой день недели
  - пациентов с указанием ФИО, даты рождения, адреса и телефона
  - осмотров пациентов с выбором одного из имеющихся пациентов, врачей и диагнозов, указанием даты осмотра и комментария
  - диагнозов
