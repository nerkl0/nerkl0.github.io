
document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => handleCircleAnimation());

    document.getElementById('portfolioBtn')?.addEventListener('click', () => {
        pageChange('./pages/portfolio.html');
    });
    
    document.getElementById('homeBtn')?.addEventListener('click', () => { 
        pageChange('../index.html');
    });
    
    document.getElementById('aboutBtn')?.addEventListener('click', () => { 
        pageChange('./pages/about.html');
    });
    
    const demoElement = document.querySelector('.demo');
    if (demoElement) {
        demoElement.addEventListener('animationend', (event) => {
            event.target.style.animation = 'none';
        });
    }
});

function pageChange(targetPage) { 
    pageOutTransitionAnimation('slide');
    setTimeout(() => {
        window.location.assign(targetPage);
        pageInTransition('zoom');
    }, 1600); 
}

function pageOutTransitionAnimation(animation) {
    const elements = document.querySelectorAll('.container *:not(.circle)');
    elements.forEach((e, index) => {
        setTimeout(() => { 
            e.classList.add(animation);
        }, index * 100);
    });
};


function pageInTransition(animation) {
    const element = document.querySelectorAll('body');
    element.classList.add(animation);
    element.style.visibility = 'visible'
}


function handleCircleAnimation() { 
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => { 
        setTimeout(() => { 
            let list = circle.classList;
            list.add('zoom');

            circle.addEventListener('animationend', () => { 
                list.remove('zoom')
                list.add('orbit');
            })
        }, index * 100);
    })
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

window.onload = () => {
    const container = document.querySelector('.container');
    const children = container.children;
    Array.from(children).forEach((child, index) =>{
        setTimeout(() => { 
            child.classList.add('loaded', 'zoom');
        }, index * 100)
    });
    container.classList.add('loaded', 'zoom');
};


window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        showModal(false);
    }
});