
export class Product {
    constructor(id, name, brand, price, color, size) {
       this.id = id;
       this.name = name;
       this.brand = brand;
       this.price = price;
       this.options = [
           { color: color },
           { size: size },
       ];
    }
}