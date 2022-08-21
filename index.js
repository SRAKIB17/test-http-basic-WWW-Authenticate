const express = require('express');

const port = process.env.PORT || 5000;
var fs = require('fs');


const app = express()
app.use(express.json())

app.post('/', (req, res) => {

    const userpass = Buffer.from(
        (req.headers.authorization || '').split(' ')[1] || '',
        'base64'
    ).toString();

    if (userpass) {
        const body = req.body || ''

        const data = JSON.stringify(body)

        fs.writeFile('db.json', data, function (err) {

            if (err) {
                return console.error(err);
            }

            fs.readFile('db.json', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                return res.end(data?.toString());
            });
        });
        console.log(userpass)
        return res.send('You are in! Yay!!');
    }


    res.writeHead(401, { 'WWW-Authenticate': 'Basic' });
    res.end('HTTP Error 401 Unauthorized: Access is denied');
})


app.get('/', async (req, res) => {

    const userpass = Buffer.from(
        (req.headers.authorization || '').split(' ')[1] || '',
        'base64'
    ).toString();

    if (userpass) {
        console.log(userpass)
        await fs.readFile('db.json', await function (err, data) {
            if (err) {
                return console.error(err);
            }
            return res.end(data?.toString());
        });
        return res.end('sdflsdfjl');
    }


    res.writeHead(401, { 'WWW-Authenticate': 'Basic' });
    res.end('HTTP Error 401 Unauthorized: Access is denied');
})

app.get('/fs', (req, res) => {
    fs.readFile('db.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        return res.end(data?.toString());
    });
})


app.post('/fs', async (req, res) => {

    const body = req.body || ''

    const data = JSON.stringify(body)

    fs.writeFile('db.json', data, function (err) {

        if (err) {
            return console.error(err);
        }

        fs.readFile('db.json', function (err, data) {
            if (err) {
                return console.error(err);
            }
            return res.end(data?.toString());
        });
    });

})

app.listen(port, () => {
    console.log('running port')
})
