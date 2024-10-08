const form = document.querySelector("#form"); // основная форма
form.addEventListener("submit", handleMainForm); 

let styleForm = document.querySelector("#style-block"); // форма для стилизации заголовка элемента
let resetButtons = document.querySelectorAll("button[type='reset']");

resetButtons.forEach((btn) => {
    btn.addEventListener("click", clearFields);
});

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

    // изменить текст и цвет кнопки "Copy"
    copyBtn.forEach((elem) => {
        elem.innerHTML = "Copy";
        elem.style.color = "#858585";
    })

    // вернуть значения полей формы и отображение блока к установленным по умолчанию
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

    //скрыть нижнюю кнопку очистить поля
    document.querySelector("#reset-btn-duplicate").style.display = "none";

}

// * submit (основная форма) --> 
function handleMainForm(e) {
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

        // отобразить форму стилизации заголовка и формы копирования, а также пример использования стилей
        styleForm.style.display = "block"; 
        document.querySelector("#copy-style-block").style.display = "block";
        document.querySelector(".use-example").style.display = "block";

        styleForm.addEventListener("submit", handleStyleForm); 

        // отобразить нижнюю кнопку очистить стили
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

    copyStyleBtn.addEventListener("click", function() {
        let outputStyles = `style="color:${color};text-align:${align};"`;

        navigator.clipboard.writeText(outputStyles);
        copyStyleBtn.innerHTML = "Скопировано!"
        copyStyleBtn.style.color = "#44bc7f";

        // изменение текста кнопки копирования при выборе других свойств
        styleForm.chosenColor.addEventListener("change", resetCopyBtn);
        styleForm.chosenAlign.addEventListener("change", resetCopyBtn);
        
        function resetCopyBtn() {
            copyStyleBtn.innerHTML = "Скопировать стили";
            copyStyleBtn.style.color = "#000000";
        }
    });  

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

// * ФУНКЦИИ

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
    console.log(string);

    let start = `<p style="font-family:courier; font-size:14px;">`;
    let end = `</p>`;

    let stringLeftSymbol = string.replace(/</g, "&lt;");
    let newString = stringLeftSymbol.replace(/>/g, "&gt;");

    let allNewString = `${start}${newString}${end}`;
    return allNewString;
}