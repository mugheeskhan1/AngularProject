export class Ingredient {
    // Method 1 :-
    // public name: string;
    // public amount: number;

    // constructor(name: string, amount: number) {
    //     this.name = name;
    //     this.amount = amount;
    // }

    // Method 2:-
    constructor(public name: string, public amount: number) { }
}