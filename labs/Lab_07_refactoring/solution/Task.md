# Рефакторинг кода 
___________________________________________________
## Лабораторная работа 7

В данной лабораторной работе рефакторить код написанный на javascript

### Задание 1. level stone

Скрипт сравнивает две переменные и выводит равны они или нет

```js
let a = prompt('var one'); 
let b = prompt('var two');
if (a === b) {
    console.log('equally')
} else {
    console.log('equally');
}
a += 'world';
```

### Задание №2. level iron

Скрипт выводит названия фруктов, а затем отображает название фрукта и его цвет

```js
    let fruits = ["apple", "strawberry", "blueberry", "raspberry", "lemon"];
    
    const fruitColor = new Map([
        ["apple", "green"],
        ["strawberry", "red"],
        ["blueberry", "blue"],
        ["raspberry", "light red"],
        ["lemon", "lemon yellow"]
    ]);
    fruits.forEach(fruit => console.log(fruit + " " + fruitColor.get(fruit)));

    //но если эти значения в рантайме не меняются то лучше так
    fruits.forEach(fruit => {
    let color;
      switch (fruit) {
          case "apple":
              color = "green";
              break;
          case "strawberry":
              color = "red";
              break;
          case "blueberry":
              color = "blue";
              break;
          case "raspberry":
              color = "light red";
              break;
          case "lemon":
              color = "yellow";
              break;
          default:
            throw new Error("No such color")
      }
      console.log(fruit + " " + color);
    })
    
```

### Задание 3. level gold

Скрипт выполняет подсчет затрат на зарплату сотрудникам.  
Где спрашивает у пользователя кол-во сотрудников и зарплату на одного человека

```js
    let employeesAmount = undefined;
    while(employeesAmount === undefined) {
        let input = prompt('Введите кол-во человек', undefined);
        if (!isNaN(parseFloat(input))) {
            employeesAmount = parseFloat(input);  
        }
    }

    let salary = undefined;
    while(salary === undefined) {
        let input = prompt('Введите зарплату на человека', undefined);
        if (!isNaN(parseFloat(input))) {
            salary = parseFloat(input);
        }
    }

    alert('Затраты на ЗП: ' + employeesAmount * salary);
```
### Задание 4

Скрипт проводит анализ имеющихся студентов в массиве.
Выводит среднюю оценку и список плохих студентов

```js

    let students = [
        { name: 'Петров А.А.', grade: 5 },
        { name: 'Иванов Б.Б.', grade: 3.4 },
        { name: 'Сидоров Г.Г.', grade: 9 },
        { name: 'Немолодой Д.Д', grade: 2 },
        { name: 'Молодой Е.Е', grade: 3.4 }
    ];
    //students.forEach(s => { лучше так
    //    if (s.grade < 1 || 5 < s.grade) {
    //        throw new Error('Invalid value(grade): ' + JSON.stringify(s));
    //    }
    //});
    let validStudents = students.filter(s => {
        let isValidGrade = 0 < s.grade && s.grade < 6;
        if(!isValidGrade) {
            console.log('Это значение учитываться не будет оно не соответствует допустимым значениям');
        }
        return isValidGrade;
    });
    
    let gradesSum = validStudents.map(s => s.grade).reduce((a, b) => a + b);
    let lowGradeStudents = validStudents.filter(s => s.grade < 4);
    
    let avgGrade = gradesSum / validStudents.length;
    console.log('Средняя оценка: ' + avgGrade);
    console.log('Плохие студенты:');
    if(lowGradeStudents.length === 0)  {
        console.log('Таких нет');
    }
    lowGradeStudents.forEach((s) => console.log('Фио: ' + s.name + '; Оценка: ' + s.grade));
```

### Задание 5

Необходимо просмотреть свой код из предыдущей лабораторной работе  
и провести работу над ошибками (если, конечно, ошибки есть)