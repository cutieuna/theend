
const connectToMongo = require('./db');
const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors');

app.use(cors());

connectToMongo();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/user'));

app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
