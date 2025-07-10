import { CZooAnimal } from './CZooAnimal.js';

export const zooAnimals = [];

export function addAnimal(data) {
    const animal = new CZooAnimal(
        zooAnimals.length + 1,
        data.nombre,
        parseInt(data.JaulaNumero),
        parseInt(data.IdTypeAnimal),
        parseFloat(data.peso)
    );
    zooAnimals.push(animal);
}

export function jaula5Menor3Kg() {
    return zooAnimals.filter(a => a.JaulaNumero === 5 && a.peso < 3).length;
}

export function felinosJaula2a5() {
    return zooAnimals.filter(a => a.IdTypeAnimal === 1 && a.JaulaNumero >= 2 && a.JaulaNumero <= 5).length;
}

export function animalJaula4Menor120() {
    const res = zooAnimals.find(a => a.JaulaNumero === 4 && a.peso < 120);
    return res ? res.nombre : "Ninguno";
}
