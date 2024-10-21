import express from 'express';
import cors from 'cors';
import { getServicesList, getService } from './database.js';

const app = express();
app.use(cors({
    origin: ['http://localhost:3306', 'http://localhost:8080']
}));


// READ service list 
app.get("/services", async (req, res) => {
    getServicesList()
        .then(services => res.send(services))
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ service by id
app.get("/services/:id", async (req, res) => {
    const id = req.params.id;
    getService(id)
        .then(service => res.send(service))
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong.')
});

// Listen for request
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});