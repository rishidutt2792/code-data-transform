const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.port || 8000;
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));


const transformController = require('./transformController');


app.post('/transform', (req, res) => {
    const body = req.body
    try {
        const result = transformController.filterData(body);
        console.log('inside', body)
        res.status(200).json({
            status: true,
            data: result
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Error parsing data'
        })
    }
})



app.listen(port, (err) => {
    if (err) console.log('Error starting server ', err);
    else console.log(`Node Server running on the port: ${port}`);
})
