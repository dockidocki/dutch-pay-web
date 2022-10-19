const form = document.getElementById("dutch-pay-form");
const input = document.querySelector("#dutch-pay-form input");
const handleSubmit = (e) => {
    e.preventDefault();
    input.value = '';
}

form.addEventListener("submit", handleSubmit);
