const form = document.querySelector("#form"); // основная форма
form.addEventListener("submit", handleMainForm); 

let styleForm = document.querySelector("#style-block"); // форма для стилизации заголовка элемента
let resetButtons = document.querySelectorAll("button[type='reset']");

resetButtons.forEach( (btn) => btn.addEventListener("click", clearFields) );

// * reset -->
function clearFields() {
    // очистить все поля ввода
    form.idStr.value = ''; 
    form.textLink.value = '';
    form.blockTag.value = '';

    // очистить все блоки вывода
    document.querySelector(".warning").innerHTML = "";
    document.querySelector("#outputMainLink").innerHTML = "";
    document.querySelector("#outputMainLinkCode").innerHTML = "";
    document.querySelector("#outputSectionElem").innerHTML = "";
    document.querySelector("#outputSectionElemCode").innerHTML = "";

    // изменить текст и цвет кнопки "Скопировать"
    copyBtn.forEach( (elem) => {
        elem.innerHTML = "Скопировать";
        elem.style.color = "#858585";
    } );

    // вернуть значения полей формы стилизации и отображение блока к установленным по умолчанию
    styleForm.chosenColor.value = "#000000";
    styleForm.chosenAlign.value = "left";
    document.querySelector("#outputSectionElem").style.color = "#000000";
    document.querySelector("#outputSectionElem").style.textAlign = "left";

    // изменить текст кнопки копирования, заблокировать ее
    document.querySelector("#copy-style-btn").innerHTML = "Скопировать стили";
    document.querySelector("#copy-style-btn").style.color = "#000000";
    document.querySelector("#copy-style-btn").setAttribute("disabled", "");

    // скрыть форму стилизации и пример использования стилей 
    styleForm.style.display = "none"; 
    document.querySelector("#copy-style-block").style.display = "none";
    document.querySelector(".use-example").style.display = "none";

    //скрыть нижнюю кнопку "Очистить поля"
    document.querySelector("#reset-btn-duplicate").style.display = "none";
}

// * submit (основная форма) --> 
function handleMainForm(e) {
    e.preventDefault();
    document.querySelector(".warning").innerHTML = "";

    // --- Получение данных из формы
    let idStr = form.idStr.value; // данные для ссылки в главном меню
    let textLink = form.textLink.value;
    let blockTag = form.blockTag.value || `h2`; // данные для раздела/секции

    if (idStr && textLink && blockTag) {
        // как отображается основная ссылка на странице
        let outputMainLink = makeMainLink(idStr, textLink);
        document.querySelector("#outputMainLink").innerHTML = outputMainLink;

        // код для основной ссылки
        let outputMainLinkCode = makeCodeBlock(outputMainLink);
        document.querySelector("#outputMainLinkCode").innerHTML = outputMainLinkCode;

        // как отображается заголовок в блоке/секции
        let outputSectionElem = makeSectionElem(idStr, textLink, blockTag);
        document.querySelector("#outputSectionElem").innerHTML = outputSectionElem;

        // код для блока/секции
        let outputSectionElemCode = makeCodeBlock(outputSectionElem);
        document.querySelector("#outputSectionElemCode").innerHTML = outputSectionElemCode;

        // отобразить форму стилизации заголовка и формы копирования, 
        // а также пример использования стилей
        styleForm.style.display = "block"; 
        document.querySelector("#copy-style-block").style.display = "block";
        document.querySelector(".use-example").style.display = "block";

        styleForm.addEventListener("submit", handleStyleForm); 

        // отобразить нижнюю кнопку "Очистить стили"
        document.querySelector("#reset-btn-duplicate").style.display = "block";

    } else {
        document.querySelector(".warning").innerHTML = "Введите необходимые данные";
    }
}

// * submit (форма стилизации) -->
function handleStyleForm(e) {
    e.preventDefault();

    // получение данных формы стилизации
    let color = styleForm.chosenColor.value;
    let align = styleForm.chosenAlign.value;

    // применение стилизации к отображению заголовка блока
    outputSectionElem.style.color = color; 
    outputSectionElem.style.textAlign = align;

    // * при клике на кнопку копирования стилей -->
    let copyStyleBtn = document.querySelector("#copy-style-btn");
    copyStyleBtn.removeAttribute("disabled"); // "разблокировка" кнопки
    copyStyleBtn.addEventListener("click", function() { copyStyles(color, align) });
}

// Функция копирования стилей при клике на кнопку
function copyStyles(color, align) {
    let copyStyleBtn = document.querySelector("#copy-style-btn");
    let outputStyles = `style="color:${color};text-align:${align};"`;

    copyString(copyStyleBtn, outputStyles);

    // изменение текста кнопки копирования при выборе других свойств
    styleForm.chosenColor.addEventListener("change", resetCopyBtn);
    styleForm.chosenAlign.addEventListener("change", resetCopyBtn);
}  

// Функция сброса текста и цвета на кнопке копирования
function resetCopyBtn() {
    let copyStyleBtn = document.querySelector("#copy-style-btn");
    copyStyleBtn.innerHTML = "Скопировать стили";
    copyStyleBtn.style.color = "#000000";
}

// * Копирование кода при клике на кнопку Copy
const copyBtn = document.querySelectorAll('.copy-btn');
copyBtn.forEach( (elem, index) => {
    elem.addEventListener('click', function () {
        let className = '.display-code' + index;
        let code = document.querySelector(className).innerHTML;

        if (code !== "") {
            copyString(elem, code);
        }
    } );
} );

function copyString(element, strToCopy) {
    navigator.clipboard.writeText(strToCopy);
    element.innerHTML = "Скопировано";
    element.style.color = "#44bc7f";
}

// * ФУНКЦИИ построения ссылок, заголовка и тстроки кода

// Функция построения основной ссылки
function makeMainLink(id, text) {
    return `<a href="#${id}">${text}</a> <br>`;
}

// Функция построения кода заголовка блока/секции
function makeSectionElem(id, text, tag) {
    return `<${tag} id="${id}">${text}</${tag}>`;
}

// Функция построения блока с тегами и замененными символами < и > 
// принимает строку непреобразованного кода
function makeCodeBlock(string) {
    //console.log(string);

    let start = `<p style="font-family:courier; font-size:14px;">`;
    let end = `</p>`;

    let stringLeftSymbol = string.replace(/</g, "&lt;");
    let newString = stringLeftSymbol.replace(/>/g, "&gt;");

    let allNewString = `${start}${newString}${end}`;
    return allNewString;
}