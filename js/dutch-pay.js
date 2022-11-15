const dutchPayForm = document.getElementById("dutch-pay-form");
const payInput = dutchPayForm.querySelector("#pay");
const peopleCountInput = dutchPayForm.querySelector("#people-count");
const peopleButton = dutchPayForm.querySelector("#people-btn");
const peopleDiv = dutchPayForm.querySelector("#people");
const result = document.querySelector("#result");

const peopleList = [];

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

    let peopleInputs = peopleDiv.getElementsByTagName('input');

    if (peopleInputs.length <= 0) {
        alert("인원 이름들을 입력하세요!");
        return;
    }

    let dutchPayObj = calculateDutchPay(payInput.value, peopleCountInput.value, 100);

    result.innerText =
        `인당 ${dutchPayObj.cutOffResultAmount}원 씩 내시고, 
        한 명은 ${dutchPayObj.financierAmount}원(절사 금액 포함 : ${dutchPayObj.cutOffDiffAmount}) 내세요`;

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
            td2.innerText = String(dutchPayObj.cutOffResultAmount);
        }
        tableElement.appendChild(td2);
    }

}

const calculateDutchPay = (totalPay, peopleCount, cutOffAmount) => {
    let cutOffPayValue = Math.floor(payInput.value / cutOffAmount) * cutOffAmount;
    let cutOffDiff = payInput.value - cutOffPayValue;
    let calcResult = cutOffPayValue / peopleCount;
    let cutOffResult = Math.floor(calcResult / cutOffAmount) * cutOffAmount;

    cutOffDiff += (calcResult - cutOffResult) * peopleCount;

    return {
        cutOffResultAmount: cutOffResult,
        financierAmount: cutOffResult + cutOffDiff,
        cutOffDiffAmount: cutOffDiff
    }
}

dutchPayForm.addEventListener("submit", onSubmitCalculate);
peopleButton.addEventListener("click", onClickPeopleCount)
