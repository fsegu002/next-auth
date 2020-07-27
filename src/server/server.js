const express = require('express');
const next = require('next');
const passport = require('passport');
const config = require('./config');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

require('../api/auth/config/passport');

app.prepare()
    .then(() => {
        const server = express();
        server.use(express.json());
        server.use(passport.initialize());

        server.use(config.api.v1.auth, authRouter);
        server.use(config.api.v1.users, userRouter);

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${PORT}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
