const dutchPayForm = document.getElementById("dutch-pay-form");
const totalPayInput = dutchPayForm.querySelector("#pay");
const peopleCountInput = dutchPayForm.querySelector("#people-count");
const peopleButton = dutchPayForm.querySelector("#people-btn");
const peopleDiv = dutchPayForm.querySelector("#people");
const isCutOffCheckBox = dutchPayForm.querySelector("#is-cut-off");
const result = document.querySelector("#result");
const resultTextDiv = document.querySelector("#result-text-div");
const selectPayDiv = resultTextDiv.querySelector("#select-pay-div");

const whoPaySelects = document.getElementsByClassName("select-pay");
const whoPayDiv = document.querySelector("#who-pay-div");
const whoPayButton = whoPayDiv.querySelector("#who-pay-btn");


const HIDDEN_CLASS_NAME = "hidden";
const ANOTHER_HIDDEN_CLASS_NAME = "hidden-another";

let dutchPayObj = {};
let resultText = null;
let inputPeople = [];

const onClickPeopleCount = () => {
    peopleDiv.innerText = '인원들의 이름을 입력해주세요';
    peopleDiv.appendChild(document.createElement('br'));

    for (let i = 0; i < peopleCountInput.value; i++) {
        let inputElement = document.createElement('input');
        inputElement.id = `people-input-${i}`;
        inputElement.required = true;
        peopleDiv.appendChild(inputElement);
    }
}

const onSubmitCalculate = (e) => {
    e.preventDefault();

    const peopleInputs = peopleDiv.getElementsByTagName('input');
    if (peopleInputs.length <= 0) {
        alert("인원 이름들을 입력하세요!");
        return;
    }

    const isCutOff = isCutOffCheckBox.checked;

    let cutOffAmount = isCutOff ? 100 : 0;

    dutchPayObj = calculateDutchPay(totalPayInput.value, peopleCountInput.value, cutOffAmount);

    resultText = `인당 ${dutchPayObj.resultAmount}원 씩 내야해요`;
    resultText += isCutOff ?
        `\n한 명은 ${dutchPayObj.financierAmount}원(절사 금액 포함 : ${dutchPayObj.cutOffDiffAmount}) 내야합니다` :
        '';

    resultTextDiv.innerText = resultText;
    resultTextDiv.appendChild(selectPayDiv);

    if (isCutOff) {
        printSelectPay();
    }
    printPeoplePayTable();
}

const printSelectPay = () => {
    selectPayDiv.classList.remove(HIDDEN_CLASS_NAME);
}

const onClickSelectPay = (e) => {
    if (e.target.value === 'another') {
        whoPayDiv.classList.remove(ANOTHER_HIDDEN_CLASS_NAME);
    } else {
        whoPayDiv.classList.add(ANOTHER_HIDDEN_CLASS_NAME);
    }
}

const onClickSelectPayPerson = () => {
    let whoPayInput = whoPayDiv.querySelector("#who-pay");

    for (let i = 0; i < inputPeople.length; i++) {
        if (inputPeople[i].name === whoPayInput.value &&
            inputPeople[i].isFinancier === false) {

            for (let j = 0; j < inputPeople.length; j++) {
                if (inputPeople[j].isFinancier === true) {
                    inputPeople[j].payAmount = String(dutchPayObj.resultAmount);
                    inputPeople[j].isFinancier = false;
                    break;
                }
            }

            inputPeople[i].payAmount = String(dutchPayObj.financierAmount);
            inputPeople[i].isFinancier = true;

            break;
        }
    }

    printPeoplePayTable();
}

const printPeoplePayTable = () => {
    const peopleInputs = peopleDiv.getElementsByTagName('input');

    let resultTable = result.querySelector('#result-table');

    if (resultTable) {
        let rows = resultTable.getElementsByTagName('tr');
        for (let i = 0; i < inputPeople.length; i++) {
            rows[i].querySelector('td:first-child').innerText = inputPeople[i].name;
            rows[i].querySelector('td:last-child').innerText = inputPeople[i].payAmount;
        }
    } else {
        result.appendChild(document.createElement('br'));
        let tableElement = document.createElement('table');
        tableElement.id = 'result-table';
        result.appendChild(tableElement);
        let header1 = document.createElement('th');
        header1.innerText = '이름';
        let header2 = document.createElement('th');
        header2.innerText = '금액';
        tableElement.appendChild(header1);
        tableElement.appendChild(header2);

        for (let i = 0; i < peopleInputs.length; i++) {
            let tr = document.createElement('tr');
            tableElement.appendChild(tr);
            let td1 = document.createElement('td');
            td1.innerText = peopleInputs[i].value;
            tr.appendChild(td1);
            let td2 = document.createElement('td');

            // 물주 표기
            if (i === 0) {
                td2.innerText = String(dutchPayObj.financierAmount);
                inputPeople.push({
                    name: peopleInputs[i].value,
                    payAmount: String(dutchPayObj.financierAmount),
                    isFinancier: true
                });
            } else {
                td2.innerText = String(dutchPayObj.resultAmount);
                inputPeople.push({
                    name: peopleInputs[i].value,
                    payAmount: String(dutchPayObj.resultAmount),
                    isFinancier: false
                });
            }

            tr.appendChild(td2);
        }
    }
}

const calculateDutchPay = (totalPay, peopleCount, cutOffAmount) => {
    let cutOffPayValue;
    if (cutOffAmount > 0) {
        cutOffPayValue = Math.floor(totalPay / cutOffAmount) * cutOffAmount;
    } else {
        cutOffPayValue = totalPay;
    }

    let cutOffDiffAmount = totalPay - cutOffPayValue;
    let calcResult = cutOffPayValue / peopleCount;

    let cutOffResultAmount;

    if (cutOffAmount > 0) {
        cutOffResultAmount = Math.floor(calcResult / cutOffAmount) * cutOffAmount;
    } else {
        cutOffResultAmount = 0;
    }

    cutOffDiffAmount += (calcResult - cutOffResultAmount) * peopleCount;

    return {
        resultAmount: cutOffAmount > 0 ? cutOffResultAmount : calcResult,
        financierAmount: cutOffAmount > 0 ? cutOffResultAmount + cutOffDiffAmount : calcResult,
        cutOffDiffAmount
    }
}

dutchPayForm.addEventListener("submit", onSubmitCalculate);
peopleButton.addEventListener("click", onClickPeopleCount)

for (const select of whoPaySelects) {
    select.addEventListener("click", onClickSelectPay);
}

whoPayButton.addEventListener("click", onClickSelectPayPerson);
