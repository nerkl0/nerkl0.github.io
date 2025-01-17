
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-buttons')?.forEach(navBtn => {
        navBtn.addEventListener('click', (event) => { 
            const target = event.target;
            if (target.matches('button[data-content]')) {
                const targetElements = target.dataset.content; 
                switchElements(targetElements);
            }
        });
    });
});

let children = [];
let pages = ['home', 'about', 'portfolio'];

async function onInitialLoad() {
    const home = document.getElementById('home');
    children = [];
    getAllChildren(home);
    await delayedAnimationEffect(children, 'visible', 150);
}

function getAllChildren(parent) {
    const p = parent.children;
    if (p.length === 0) 
        return children.push(p);

    for (let i = 0; i < p.length; i++) {
        p[i].children.length > 0 ? getAllChildren(p[i]) : children.push(p[i])
    }
    console.log(children)
}

function delayedAnimationEffect(element, animation, delay) {
    const len = element.length;

    return new Promise(resolve => { 
        for (let i = 0; i < len; i++) {
            setTimeout(() => {
                element[i].classList.add(animation);
                if (i === len - 1)
                    element[i].addEventListener('animationend', () => resolve());
            }, (i + 1) * delay)
        }
    })
}

async function switchElements(id) {
    const visibleElements = document.querySelectorAll('.visible');
    if (visibleElements) {
        await delayedAnimationEffect(visibleElements, 'hidden', 150);
        for (let i = 0; i < visibleElements.length; i++) {
            visibleElements[i].classList.remove('visible');
        } 
    }

    pages.forEach(p => {
        const reset = document.getElementById(p);
        if (reset)
            p != id ? reset.classList.add('shrink') : reset.classList.remove('shrink');
    })  

    children = [];
    getAllChildren(document.getElementById(id));
    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove('hidden');
    }

    await delayedAnimationEffect(children, 'visible', 200);
}

function closeModal(modalName) {
    const modal = document.getElementById(modalName);
    modal.style.display = "none";
}


/*
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
*/

window.addEventListener('load', () => {
    onInitialLoad();
});