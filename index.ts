import express from 'express';
import passport from './passport';
import jwt from 'jsonwebtoken';
import { users } from './users';

const app = express();
const port = 3000;
app.use(express.json());
app.use(passport.initialize());

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Merhaba Dünya!');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Kullanıcı adı ve şifre gereklidir.');
    }
    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(401).send('Kullanıcı adı veya şifre hatalı.');
    }

    const token = jwt.sign({ sub: user.id }, 'ONLYJS_SECRET', { expiresIn: '1d' });
    res.json({ token });
});

app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});
