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




app.get('/fs', (req, res) => {
    // Node.js program to demonstrate
    // the fs.readFile() method

    // Include fs module
    var fs = require('fs');

    // Use fs.readFile() method to read the file
    // const read = fs.readFileSync('demo.json', 'w+');
    // console.log(JSON.stringify(read))



    const open = fs.openSync('demo.json', "a+");

    var buf = new Buffer(1024);


    fs.open('input.txt', 'a+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
    

        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }

            return res.end(bytes.toString());
            // Print only read bytes to avoid junk.

        });
    });


})
// ('demo.txt', 'w+', function (err, f) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(f);
//     console.log("File opened!!");
// });
app.listen(port, () => {
    console.log('running port')
})
// http://rakiblIslam@localhost:5000/
