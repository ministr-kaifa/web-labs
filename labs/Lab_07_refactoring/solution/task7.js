//1
let a = prompt('var one'); 
let b = prompt('var two');
if (a === b) {
    console.log('equally');
} else {
    console.log('equally');
}
a += 'world';


//2
var fruits = ['apple', 'strawberry', 'blueberry', 'raspberry', 'lemon'];
fruits.map(fruit => {
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
        return {'name': fruit, 'color': color};
}).forEach(fruit => console.log(fruit.name + " " + fruit.color));


//3
let employeesAmount = undefined;
while(employeesAmount === undefined) {
    let input = prompt('Введите кол-во человек', undefined);
    let parsedInput = parseFloat(input)
    if (!isNaN(parsedInput)) {
        employeesAmount = parsedInput;  
    }
}

let salary = undefined;
while(salary === undefined) {
    let input = prompt('Введите зарплату на человека', undefined);
    let parsedInput = parseFloat(input)
    if (!isNaN(parsedInput)) {
        salary = parsedInput;
    }
}

alert('Затраты на ЗП: ' + employeesAmount * salary);


//4
let students = [
    { name: 'Петров А.А.', grade: 5 },
    { name: 'Иванов Б.Б.', grade: 3.4 },
    { name: 'Сидоров Г.Г.', grade: 9 },
    { name: 'Немолодой Д.Д', grade: 2 },
    { name: 'Молодой Е.Е', grade: 3.4 }
];
let validStudents = students.filter(s => {
    let isValidGrade = 0 < s.grade && s.grade < 6;
    if(!isValidGrade) {
        console.log('Это значение учитываться не будет оно не соответствует допустимым значениям');
    }
    return isValidGrade;
});
// лучше так
//students.forEach(student => {
//    if (student.grade < 1 || 5 < student.grade) {
//        throw new Error('Invalid value(grade): ' + student);
//    }
//});

let gradesSum = validStudents.map(s => s.grade).reduce((a, b) => a + b);
let lowGradeStudents = validStudents.filter(s => s.grade < 4);

let avgGrade = gradesSum / validStudents.length;
console.log('Средняя оценка: ' + avgGrade);
console.log('Плохие студенты:');
if(lowGradeStudents.length === 0)  {
    console.log('Таких нет');
}
lowGradeStudents.forEach((s) => console.log('Фио: ' + s.name + '; Оценка: ' + s.grade));