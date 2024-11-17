
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
});

function pageChange(targetPage) { 
    pageOutTransitionAnimation('slide');
    setTimeout(() => {
        window.location.assign(targetPage);
    }, 2000); 
}

function pageOutTransitionAnimation(animation) {
    const elements = document.querySelectorAll('main *:not(.circle)');
    elements.forEach((e, index) => {
        setTimeout(() => { 
            e.classList.add(animation);
        }, index * 100);
    });
}


function pageInTransition(animation) {
    const element = document.querySelectAll('body');
    element.classList.add(animation);
}


function handleCircleAnimation() { 
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => { 
        setTimeout(() => { 
            let list = circle.classList;
            list.add('zoomIn');

            circle.addEventListener('animationend', () => { 
                list.remove('zoomIn')
                list.add('orbit');
            })
        }, index * 100);
    })
}