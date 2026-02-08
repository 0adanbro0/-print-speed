import string_default_text from "./data/database.ts";
import random from "./getRandom/getRandomInt.ts";

let array_default_text:string[]
let array_introduced_txt:string[] = [];

let game_field = document.querySelector('.game-main_text');
let user_text = document.querySelector('.game-user_text');

let language_index:number = 0;

main();

function main(){
    ConvertToArray(language_index)

    ShowText()
}

function ShowText(){
    let game_field = document.querySelector('.game-main_text');
    if(!game_field) return;

    for(let i = 0; i < array_default_text.length; i++){
        game_field.textContent += array_default_text[i]
    }
}

function ConvertToArray(language:number){

    array_default_text = 
    string_default_text[language][ random(0, string_default_text[language].length - 1)].split("");
}

function Game(arg:boolean){
    if(!user_text) return;
    if(!game_field) return;

    if(arg){
        user_text.textContent = "";
        array_introduced_txt.push(array_default_text[0])
        for(let i = 0; i < array_introduced_txt.length; i++){
            array_introduced_txt[i] == " " ? user_text.textContent+= '\u00A0' : user_text.textContent += array_introduced_txt[i]
        }

        array_default_text.splice(0, 1);

        game_field.textContent = "";

        for(let i = 0; i < array_default_text.length; i++){
            array_default_text[i] == " " ? game_field.textContent+= '\u00A0' : game_field.textContent += array_default_text[i]
        }
    }
    else if(!arg){
        const error = document.createElement('span')
        error.style.backgroundColor = "red";
        error.textContent = array_default_text[0];

        if(user_text.textContent.at(-1) !== error.textContent){
            user_text.appendChild(error);
        }
    }
}

document.addEventListener('keydown', (PressedKey)=>{
    if (PressedKey.key.length > 1) return;
    let input_keyboard = document.querySelector('#input_keyboard') as HTMLInputElement;
    if(!input_keyboard){
        return;
    }
    input_keyboard.value = "";

    console.log(PressedKey.key)

    if(PressedKey.key == array_default_text[0]) Game(true);
    else if(PressedKey.key !== array_default_text[0]) Game(false);

    
});



// Функция для отображения правильных символов
/*function PaintTrueWords() {

    if(!true_txt) return;
    true_txt.innerHTML = ''; // Очищаем содержимое элемента

    for (let i = 0; i < array_txt.length; i++) {

        let span = document.createElement('span'); // Создаем новый элемент span
        span.innerText = array_txt[i]; // Устанавливаем текст

        // Меняем цвет на зеленый для правильных символов
        if (i <= counter) {

            span.style.color = 'green'; // Устанавливаем цвет для правильных символов

        }
        
        true_txt.appendChild(span); // Добавляем span в true_txt
    }


}

// Функция для перемещения зеленого блока
function moveErrorBlock(index:number) {


    if(!true_txt) return;
    const spanElements = true_txt.getElementsByTagName('span'); // Получаем все элементы span

    if (spanElements[index]) {

        const rect = spanElements[index].getBoundingClientRect(); // Получаем координаты элемента

        errorBlock.style.display = 'block'; // Показываем зеленый блок
        errorBlock.style.left = `${rect.left + window.scrollX}px`; // Устанавливаем позицию по оси X
        errorBlock.style.top = `${rect.top + window.scrollY}px`; // Устанавливаем позицию по оси Y

    }


}

// Добавляем обработчик события keydown на документ
*/