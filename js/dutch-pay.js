const dutchPayForm = document.getElementById("dutch-pay-form");
const totalPayInput = dutchPayForm.querySelector("#pay");
const peopleCountInput = dutchPayForm.querySelector("#people-count");
const peopleButton = dutchPayForm.querySelector("#people-btn");
const peopleDiv = dutchPayForm.querySelector("#people");
const isCutOffCheckBox = dutchPayForm.querySelector("#is-cut-off");
const result = document.querySelector("#result");

let dutchPayObj = {};

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

    let resultText = `인당 ${dutchPayObj.resultAmount}원 씩 내야해요`;
    resultText += isCutOff ?
        `\n한 명은 ${dutchPayObj.financierAmount}원(절사 금액 포함 : ${dutchPayObj.cutOffDiffAmount}) 내야합니다` :
        '';

    result.innerText = resultText;

    if (isCutOff) {
        let isRandomCheckBox = document.createElement('input');
        isRandomCheckBox.id = 'is-random'
        isRandomCheckBox.type = 'checkbox';
        result.appendChild(isRandomCheckBox);
    }
    printPeoplePayTable();
}

// const onClickRandomFinancier = () => {
//
// }

const printPeoplePayTable = () => {
    const peopleInputs = peopleDiv.getElementsByTagName('input');

    result.appendChild(document.createElement('br'));
    let tableElement = document.createElement('table');
    result.appendChild(tableElement);
    let header1 = document.createElement('th');
    header1.innerText = '이름';
    let header2 = document.createElement('th');
    header2.innerText = '금액';
    tableElement.appendChild(header1);
    tableElement.appendChild(header2);

    for (let i = 0; i < peopleInputs.length; i++) {
        tableElement.appendChild(document.createElement('tr'));
        let td1 = document.createElement('td');
        td1.innerText = peopleInputs[i].value;
        tableElement.appendChild(td1);
        let td2 = document.createElement('td');

        // 물주 표기
        if (i === 0) {
            td2.innerText = String(dutchPayObj.financierAmount);
        } else {
            td2.innerText = String(dutchPayObj.resultAmount);
        }
        tableElement.appendChild(td2);
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
