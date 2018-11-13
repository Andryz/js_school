/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {

  for (let i=0; i<array.length; i++) {
     fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {

   var copy = [];

   for (let i=0; i<array.length; i++) {
    fn(array[i], i, array);
    copy.push(array[i]**2);
  }
    return copy;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {

    let val = initial || array[0];

    let i = 0;
    if(val == array[0]){
        i = 1;
    }

    for (; i<array.length; i++) {

        val = fn(val, array[i], i, array);
    }
    return val;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {

    var arr = [];

    for (var key in obj ) {
      arr.push(key.toUpperCase());

    }
    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {

  var arr = [];

  for (var j = 0; j < array.length; j++){

    if(j < to && j >= from){
      arr.push(array[j]);
    }
    // if(j < to ){
    //   arr.push(array[j]);
    // }
  }
    consoloe.log(array);
    consoloe.log(from);
    consoloe.log(to);
  return arr;
}
// slice([0,1,2,3,4,5], 1, 3)

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};