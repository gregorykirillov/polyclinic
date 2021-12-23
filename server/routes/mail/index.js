import Mail from '../../mail/mail.js';

const generateMailRoutes = (app, db) => {
    app.post('/api/form', (req, res) => {
        Mail(req.body).catch(console.error);
    })
}

export default generateMailRoutes;