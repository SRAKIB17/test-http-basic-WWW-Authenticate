const express = require('express');

const port = process.env.PORT || 5000;


const app = express()
app.use(express.json())

app.get('/', (req, res) => {

    const userpass = Buffer.from(
        (req.headers.authorization || '').split(' ')[1] || '',
        'base64'
    ).toString();


    if (userpass !== 'rakib:123456') {
        res.writeHead(401, { 'WWW-Authenticate': 'Basic' });
        return res.end('HTTP Error 401 Unauthorized: Access is denied');
    }
    else {
        return res.end('You are in! Yay!!');
    }
})




app.post('/fs', async (req, res) => {

    var fs = require('fs');
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
