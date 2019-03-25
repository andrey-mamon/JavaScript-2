/*Сеть фастфудов предлагает несколько видов гамбургеров:
** - маленький (50 рублей, 20 калорий);**
- большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
** - сыром (+ 10 рублей, + 20 калорий);**
** - салатом (+ 20 рублей, + 5 калорий);**
- картофелем (+ 15 рублей, + 10 калорий).

*Дополнительно гамбургер можно посыпать приправой (+ 15 рублей, 0 калорий) и полить майонезом (+ 20 рублей, + 5 калорий). *

Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Используйте ООП-подход (подсказка: нужен класс Гамбургер, константы, методы для выбора опций и расчета нужных величин).
*/

/* Размеры, виды начинок и добавок */
const SIZE_SMALL = 1;
const SIZE_LARGE = 2;
const STUFFING_CHEESE = 1;
const STUFFING_SALAD = 2;
const STUFFING_POTATO = 3;
const TOPPING_MAYO = 1;
const TOPPING_SPICE = 2;

/**
 * Класс, объекты которого описывают параметры гамбургера. 
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании */
class Hamburger {
    constructor(size, stuffing) {
        this.toppings = [];

        switch (size) {
            case SIZE_SMALL:
                this.price = 50;
                this.calories = 20;
                break;
            case SIZE_LARGE:
                this.price = 100;
                this.calories = 40;
                break;
            default:
                throw new HamburgerException(`Invalid size: ${size}`);
        }
        this.size = size;

        switch (stuffing) {
            case STUFFING_CHEESE:
                this.price += 10;
                this.calories += 20;
                break;
            case STUFFING_SALAD:
                this.price += 20;
                this.calories += 5;
                break;
            case STUFFING_POTATO:
                this.price += 15;
                this.calories += 10;
                break;
            default:
                throw new HamburgerException(`Invalid stuffing: ${stuffing}`);
        }
        this.stuffing = stuffing;
    }

    /**
     * Добавить добавку к гамбургеру. Можно добавить несколько
     * – при условии, что они разные.
     * 
     * @param topping     Тип добавки
     * @throws {HamburgerException}  При неправильном использовании */
    addTopping(topping) {
        switch (topping) {
            case TOPPING_MAYO:
                if (this.toppings.indexOf(TOPPING_MAYO) == -1) {
                    this.toppings.push(TOPPING_MAYO);
                    this.price += 20;
                    this.calories += 5;
                }
                break;
            case TOPPING_SPICE:
                if (this.toppings.indexOf(TOPPING_SPICE) == -1) {
                    this.toppings.push(TOPPING_SPICE);
                    this.price += 15;
                }
                break;
            default:
                throw new HamburgerException(`Invalid topping: ${topping}`);
        }
    }

    /**
     * Убрать добавку – при условии, что она ранее была
     * добавлена.
     * 
     * @param topping   Тип добавки
     * @throws {HamburgerException}  При неправильном использовании  */
    removeTopping(topping) {
        switch (topping) {
            case TOPPING_MAYO:
                if (this.toppings.indexOf(TOPPING_MAYO) >= 0) {
                    this.toppings.splice(this.toppings.indexOf(TOPPING_MAYO));
                    this.price -= 20;
                    this.calories -= 5;
                }
                break;
            case TOPPING_SPICE:
                if (this.toppings.indexOf(TOPPING_SPICE) >= 0) {
                    this.toppings.splice(this.toppings.indexOf(TOPPING_SPICE));
                    this.price -= 15;
                }
                break;
            default:
                throw new HamburgerException(`Invalid topping: ${topping}`);
        }
    }

    /**
     * Получить список добавок.
     *
     * @return {Array} Массив добавленных добавок, содержит константы
     *                 TOPPING_*
     */
    getToppings() {
        return this.toppings;
    }

    /**
     * Узнать размер гамбургера
     */
    getSize() {
        return this.size;
    }

    /**
     * Узнать начинку гамбургера
     */
    getStuffing() {
        return this.stuffing;
    }

    /**
     * Узнать цену гамбургера
     * @return {Number} Цена в тугриках
     */
    calculatePrice() {
        return this.price;
    }

    /**
     * Узнать калорийность
     * @return {Number} Калорийность в калориях  */
    calculateCalories() {
        return this.calories;
    }
}

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером. 
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function HamburgerException(message) {
    this.name = 'HamburgerException';
    this.message = message;
}

//-------------------------------------------

window.onload = function() {
    document.forms[0].onsubmit = function() {
        try {
            const hamburger = new Hamburger(+this.size.value, +this.stuffing.value);
            
            if (this.topping_mayo.checked) {
                hamburger.addTopping(TOPPING_MAYO);
            }
            
            if (this.topping_spice.checked) {
                hamburger.addTopping(TOPPING_SPICE);
            }
            
            document.getElementById('result').innerHTML = `Ваш гамбургер:
                Стоимость ${hamburger.calculatePrice} рублей
                Калорийность ${hamburger.calculateCalories} калорий`
        }
        catch (e) {
            console.error(e.message);
        }
        return false;
    }
}