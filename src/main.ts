import string_default_text from "./data/database.ts";
import random from "./getRandom/getRandomInt.ts";

let array_default_text:string[]
let array_introduced_txt:string[]

let language_index:number = 0;

main();

function main(){
    ConvertToArray(language_index)

    ShowDefaultText();
}

function ConvertToArray(language:number){

    array_default_text = 
    string_default_text[language][ random(0, string_default_text[language].length - 1)].split("");
}

function ShowDefaultText(){
    let game_field = document.querySelector('.game-main_text');
    if(!game_field) return;

    game_field.innerHTML = "";

    for(let i = 0; i < array_default_text.length; i++){
        array_default_text[i] == " " ? game_field.innerHTML+= "&nbsp" : game_field.innerHTML += array_default_text[i]
    }
}

document.addEventListener('keydown', (PressedKey)=>{
    let input_keyboard = document.querySelector('#input_keyboard') as HTMLInputElement;
    if(!input_keyboard){
        return;
    }
    input_keyboard.value = "";

    console.log(PressedKey.key)
    
    if(PressedKey.key == array_default_text[0]){
        array_default_text.splice(0, 1);
        console.log(array_default_text)
    }

    ShowDefaultText();

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