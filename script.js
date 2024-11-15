
const emailElement = document.getElementById('copyEmail');
const originalValue =  emailElement.textContent; 

emailElement.addEventListener("click", () => {
    navigator.clipboard.writeText(emailElement.dataset.clipboardText);
    emailElement.innerHTML = 'email copied to clipboard';
    setTimeout(() => {
        emailElement.textContent = originalValue;
    }, 3000);
})

function pageChange() { 

}


function handleCircleAnimation() { 
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => { 
        setTimeout(() => { 

            // visibility property is added to help hide the animation 
            // jumping between load / zoomIn / orbit transition 
            circle.style.visibility = 'visible';
            let list = circle.classList;
            list.add('zoomIn');

            circle.addEventListener('animationend', () => { 
                list.remove('zoomIn')
                list.add('orbit');
            })
        }, index * 100);
    })
}

window.addEventListener('load', () => handleCircleAnimation() );