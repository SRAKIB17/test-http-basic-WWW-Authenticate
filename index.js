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




app.get('/fs', async (req, res) => {

    var fs = require('fs');


    const data = `
    path: It is a string, Buffer, URL, or file description integer that denotes the path of the file where it has to be written. Using a file descriptor will make it behave similarly to fs.write() method.
    `
    fs.writeFile('input.txt', data, function (err, data) {
    
        if (err) {
            return console.error(err);
        }


        fs.readFile('input.txt', function (err, data) {
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
