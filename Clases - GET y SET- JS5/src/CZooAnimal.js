export class CZooAnimal {
    constructor(IdAnimal, nombre, JaulaNumero, IdTypeAnimal, peso) {
        this.IdAnimal = IdAnimal;
        this.nombre = nombre;
        this.JaulaNumero = JaulaNumero;
        this.IdTypeAnimal = IdTypeAnimal; // 1: felino, 2: ave, 3: reptil, etc.
        this.peso = peso;
    }
}
