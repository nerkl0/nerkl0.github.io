
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.nav-buttons')?.addEventListener('click', (event) => { 
        const target = event.target;
        if (target.matches('button[data-content]')) {
            const contentId = target.dataset.content; 
            console.log(contentId)
            contentChange(contentId);
        }
    })
    
    const demoElement = document.querySelector('.demo');
    if (demoElement) {
        demoElement.addEventListener('animationend', (event) => {
            event.target.style.animation = 'none';
        });
    }
});

function contentChange(contentId) { 
    contentOutTransitionAnimation('slide');
    setTimeout(() => {
        const changeToContent = document.getElementById(contentId);
        pageInTransition('zoom', changeToContent);
    }, 2000); 
}

function contentOutTransitionAnimation(animationClass) {
    const elements = document.querySelectorAll('.main *:not(.circle)');

    elements.forEach((e, index) => {
        setTimeout(() => { 
            e.classList.add(animationClass);
        }, index * 100);
    });
};


function pageInTransition(animationClass, content) {
    content.classList.add(animationClass);
    content.style.visibility = 'visible';
    content.style.zIndex = 1;

    content.addEventListener('animationend', () => {
        content.classList.remove(animationClass);
    });
}
function handleAnimation(chosenElement, effect, effect2 = undefined) { 
    const element = document.querySelectorAll(chosenElement);
    element.forEach((e, index) => { 
        setTimeout(() => { 
            let list = e.classList;
            list.add(effect);

            if(effect2 !== undefined) {
                circle.addEventListener('animationend', () => { 
                    list.remove(effect)
                    list.add(effect2);
                })
            }
            
        }, index * 100);
    })
}


function closeModal(modalName) {
    const modal = document.getElementById(modalName);
    modal.classList.remove('visible-content');
    modal.classList.add('hidden-content');
}

function showModal(show) {
    const modal = document.getElementById('modal');
    const demo = document.querySelector('.demo');
    const demoVideo = document.getElementById('beansceneDemo');

    if (show) {
        demo.style.animation = 'zoom 2s forwards';
        modal.style.visibility='visible';
        demoVideo.play();
    }
    else {
        demo.style.animation = 'zoom-reverse 0.5s forwards';
        demo.addEventListener('animationend', () => { 
            modal.style.visibility='hidden';
        })
        demoVideo.pause();
        demoVideo.currentTime = 0
    } 
}


window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        showModal(false);
    }
});