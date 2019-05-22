//////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа 1 по дисциплине ЛОИС
// Выполнена студентом группы 721701
// БГУИР Козелецким Владиславом Геннадьевичем
// Основной скрипт
// 24.04.19
// 1.Алгоритм вычисления произведения пары 4-разрядных чисел
// умножением со старших разрядов со сдвигом множимого (частичного произведения) вправо
// Учебные материалы по JavaScript - https://learn.javascript.ru/, http://kharchuk.ru/JavaScript.pdf,
// https://developer.mozilla.org/ru/docs/Web/JavaScript
// Учебные материалы по HTML - http://htmlbook.ru/html5, https://study.up-skills.ru/, htmlreference.io, webref.ru/html, ruseller.com/htmlshpora.php
//

var firstElemArrayString = [];
var secondElemArrayString = [];
var secondElemArray = [];
var firstElemArray = [];
var currentRow = 1, currentCell = 1;
var arrayA = [];
var arrayB = [];
var arrResultSum = [];
var resultArray = [];
var timeInt;

function start() {
    readInput();
    
    if (!firstElemArrayString.length || !secondElemArrayString.length )
        alert("Одно из полей пусто или сорержит только пробелы");
    else
    if (firstElemArray.length != secondElemArray.length)
        alert("Количество первых и вторых элементов пар должно совпадать");
    else{
        var flag = false;

        for(var indexFirstElemArr = 0; indexFirstElemArr < firstElemArray.length; indexFirstElemArr++)
            if (firstElemArray[indexFirstElemArr] > 16)
                flag = true;

        for(var indexSecondElemArr = 0; indexSecondElemArr < secondElemArray.length; indexSecondElemArr++)
            if (secondElemArray[indexSecondElemArr] > 16)
                flag = true;
        if (flag)
                alert("Поля могут содержать только числа от 1 до 15");
        else{
            flag = false;

            for(indexFirstElemArr = 0; indexFirstElemArr < firstElemArray.length; indexFirstElemArr++)
                if (firstElemArray[indexFirstElemArr].match(/^\d+$/))
                    firstElemArray[indexFirstElemArr] = +firstElemArray[indexFirstElemArr];
                else
                    flag = true;

            for(indexSecArrElem = 0; indexSecArrElem < secondElemArray.length; indexSecArrElem++)
                if  (secondElemArray[indexSecArrElem].match(/^\d+$/)) 
                    secondElemArray[indexSecArrElem] = +secondElemArray[indexSecArrElem];   
                else
                    flag = true;

            if (flag)
                alert("Поля могут содержать только целые числа");
            else{
                    flag = false;

                for(indexFirstElemArr = 0; indexFirstElemArr < firstElemArray.length; indexFirstElemArr++)
                    if (firstElemArray[indexFirstElemArr] <= 0)
                        flag = true;

                for(indexSecondElemArr = 0; indexSecondElemArr < secondElemArray.length; indexSecondElemArr++)
                    if (secondElemArray[indexSecondElemArr] <= 0)
                        flag = true;

                if (flag)
                    alert("Поля могут содержать только положительные числа");
                else {
                    var counter = 2;
                    var i = 1;
                    document.getElementById('Table').insertRow(-1);

                    document.getElementById('Table').rows[0].insertCell(-1);
                    document.getElementById('Table').rows[0].cells[0].innerText = "Пара чисел";

                    for(var cellCounter = 1; cellCounter < 9; cellCounter++){

                        document.getElementById('Table').rows[0].insertCell(-1);
                        if(counter % 2 == 0){
                            document.all.Table.rows[0].cells[cellCounter].innerText = "Этап "+counter/2+"\nМножимое" ;
                        }else {
                            document.all.Table.rows[0].cells[cellCounter].innerText = "Сумма";
                        }
                        counter++;                       
                    }
                    for(var row = 1; row < firstElemArray.length + 8; row++){
                        document.getElementById('Table').insertRow(-1);
                        for(var column = 0; column < 9; column++) {
                            document.getElementById('Table').rows[row].insertCell(-1);
                        }
                    }

                    findSumArray();

                    document.getElementById('ResultMassage').innerHTML = "Результат: "+resultArray;
            }
        }
    }
}

}

function readInput() {
    document.getElementById('ResultMassage').innerHTML = "";
    firstElemArrayString = document.getElementById('InputPairFirstElem').value.replace(/\s+/g, '');
    secondElemArrayString = document.getElementById('InputPairSecondElem').value.replace(/\s+/g, '');
    timeString = document.getElementById('Time').value.replace(/\s+/g, '');

    firstElemArrayString = firstElemArrayString.replace(/,+$/g, '');
    secondElemArrayString = secondElemArrayString.replace(/,+$/g, '');

    firstElemArray = firstElemArrayString.split(',');
    secondElemArray = secondElemArrayString.split(',');
    timeInt = timeString;
}

function findSumArray() {

    var vectorA = [], vectorB = [], tempNumber = [];

    for (var count = 0; count < firstElemArray.length; count++){
        firstElemArray[count] =  +firstElemArray[count];
        secondElemArray[count] =  +secondElemArray[count];
        vectorA[count] = firstElemArray[count].toString(2);
        vectorB[count] = secondElemArray[count].toString(2);
        tempNumber = vectorA[count].split("");
        vectorA.splice(count,1,tempNumber);
        tempNumber = vectorB[count].split("");
        vectorB.splice(count,1,tempNumber);
        

        arrayB=vectorB[count];
        arrayA=vectorA[count];
        
        for (var indexArrB = 0; indexArrB < arrayB.length; indexArrB++) {
            arrayB[indexArrB] = +arrayB[indexArrB];
        }

        for (var indexArrA = 0; indexArrA < arrayA.length; indexArrA++) {
            arrayA[indexArrA] = +arrayA[indexArrA];
        }

        arrayA=addZeros(arrayA, 4);
        arrayB=addZeros(arrayB, 4);

        calcResultSum(arrayA, arrayB);
        

        document.getElementById('Table').rows[count+1].cells[0].innerHTML = "A: "+arrayB.join("")+"<br>B: "+arrayA.join("");
        currentRow = count + 2;
        currentCell = 1;
        resultArray[count]=parseInt(sumArray.join(''),2).toString(10);
    }

}

function calcResultSum(arrayA, arrayB) {
    var buffer = 0, tempSumArray = [0,0,0,0,0,0,0,0];
    sumArray=[0,0,0,0,0,0,0,0];
    for (var countB = 0; countB < arrayB.length; countB++) {

        if (arrayB[countB] == 1) {
            var x = 0;
            for(var i = countB + 1; i < countB + 5; i++){
                tempSumArray[i] = arrayA[x];
                x++;
            }
        
            for(var j = sumArray.length - 1; j >= 0; j--) {
                switch ( sumArray[j] + tempSumArray[j] + buffer){
                    case 0:
                        sumArray[j] = 0;
                        buffer = 0;
                        break;
                    case 1:
                        sumArray[j] = 1;
                        buffer = 0;
                        break;
                    case 2:
                        sumArray[j] = 0;
                        buffer = 1;
                        break;
                    case 3:
                        sumArray[j] = 1;
                        buffer = 1;
                        break;
                }
            }

        }

        document.getElementById('Table').rows[currentRow].cells[currentCell].innerHTML = "A:"+arrayB.join("")+"<br>"+"B:"+arrayA.join("")+"<br>>>>"+tempSumArray.join("")+"<br>Время:"+timeInt*currentRow;
        currentRow++;
        currentCell++;
        document.getElementById('Table').rows[currentRow].cells[currentCell].innerHTML = sumArray.join("") + "<br>Время:"+timeInt*currentRow;
        currentRow++;
        currentCell++;
        tempSumArray=[0,0,0,0,0,0,0,0];
    }

}

function addZeros(array, length)
{
    var kolZeros = length - array.length;
    for (var i = 0; i < kolZeros; i++)
        array.unshift(0);
    return array;
}
