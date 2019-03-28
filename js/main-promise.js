function sendRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE) {
            resolve(JSON.parse(xhr.responseText));
            }
        }

        xhr.onerror = () => {
            reject(new Error("Network Error"));
        }
    });
}

const API_URL = 'http://localhost:3000';

// класс товара
class Item {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    // вывести товар
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
        sendRequest(`${API_URL}/products.json`)
            .then(
                items =>
                    this.items = items.map(item => new Item(item.id, item.name, item.price, item.image)),
                error => alert(`Rejected: ${error}`)
            )
            .then(
                items => {
                    document.querySelector('.goods').innerHTML = this.items.map(item => item.render()).join('')
                }
            );
    }

    // посчитать сумму товаров каталога
    total() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }

    // вывести каталог товаров
    render() {
        const itemsHtml = this.items.map(item => item.render());
        return itemsHtml.join('');
    }
}

// класс товар Корзины расширяет класс товар
class CartItem extends Item {
    constructor(id, name, price, image, quantity) {
        super(id, name, price, image);

        this.quantity = quantity;
    }

    // вывести товар Корзины
    render() {
        //...
    }
}

// класс Корзина
class Cart {
    constructor() {
        this.items = [];
    }

    // добавить товар в корзину
    add(item) {
        for (let key in this.items) {
            if (this.items[key].id == item.id) {
                this.items[key].quantity++;
                return;
            }
        }
        item.quantity = 1;
        this.items.push(item);
    }

    // удалить товар из Корзины
    remove(productId) {
        this.items = this.items.filter(item => item.id != productId);
    }

    // получить список товаров корзины
    getCart(){
        return this.items
    }

    // посчитать количество товаров в Корзине
    totalCount() {
        //...
    }

    // посчитать суммарную стоимость товаров в Корзине
    total() {
        return this.items.reduce((acc, item) => acc + item.price, 0);
    }
    
    // очистить Корзину
    clearAll() {
        //...
    }

    // вывести Корзину
    render() {
        //...
    }
}

// main script
const items = new ItemsList();
items.fetchItems();

document.querySelector('.goods').innerHTML = items.render();

console.log(`Сумма каталога: ${items.total()} рублей`);