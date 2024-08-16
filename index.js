import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index.ejs', { data: null });
});

app.post('/search', async (req, res) => {
    const jobQuery = req.body.job;

    if (jobQuery) {
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
                query: jobQuery,
                page: '1',
                num_pages: '1',
                date_posted: 'all'
            },
            headers: {
                'x-rapidapi-key': 'e2bf2d2a96mshf2dff63809bb0e1p1d2f7ajsn507461a16737',
                'x-rapidapi-host': 'jsearch.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const jobData = response.data.data;
            res.render('index.ejs', { data: jobData });
        } catch (error) {
            console.error(error);
            res.render('index.ejs', { data: null });
        }
    } else {
        res.render('index.ejs', { data: null });
    }
});

app.listen(port, () => {
    console.log("Running on port " + port);
});
