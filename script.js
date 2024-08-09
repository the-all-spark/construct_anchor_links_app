const form = document.querySelector("#form");
form.addEventListener("submit", handleForm);

// reset -->
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

// submit -->
function handleForm(e) {
    e.preventDefault();
    document.querySelector(".warning").innerHTML = "";

    // --- Получение данных из формы
    let idStr = form.idStr.value; // данные для ссылки в главном меню
    let textLink = form.textLink.value;
    let blockTag = form.blockTag.value || `h2`; // данные для раздела/секции, связанного со ссылкой-якорем

    if (idStr && textLink && blockTag) {
        // основная ссылка (как будет отображаться на странице)
        let outputMainLink = displayMainLink(idStr, textLink); //вызов функции
        //console.log(`Основная ссылка: ${outputMainLink}`);
        document.querySelector("#outputMainLink").innerHTML = outputMainLink;

        // Код для основной ссылки
        let outputMainLinkCode = displayStr(outputMainLink); //вызов функции
        //console.log(`Код основной ссылки: ${outputMainLinkCode}`);
        document.querySelector("#outputMainLinkCode").innerHTML = outputMainLinkCode;

        // как отображается заголовок в блоке/секции
        let outputSectionElem = displaySectionElem(idStr, textLink, blockTag);
        //console.log(`Блок/секция: ${outputSectionElem}`);
        document.querySelector("#outputSectionElem").innerHTML = outputSectionElem;

        // Код для блок/секция
        let outputSectionElemCode = displayStr(outputSectionElem); //вызов функции
        document.querySelector("#outputSectionElemCode").innerHTML = outputSectionElemCode;

    } else {
        document.querySelector(".warning").innerHTML = "Введите необходимые данные";
    }

}

// Копирование кода
const copyBtn = document.querySelectorAll('.copy-btn'); // все кнопки

//перебрать кнопки
copyBtn.forEach((elem, index) => {
    elem.addEventListener('click', function () {
        let className = '.display-code' + index;
        console.log(className);
        let code = document.querySelector(className).innerHTML;
        console.log(code);

        if (code !== "") {
            navigator.clipboard.writeText(code);
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

// Функция для добавления в код блока/секции
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