import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { addAnimal, zooAnimals, jaula5Menor3Kg, felinosJaula2a5, animalJaula4Menor120 } from './data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/add-animal', (req, res) => {
    addAnimal(req.body);
    res.redirect('/');
});

app.get('/data', (req, res) => {
    res.json({
        zooAnimals,
        jaula5Menor3Kg: jaula5Menor3Kg(),
        felinosJaula2a5: felinosJaula2a5(),
        animalJaula4Menor120: animalJaula4Menor120()
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
