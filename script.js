const mainDisplay = document.querySelector('.poemDisplay');
const sideBar = document.querySelector('.sideBar');
const poemSearch = document.querySelector('.poemsSearch');
const poemsDisplay = document.querySelector('.poemsDisplay ul');
const hideArrow = document.getElementById('hideArrow');
const body = document.querySelector('body');

let allPoems = [];
let sideBarOpen = true;

// Fill the poems display

async function fetchPoems() {
    try {
        poemsDisplay.innerHTML = ``;
        let poems = await fetch('poems.json')
        poems = await poems.json();
        allPoems = poems;
        

        poems.forEach(poem => {
            const poemItem = document.createElement('li');
            const poemLink = document.createElement('a');
            poemLink.textContent = poem.title;
            poemLink.onclick = () => displayPoem(poem);
            poemItem.appendChild(poemLink);
            poemsDisplay.appendChild(poemItem);
        })
    }
    catch (error) {
        console.error(error);
    }
};

fetchPoems();

function displayPoem(poem) {
    mainDisplay.innerHTML = ``;
    const credits = document.createElement('div');
    const creditsImg = document.createElement('img');
    const hr = document.createElement('hr');
    const description = document.createElement('p');

    const poemDisplay = document.createElement('p');

    credits.classList = 'credits'
    creditsImg.src = poem.authorBackground;
    description.textContent = poem.description;
    
    mainDisplay.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${poem.poemBackground}')`;
    mainDisplay.style.backgroundSize = 'cover';
    mainDisplay.style.backgroundRepeat = 'no-repeat';
    mainDisplay.style.backgroundPosition = 'center';
    mainDisplay.style.backgroundAttachment = 'fixed';


    

    // Convert markdown bold to HTML and preserve line breaks
    let formattedContent = poem.content
        .split('\n\n')
        .map(stanza => {
            let s = stanza.replace(/\n/g, ' ');
            s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return `${s}<br><br>`;
        })
        .join('');
        
    poemDisplay.innerHTML = formattedContent;
    mainDisplay.appendChild(credits);
    mainDisplay.appendChild(poemDisplay);

    credits.appendChild(creditsImg);
    credits.appendChild(hr);
    credits.appendChild(description);

};



poemSearch.addEventListener('input', () => {
    const query = poemSearch.value.toLowerCase();
    const filtered = allPoems.filter(poem =>
        poem.title.toLowerCase().includes(query)
    );

    poemsDisplay.innerHTML = '';

    if (filtered.length === 0) {
        poemsDisplay.innerHTML = '<li><a>No poems found...</a></li>';
        return;
    }

    filtered.forEach(poem => {
        const poemItem = document.createElement('li');
        const poemLink = document.createElement('a');
        poemLink.textContent = poem.title;
        poemLink.onclick = () => displayPoem(poem);
        poemItem.appendChild(poemLink);
        poemsDisplay.appendChild(poemItem);
    });
});



hideArrow.addEventListener('click', () => {
    sideBarOpen = !sideBarOpen;
    
    if (sideBarOpen) {
        sideBar.style.transform = 'translateX(0)';
        hideArrow.style.left = '250px';
        body.classList.remove('sideBarHidden');
        hideArrow.classList.replace('fa-arrow-right', 'fa-arrow-left');
    } else {
        sideBar.style.transform = 'translateX(-100%)';
        hideArrow.style.left = '20px';
        body.classList.add('sideBarHidden');
        hideArrow.classList.replace('fa-arrow-left', 'fa-arrow-right');
    }
});
