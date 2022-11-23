const burger = document.querySelector('.js-burger');
const cross = document.querySelector('.js-cross');
const menu = document.querySelector('.js-menu');
const body = document.querySelector('body');

const burgerButton = () => {
    if(burger) {
        burger.addEventListener('click', (event) => {
            event.preventDefault();

                burger.classList.add('header__burger_not-active');
                cross.classList.add('header__cross_active');
                menu.classList.add('header__big_active');
                body.classList.add('lock');
        })

        cross.addEventListener('click', (event) => {
            event.preventDefault();

                burger.classList.remove('header__burger_not-active');
                cross.classList.remove('header__cross_active');
                menu.classList.remove('header__big_active');
                body.classList.remove('lock');
        })
    }
}

const CLASS_LIST = {
    POPUP: 'popup',
    POPUP_ACTIVE: 'popup_active',
    TRIGGER_OPEN: 'js-popup-open',
    TRIGGER_CLOSE: 'js-popup-close',

    CARD: 'js-card',
    BLOCK_NOT_ACTIVE: 'maintenance__block_not',
    PRICE: 'js-price',
    PRICE_ACTIVE: 'maintenance__price_active',
    PRICE_CLOSE: 'js-price-close'
}

document.addEventListener('click', (event) => {

    if(event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
        event.preventDefault();

        const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
        const popupId = target.getAttribute('href').replace('#', '');
        const popup = document.getElementById(popupId);

        document.body.style.overflow = 'hidden';

        popup.classList.add(CLASS_LIST.POPUP_ACTIVE);
        body.classList.add('lock');
    }
    
    if(event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) || event.target.classList.contains(CLASS_LIST.POPUP_ACTIVE)) {
        event.preventDefault();

        const popup = event.target.closest(`.${CLASS_LIST.POPUP}`);

        document.body.style.overflow = 'scroll';

        popup.classList.remove(CLASS_LIST.POPUP_ACTIVE);
        body.classList.remove('lock');
    }
})

document.addEventListener('click', (event) => {
    const block = document.querySelector('.maintenance__block')
    const link = document.querySelector('.js__link');

    if(event.target.closest(`.${CLASS_LIST.CARD}`)) {
        event.preventDefault();

        const target = event.target.closest(`.${CLASS_LIST.CARD}`);
        const tableId = target.getAttribute('href').replace('#', '');
        const table = document.getElementById(tableId);
        

        table.classList.add(CLASS_LIST.PRICE_ACTIVE);
        block.classList.add(CLASS_LIST.BLOCK_NOT_ACTIVE);
        link.classList.add('maintenance__link_not');
    }
    
    if(event.target.closest(`.${CLASS_LIST.PRICE_CLOSE}`)) {
        event.preventDefault();

        const table = event.target.closest(`.${CLASS_LIST.PRICE}`);

        table.classList.remove(CLASS_LIST.PRICE_ACTIVE);
        block.classList.remove(CLASS_LIST.BLOCK_NOT_ACTIVE);
        link.classList.remove('maintenance__link_not');
    }
})

//Маска для телефона
const tel = document.querySelectorAll('.js-tel');

window.addEventListener("DOMContentLoaded", () => {
    [].forEach.call(tel, (input) => {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        const pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, (a) => {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substring(0, this.value.length).replace(/_+/g,
            (a) => {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
    });
});

burgerButton();