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

let pages = ['home', 'portfolio'];

function flattenDOMTree(parent) {
    const elements = [];

    function traverseTree(node) {
        elements.push(node);
        Array.from(node.children).forEach(child => traverseTree(child));
    }

    traverseTree(parent);
    return elements.slice(1);
}

function delayedAnimationEffect(elements, animation, delay) {
    return new Promise((resolve) => {
        let completedAnimations = 0;

        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animation);
                element.addEventListener('animationend', () => {
                    completedAnimations++;
                    if (completedAnimations === elements.length) {
                        resolve();
                    }
                });
            }, index * delay);
        });
    });
}

async function switchElements(sectionId) {
    const visibleElements = document.querySelectorAll('.zoom-in');
    const headerElement = document.querySelector('.written-effect');

    // reset visibility of all elements
    if (visibleElements.length) {
        const visibleArray = Array.from(visibleElements);
        visibleArray.reverse();

        if (headerElement) {
            headerElement.classList.remove('written-effect');
            headerElement.addEventListener('animationend', () => {
                delayedAnimationEffect([headerElement], 'slide-out', 100);
            });
        }

        await delayedAnimationEffect(visibleArray, 'slide-out', 100);
        visibleArray.forEach(element => {
            element.classList.remove('zoom-in');
        });
    }

    // hide sections to avoid interferance with visible section
    document.querySelectorAll('section').forEach(section => {
        section.id === sectionId ? section.classList.remove('hidden') : section.classList.add('hidden');
    });

    // animate incoming elements
    const sectionNode = document.getElementById(sectionId);
    const elementsToAnimate = flattenDOMTree(sectionNode);

    sectionNode.classList.remove('slide-out');
    elementsToAnimate.forEach(element => {
        element.classList.remove('slide-out');
        element.style.opacity = '0';
    });

    const h1Element = sectionNode.querySelector('h1');
    if (h1Element) {
        h1Element.classList.add('written-effect');
        h1Element.addEventListener('animationend', () => {
            h1Element.style.opacity= '1';
            h1Element.classList.remove('written-effect');
        });
    }

    await delayedAnimationEffect(elementsToAnimate.filter(e => e !== h1Element), 'zoom-in', 150);

    const hoverElements = document.querySelectorAll('.hover');
    hoverElements.forEach(element => {
        element.style.opacity = '1';
        element.classList.remove('zoom-in');
    });
}


function handleModal(modalId, visible) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-container');
    modalContent.style.animation = '';

    if (visible) {
        modalContent.style.animation = 'zoom-in 1s forwards';
        modal.style.visibility = 'visible';
    } else { 
        modalContent.style.animation = 'zoom-out 1s forwards';
        setTimeout(() => { 
            modal.style.visibility = 'hidden';
        }, 900)
    }
}

window.addEventListener('load', () => {
    switchElements('home');
})