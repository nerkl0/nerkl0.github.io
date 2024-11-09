
const emailElement = document.getElementById('copyEmail');
const originalValue =  emailElement.textContent; 

emailElement.addEventListener("click", () => {
    navigator.clipboard.writeText(emailElement.dataset.clipboardText);
    emailElement.innerHTML = 'email copied to clipboard';
    setTimeout(() => {
        emailElement.textContent = originalValue;
    }, 3000);
})