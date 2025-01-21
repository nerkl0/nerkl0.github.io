const modalsData = {
    goodfat: {
        title: 'goodfat',
        logo: "./assets/images/GoodFatLogo.png",
        icon: "./assets/images/baker_0.webp",
        description: "Business website built for a local Blue Mountains bakery",
        yearBuilt: "2024",
        technologies: [
            "React", 
            "JavaScript", 
            "TypeScript", 
            "Cloudflare", 
            "Wrangler"
        ],
        modalClass: "goodfat-modal-properties",
        buttons: [
            {
                title: "Visit Website",
                link: "https://goodfatpastry.au",
            },
        ],
    },
    nimble: {
        title: 'nimble',
        logo: "./assets/images/NimbleMerchant.webp",
        description: "Hospitality POS system built for an android device",
        features: [
            "Secure Login",
            "Comprehensive Order Management",
            "Kitchen View",
            "Modular Employee Access Levels",
            "For more features, click on Frontend Link"
        ],
        yearBuilt: "2024",
        technologies: [
            "React-Native",
            "JavaScript",
            "Node.js / Express",
            "MongoDb",
            "Android Studio",
        ],
        modalClass: "nimble-modal-properties",
        buttons: [
            {
                title: "Demo",
                link: "https://drive.google.com/file/d/1BjxGbNOvSvt0eQvez44w_c8gXKrcXA2c/view?usp=sharing",
            },
            {
                title: "Frontend Repo",
                link: "https://github.com/nerkl0/bean-frontend",
            },
            {
                title: "Backend Repo",
                link: "https://github.com/nerkl0/bean-api",
            },
        ],
    },
};

function populateModal(modalKey) {
    const modalData = modalsData[modalKey];
    if (!modalData) return;

    const modalContainer = document.getElementById("modal-container");
    modalContainer.className = `modal-container ${modalData.modalClass}`;

    const buttonsHtml = modalData.buttons
        .map(
            (button) =>
                `<a class="modal-button ${modalData.title}" href="${button.link}" target="_blank" rel="noopener noreferrer">
                    ${button.title}
                </a>`
        )
        .join("");
    
    const featureList = modalData.features?.map(feature => 
        `<li>${feature}</li>`
    ).join("");

    modalContainer.innerHTML = `
        <div class="modal-title">
            <img src="${modalData.logo}" alt="${modalKey} Logo">
            <button class="close-btn" onclick='handleModal("modal", false)'>&#10006;</button>
        </div>
        <div class="modal-content-container">
            ${modalData.icon ? `
                <div>
                    <img src="${modalData.icon}" alt="${modalKey} icon">
                </div>` : ""}
            <div>
                <div class="modal-button-container">
                    ${buttonsHtml}
                </div>
                <div class="modal-contents">
                    <p>${modalData.description}</p>
                    ${featureList ? `<p>Features: <ul>${featureList}</ul>` : ""}
                    ${modalData.yearBuilt ? `<p>Built in ${modalData.yearBuilt}, using the following:</p>` : ""}
                    <strong>
                        <p>${modalData.technologies.join(" &#8226; ")}</p>
                    </strong>
                </div>
            </div>
        </div>
    `;

    handleModal("modal", true);
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