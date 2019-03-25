// класс товара
class Item {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    // отрисовать товар
    render() {
        return `<div class="products-item">
            <img src=${this.image} class="product-image" alt="product image">
            <h2>${this.name}</h2>
            <span>${this.price}</span>
        </div>`
    }
}

// класс списка товаров - каталога товаров
class ItemsList {
    constructor() {
        this.items = [];
    }

    // получить каталог товаров
    fetchItems() {
        this.items = [
            {
                id: 1,
                name: 'Shirt',
                price: 150,
                image: 'img/product1.jpg'
            },
            {
                id: 2,
                name: 'Socks',
                price: 50,
                image: 'img/product2.jpg'
            },
            {
                id: 3,
                name: 'Jacket',
                price: 350,
                image: 'img/product3.jpg'
            },
            {
                id: 4,
                name: 'Shoes',
                price: 250,
                image: 'img/product4.jpg'
            },
        ];

        this.items = this.items.map(item => new Item(item.id, item.name, item.price, item.image)); // массив состоящий из экземпляров класса Item
    }

    // посчитать сумму товаров каталога
    getItemsPrice() {
        let itemsPrice = 0;

        this.items.forEach(item => itemsPrice += item.price);
        return itemsPrice;
    }

    // отрисовать каталог товаров
    render() {
        const itemsHtmls = this.items.map(item => item.render());
        return itemsHtmls.join('');
    }
}

// класс товар Корзины расширяет класс товар
class CartItem extends Item {
    constructor(id, name, price, image, quantity) {
        super(id, name, price, image);

        this.quantity = quantity;
    }

    // установить количество товара
    setQuantity() {
        //...
    }

    // удалить товар из Корзины
    remove() {
        //...
    }

    // отрисовать товар Корзины
    render() {
        //...
    }
}

// класс Корзина
class Cart {
    constructor() {
        this.items = [];
    }

    // посчитать количество товаров в Корзине
    getItemsCount() {
        //...
    }

    // посчитать суммарную стоимость товаров в Корзине
    getItemsPrice() {
        //...
    }
    
    // очистить Корзину
    clearAll() {
        //...
    }

    // отрисовать Корзину
    render() {
        //...
    }
}

// main script
const items = new ItemsList();
items.fetchItems();

document.querySelector('.goods').innerHTML = items.render();

console.log(`Сумма каталога: ${items.getItemsPrice()} рублей`);