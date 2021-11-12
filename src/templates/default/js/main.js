import $ from "jquery";

// Блокируем зум экрана на IOS
document.addEventListener(
    'touchmove',
    function(event) {
        event = event.originalEvent || event;

        if (event.scale !== 1) {
            event.preventDefault();
        }
    },
    false
);

window.IS_DEBUGGING = true;

window.validatePhone = phone => {
    let regular = /^(\+7)?(\d{3}?)?[\d]{11}$/;
    return regular.test(phone);
};

// В суперглобальной переменной храним все дынные, введенные пользователем
window.STATE = {
    connect: "WhatsApp",
};

// С помощью проксирования слушаем изменение стэйта
STATE = new Proxy(STATE, {
    set: function (target, prop, val) {

        target[prop] = val;

        /*
         * Если в стейте меняется телефон, то сразу меняем
         * телефон во всех полях ввода телефона.
         */
        if (prop === 'phone') {
            for (let i = 0; i < PHONE_MASKS.length; i++) {
                PHONE_MASKS[i].unmaskedValue = val;
            }
        }


        if (IS_DEBUGGING) {
            setTimeout(() => console.log(target), 100);
        }

        return true;
    }
});

// Маски для всех телефонов сохраняем в отдельный суперглобальный массив
const PHONE_MASKS = [];

// Маска для телефона. Испльзуется во всех телефонах
const phoneMaskOptions = {
    mask: '+{7} ({9}00) 000-00-00',
    lazy: true,
    placeholderChar: '_'
};

$(document).ready(function () {
    console.log($('#header'))
});