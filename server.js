const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');
const app = express();
const port = process.env.NODE_ENV_PORT || 3000;
app.use(cors());

app.get('/api/search', async (req,res) => {
    const {q} = req.query;
    const url = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="+q;

    await fetch(
        url,
        {
            headers: {
                'Content-Type': 'applications/json',
                'Access-Control-Allow-Origin': '*',
            }
        }
    ).then(
        response => {
            if(!response.ok){
                throw new Error('Network Error');
            }
            return response.json();
        }
    ).then(
        data => {
            console.log(data);
            res.json(data);
        }
    ).catch(
        error => {
            console.error(error);
            res.status(500).send('An error occured');
        }
    )
    

});

app.get('/', (req,res) => {
    res.json({
        "test": "Welcome to Youtube!"
    })
});

app.listen(
    port, () => {
        console.log('Server is listening on port ${port}');
    }
)