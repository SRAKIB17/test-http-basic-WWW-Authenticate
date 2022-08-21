const express = require('express');

const port = process.env.PORT || 5000;
var fs = require('fs');


const app = express()
app.use(express.json())




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

app.get('/fs', async (req, res) => {
    fs.open('db.json', 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        const data = {
            name: "rakib",
        }

        fs.read(fd, (err, length, d) => {

            fs.write(fd, "," + JSON.stringify(data) + ']', length - 1, (err, date, mData) => {
                // console.log(date)
                // console.log(mData)
            })
            console.log(d.toString())
            return res.send(d?.toString());
        })


    })
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
