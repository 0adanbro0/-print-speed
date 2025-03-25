// Получаем элементы из DOM
let introduced_txt = document.getElementById('introduced_txt'); // Элемент для введенного текста
let true_txt = document.getElementById('true_txt'); // Элемент для правильного текста
let menu = document.getElementById('menu'); // Элемент меню
let game = document.getElementById('game'); // Элемент игры
let timer_html = document.getElementById('timer_html'); // Элемент для отображения таймера
game.style.display = 'none'; // Скрываем элемент игры изначально

let timer = 0; // Переменная для отслеживания времени
let counter_keys = 0; // Счетчик введенных клавиш
let counter_seconds = 9000; // Переменная для хранения времени в секундах

let start_not_endless = false; // Флаг для отслеживания начала игры

let Timer; // Переменная для хранения идентификатора таймера
let string_true_txt; // Переменная для хранения правильного текста

// Скрываем элементы с индексами 0 и 1
for(let i = 0; i <= 1; i++) {
    document.getElementById(i).style.display = 'none'; // Скрываем элементы
}

// Инициализация счетчика и массивов
let counter_lan = 0; // Счетчик языка
let counter = -1; // Счетчик для отслеживания введенных символов



let array_level = [ // Массив уровней с текстами

    // Русский
    [
        // Легко
        ['Однажды я спускался к морю и увидел маленького пингвинёнка. У него ещё только выросли три пушинки на голове и коротенький хвостик. Он смотрел, как взрослые пингвины купаются. Остальные птенцы стояли у нагретых солнцем камней. Долго стоял на скале пингвинёнок: страшно ему было броситься в море. Наконец он решился и подошёл к краю скалы. Маленький голый пингвинёнок стоял на высоте трёхэтажного дома. Его сносил ветер. От страха пингвинёнок закрыл глаза и… бросился вниз. Вынырнул, закружился на одном месте, быстро вскарабкался на камни и удивлённо посмотрел на море. Это был самый отважный пингвинёнок. Он первый искупался в холодном зелёном море.'],

        // Средне
        ['Знаешь, что надо делать с бабушкой? Надо любить, понимать и прощать. Она- то сколько прощает тебе? Терпеть- это близкий человек. Опекать, беречь. Пусть она считает тебя маленьким и беспомощным, ты-то знаешь, что во многом сильнее её, здоровей, шустрей.  Нет, не за то, что «она тебе жизнь отдаёт». Просто потому, что бабушке твоей осталось жить меньше, чем тебе, и потому что старость- довольно тяжкое и печальное время жизни. Всё своё, личное, у нее позади- забота, радости, тревоги, интересная жизнь, надежды. И только ты-  ее единственная забота, ее последняя радость, ее постоянная  тревога, ее основной жизненный интерес, ее тайная надежда.'],

        // Сложно
        ['Любимая сказка Любы - "Гадкий утёнок". Она перечитывает её часто-часто и всегда плачет над всеми бедами утёнка и особенно плачет в конце сказки, когда он превращается в прекрасного лебедя... Нет, такого счастья с ней не случится… Среди всех ребят Люба особенно любила Люсю Петрову. Это была не девочка, а чудо... Но Люся не понимала Любиного восхищения… А когда однажды Люба ошиблась во время игры в мяч, Люся вообще разозлилась и стала грубо обзывать Любу. И все ребята присоединились к ней… Но вот уже неделю Люба не встречалась с Люсей. За ужином мама сказала, что Люся заболела… Во дворе и без Люси всё так же весело играли ребята. А Люба постоянно думала о том, как лежит бедная Люся одна в своей комнате. И вот однажды она решилась и, взяв с собой свои любимые книги, позвонила в квартиру № 27. Дверь открыла Люсина бабушка и очень обрадовалась. Проходи, деточка, проходи, – сказала она, фартуком промокнула глаза, – а то никто к ней не зайдет". Когда Люба вошла, Люся подвинулась и показала на кровать, садись, мол, рядом со мной. Целый вечер Люба рассказывала о том, что в последнее время происходило во дворе…']
    ],
    // Английский
    [
        // Легко
        ['Jane is an English girl. She lives in the country. Jane has three pets. She likes them very much. They are cats. Their names are Snowy, Smoky, and Tiger. One is white, one is black, and one is black and white.'],
        
        // Средне
        ['I am 7 years old. My name is Masha. Every day I wake up at 7 a.m. and go to the bathroom. I brush my teeth, brush my hair and go to have some breakfast. My mother is a chef, so she cooks very well. My father is a doctor. He usually reads a paper in the morning. We have a cat. Its name is Bars. We are a small and happy family.'],
        
        // Сложно
        ['The Bayeux Tapestry (also known in France as a Tapestry of Queen Matilda) is a unique medieval artifact that dates back to the 11th century. Nearly 70 metres of embroidered cloth expand on the events that led up to the Norman conquest of England, culminating with the fateful Battle of Hastings. Technically not a tapestry (as tapestries are woven, not embroidered), this exquisite piece of cloth shows about 70 historical scenes and is narrated with Latin tituli. Its origins and the history of creation are still hotly debated in scholarly circles, but the two main theories give the credit either to the Queen Matilda of Flanders who was a wife of William the Conqueror, or to a bishop Odo of Bayeux, who was William’s half-brother and eventually became a regent of England in his absence.']
    ]
];

let counter_sec2 = 0

let array_true_txt = []; // Массив для хранения правильных символов
let array_introduced_txt = []; // Массив для хранения введенных символов

let lan = 0; // Переменная для хранения выбранного языка
let level = 0; // Переменная для хранения уровня

// Создание зеленого блока
let errorBlock = document.createElement('div'); // Создаем новый элемент div
errorBlock.style.opacity = '0.5'; // Устанавливаем прозрачность блока
errorBlock.style.width = '7px'; // Ширина блока
errorBlock.style.height = '20px'; // Высота блока
errorBlock.style.backgroundColor = 'green'; // Цвет блока
errorBlock.style.position = 'absolute'; // Позиционирование
errorBlock.style.transition = 'left 0.1s, top 0.1s'; // Плавное перемещение
errorBlock.style.display = 'none'; // Скрываем блок изначально
document.body.appendChild(errorBlock); // Добавляем блок в DOM

function counter_sec2Func() {
    counter_sec2 += 1;
    console.log('abc')
}

// Функция для выбора типа игры
function Select_type_game(num) {


    counter_seconds = num; // Устанавливаем количество секунд

    if(counter_seconds == 9000) {

        alert(`вы выбрали режим бесконечности`); // Уведомление о выборе режима бесконечности
    
    } else {

        alert(`вы выбрали режим ${counter_seconds} секунд`); // Уведомление о выбранном времени
    
    }


}

// Функция для перезагрузки страницы
function Back() {

    location.reload(); // Перезагрузка страницы
    clearInterval(Timer); // Остановка таймера

}

// Функция для выбора языка
function Select_lang(num) {


    lan = num; // Устанавливаем выбранный язык
    counter_lan = lan; // Обновляем счетчик языка

    document.getElementById(lan).style.display = 'block'; // Показываем выбранный язык

    // Скрываем другой язык
    if(counter_lan == 0) {

        document.getElementById(1).style.display = 'none'; // Скрываем английский

    } 
    else if(counter_lan == 1) {

        document.getElementById(0).style.display = 'none'; // Скрываем русский

    }

    console.log(`выбранный язык - ${lan}`); // Логируем выбранный язык


}

// Функция для создания правильного текста из массива
function CreateTrueTxtFromArray(num) {


    level = num; // Устанавливаем уровень

    menu.style.display = 'none'; // Скрываем меню
    game.style.display = 'block'; // Показываем игру

    // Запускаем таймер
    Timer = setInterval(() => {

        setInterval(counter_sec2Func, 1000)


        if(counter_seconds == 9000) {


            if(timer >= counter_seconds) {

                clearInterval(Timer); // Останавливаем таймер

                timer_html.innerHTML = 'Time\'s up!'; // Уведомление о завершении времени
                alert(`ты чертовски медленный бро`); // Уведомление о медленном вводе

                location.reload(); // Перезагрузка страницы

            } 
            else {

                timer++; // Увеличиваем таймер
                timer_html.innerHTML = timer; // Обновляем отображение таймера

            }


        } 
        else {


            if(start_not_endless == false) {

                timer = counter_seconds; // Устанавливаем таймер на заданное количество секунд
                timer_html.innerHTML = timer; // Обновляем отображение таймера

                start_not_endless = true; // Устанавливаем флаг, что игра началась

            } 
            else {

                console.log('all is good'); // Логируем, что все в порядке

            }



            if(timer == 0) {

                clearInterval(Timer); // Останавливаем таймер

                timer_html.innerHTML = 'Time\'s up!'; // Уведомление о завершении времени
                alert(`${counter_seconds} секунд прошло, вы ввели: ${counter_keys} символов из ${array_true_txt.length}`); // Уведомление о завершении игры

                location.reload(); // Перезагрузка страницы

            } 
            else {

                timer = timer - 1; // Уменьшаем таймер на 1
                timer_html.innerHTML = timer; // Обновляем отображение таймера

            }


        }
    }, 1000); // Интервал в 1 секунду

    // Исходный текст, который будет использоваться
    string_true_txt = array_level[lan][level][0]; // Получаем правильный текст

    // Устанавливаем текст в элемент true_txt
    true_txt.innerHTML = string_true_txt; // Обновляем отображение правильного текста

    // Вызов функции инициализации текста
    CreateTrueTxt(); // Инициализация текста


}

// Функция для инициализации текста и его преобразования в массив символов
function CreateTrueTxt() {


    for (let i = 0; i < string_true_txt.length; i++) {

        array_true_txt.push(string_true_txt[i]); // Добавляем каждый символ в массив

    }
    
    console.log(array_true_txt); // Логируем массив правильных символов
    console.log(`текст инициализирован, длина текста: ${array_true_txt.length} символ/а/ов`); // Логируем длину текста


}

// Функция для отображения правильных символов
function PaintTrueWords() {


    true_txt.innerHTML = ''; // Очищаем содержимое элемента

    for (let i = 0; i < array_true_txt.length; i++) {

        let span = document.createElement('span'); // Создаем новый элемент span
        span.innerText = array_true_txt[i]; // Устанавливаем текст

        // Меняем цвет на зеленый для правильных символов
        if (i <= counter) {

            span.style.color = 'green'; // Устанавливаем цвет для правильных символов

        }
        
        true_txt.appendChild(span); // Добавляем span в true_txt
    }


}

// Функция для перемещения зеленого блока
function moveErrorBlock(index) {


    const spanElements = true_txt.getElementsByTagName('span'); // Получаем все элементы span

    if (spanElements[index]) {

        const rect = spanElements[index].getBoundingClientRect(); // Получаем координаты элемента

        errorBlock.style.display = 'block'; // Показываем зеленый блок
        errorBlock.style.left = `${rect.left + window.scrollX}px`; // Устанавливаем позицию по оси X
        errorBlock.style.top = `${rect.top + window.scrollY}px`; // Устанавливаем позицию по оси Y

    }


}

// Функция для обработки нажатия клавиши
function logKey(event) {


    if (event.key == 'Alt') {

        console.log('Alt'); // Логируем нажатие клавиши Alt

    } 
    else if (event.key == 'Shift') {

        console.log('Shift'); // Логируем нажатие клавиши Shift

    } 
    else {

        counter++; // Увеличиваем счетчик

        // Добавляем элемент в массив для дальнейшей работы
        array_introduced_txt.push(event.key); // Добавляем введенный символ в массив
        console.log(array_introduced_txt); // Логируем массив введенных символов

        introduced_txt.innerHTML = ''; // Очищаем текстовое поле для ввода


        // Проверяем, совпадает ли введенный символ с правильным
        if (array_introduced_txt[counter] == array_true_txt[counter]) {


            // Если все символы введены правильно
            if(array_introduced_txt.length == array_true_txt.length) {

                alert(`игра закончена, вы выполнили уровень за ${counter_sec2} секунд, введено элементов: ${array_introduced_txt.length}`); // Уведомление о завершении игры

                location.reload(); // Перезагрузка страницы

            } 
            else {

                counter_keys++; // Увеличиваем счетчик введенных клавиш

                console.log(`количество введенных букв : ${counter_keys}`); // Логируем количество введенных букв
                console.log('all is good'); // Логируем, что все в порядке

                PaintTrueWords(); // Обновляем отображение правильных символов

                errorBlock.style.backgroundColor = 'green'; // Устанавливаем цвет блока на зеленый
                moveErrorBlock(counter + 1); // Перемещаем зеленый блок к текущему символу

            }


        } 
        else {

            console.log(`was delete ${array_introduced_txt[array_introduced_txt.length - 1]}`); // Логируем удаленный символ
            array_introduced_txt.pop(); // Удаляем последний введенный элемент

            counter--; // Уменьшаем счетчик

            errorBlock.style.backgroundColor = 'red'; // Устанавливаем цвет блока на красный

        }
    }
    
    console.log(`Нажата клавиша: ${event.key}`); // Логируем нажатую клавишу


}

// Добавляем обработчик события keydown на документ
document.addEventListener('keydown', logKey); // Слушаем события нажатия клавиш

    