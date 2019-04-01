/*1. Дан большой текст, в котором для обозначения диалогов используются одинарные кавычки. Придумать шаблон, который меняет одинарные кавычки на двойные.*/

const inputText = `— 'Здорово! Большое Вам спасибо! А Вы наверно этим занимаетесь?'
— 'Да не за что! Нет, совсем нет… Я юрист!'
— 'То есть если что к Вам еще и за юридической консультацией можно'
— 'Да почему нет! - и для примера aren't'
— 'Отлично! Меня Михаил зовут кстати…'`

const $inputString1 = document.getElementById('task1');
$inputString1.innerText += ` ${inputText}`;

const $outputString1 = document.getElementById('result1');
$outputString1.innerText += ` ${inputText.replace(/'/g, '"')}`;

/*2. Улучшить шаблон таким образом, чтобы конструкции типа aren’t не меняли одинарную кавычку на двойную.*/

const $inputString2 = document.getElementById('task2');
$inputString2.innerText += ` ${inputText}`;

const $outputString2 = document.getElementById('result2');
$outputString2.innerText += ` ${inputText.replace(/('\B|\B')/g, '"')}`;

/*3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:

- Имя содержит только буквы;

** - Телефон подчиняется шаблону +7(000)000-0000;**

** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**

** - Текст произвольный;**
** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой и сообщать пользователю об ошибке.***/

const validation = {
    name: /^[a-zA-Zа-яА-Я]+$/,
    phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
    email: /^[.-_a-z0-9]+@([a-z0-9]+\.)+[a-z]{2,6}$/i
};

document.getElementById('error-text').innerText = '';

document.getElementById('submit').addEventListener('click', event => {
    let correctResult = true;

    Object.keys(validation).forEach(rule => {
        const fields = document.querySelectorAll(`[data-validator=${rule}]`);
        fields.forEach(field => {
            if (validation[rule].test(field.value)) {
                field.classList.remove('invalid');
            } else {
                field.classList.add('invalid');
                correctResult = false;
            }
        })
    });

    if (correctResult) {
        document.getElementById('error-text').innerText = '';
        alert("Ваше сообщение успешно отправлено");
    } else {
        document.getElementById('error-text').innerText = 'Внимание! Проверьте правильность заполнения полей';
    }

    event.preventDefault();
});