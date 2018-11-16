/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {

return new Promise((resolve, reject) => {

    var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.addEventListener('load', ()=> {
            if (xhr.status >= 400) {
                reject();
            } 
            const towns = JSON.parse(xhr.responseText);

            towns.sort(function (a, b) {
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
              }
              if (a.name.toUpperCase() < b.name.toUpperCase()) {
                return -1;
              }
              // a должно быть равным b
              return 0;
            });
            filterBlock.style.display = "block";
            loadingBlock.style.display = "none";
            filterResult.style.display = "block";
            resolve(towns);
          
        });
        xhr.addEventListener('error', ()=> {
          reject();
        });
  });

}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    full = full.toUpperCase();
    chunk = chunk.toUpperCase();
    return full.includes(chunk);
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');


// Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
//  то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
//  При клике на кнопку, процесс загруки повторяется заново
var Arrtowns;
  function checkLoading(){
    loadTowns()
      .then( 
        (towns) => {
          Arrtowns = towns;
        },
        () => {
          loadingBlock.textContent = 'Не удалось загрузить города ';

          let btn = document.createElement('button');
          button.textContent = 'Повторить';
          loadingBlock.appendChild(btn);
          button.addEventListener('click', () => {
              loadTowns();
          });
        }
      );
  }

filterInput.addEventListener('keyup', function() {
  // это обработчик нажатия кливиш в текстовом поле
    filterResult.innerHTML = '';
    for (let town of Arrtowns) {
        if (isMatching(town.name, filterInput.value)) {                    
            var li = document.createElement('LI');
            li.textContent = town.name;
            filterResult.appendChild(li);
        }
    }
    if (filterInput.value === '') {
        filterResult.innerHTML = ''; 
    }

});
checkLoading();

export {
    loadTowns,
    isMatching
};
