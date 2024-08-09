const form = document.querySelector("#form");
form.addEventListener("submit", handleForm);

// * reset -->
form.addEventListener("reset", function () {
    document.querySelector(".warning").innerHTML = "";
    document.querySelector("#outputMainLink").innerHTML = "";
    document.querySelector("#outputMainLinkCode").innerHTML = "";
    document.querySelector("#outputSectionElem").innerHTML = "";
    document.querySelector("#outputSectionElemCode").innerHTML = "";

    copyBtn.forEach((elem) => {
        elem.innerHTML = "Copy";
        elem.style.color = "#858585";
    })

});

// * submit -->
function handleForm(e) {
    e.preventDefault();
    document.querySelector(".warning").innerHTML = "";

    // --- Получение данных из формы
    let idStr = form.idStr.value; // данные для ссылки в главном меню
    let textLink = form.textLink.value;
    let blockTag = form.blockTag.value || `h2`; // данные для раздела/секции, связанного со ссылкой-якорем

    if (idStr && textLink && blockTag) {
        // как отображается основная ссылка на странице
        let outputMainLink = displayMainLink(idStr, textLink); //вызов функции
        document.querySelector("#outputMainLink").innerHTML = outputMainLink;
        //console.log(`Основная ссылка: ${outputMainLink}`);

        // Код для основной ссылки
        let outputMainLinkCode = displayStr(outputMainLink); //вызов функции
        document.querySelector("#outputMainLinkCode").innerHTML = outputMainLinkCode;
         //console.log(`Код основной ссылки: ${outputMainLinkCode}`);

        // как отображается заголовок в блоке/секции
        let outputSectionElem = displaySectionElem(idStr, textLink, blockTag); //вызов функции
        document.querySelector("#outputSectionElem").innerHTML = outputSectionElem;
        //console.log(`Блок/секция: ${outputSectionElem}`);

        // Код для блока/секции
        let outputSectionElemCode = displayStr(outputSectionElem); //вызов функции
        document.querySelector("#outputSectionElemCode").innerHTML = outputSectionElemCode;

    } else {
        document.querySelector(".warning").innerHTML = "Введите необходимые данные";
    }
}

// * Копирование кода при клике на кнопку Copy
const copyBtn = document.querySelectorAll('.copy-btn'); // все кнопки Copy

//перебрать кнопки
copyBtn.forEach((elem, index) => {
    elem.addEventListener('click', function () {
        let className = '.display-code' + index;
        //console.log(className);
        let code = document.querySelector(className).innerHTML;
        //console.log(code);

        if (code !== "") {
            navigator.clipboard.writeText(code); // копирование
            elem.innerHTML = "Copied";
            elem.style.color = "#44bc7f";
        }
    })

})

// ФУНКЦИИ

// Функция построения основной ссылки
function displayMainLink(id, text) {
    return `<a href="#${id}">${text}</a> <br>`;
}

// Функция для добавления элемента в код блока/секции
function displaySectionElem(id, text, tag) {
    return `<${tag} id="${id}">${text}</${tag}>`;
}

//  -- Функция, позволяющая получить строку с тегами и замененными символами < и > и отобразить ее на странице браузера
// принимает строку непреобразованного кода
function displayStr(string) {
    let start = `<p style="font-family:courier; font-size:14px;">`;
    let end = `</p>`;

    let stringLeftSymbol = string.replace(/</g, "&lt;");
    let newString = stringLeftSymbol.replace(/>/g, "&gt;");

    let allNewString = `${start}${newString}${end}`;
    return allNewString;
}