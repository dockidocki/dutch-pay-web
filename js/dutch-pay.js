const dutchPayForm = document.getElementById("dutch-pay-form");
const payInput = document.querySelector("#dutch-pay-form #pay");
const peopleCountInput = document.querySelector("#dutch-pay-form #people-count");
const result = document.querySelector("#result");
const onSubmitCalculate = (e) => {
    e.preventDefault();
    let dutchPayObj = calculateDutchPay(payInput.value, peopleCountInput.value, 100);
    result.innerText =
        `인당 ${dutchPayObj.cutOffResultAmount}원 씩 내시고, 
        한 명은 ${dutchPayObj.financierAmount}원(절사 금액 포함 : ${dutchPayObj.cutOffDiffAmount}) 내세요`;
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
