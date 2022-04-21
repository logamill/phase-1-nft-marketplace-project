//global variables
const baseURL = 'https://api.opensea.io/api/v1/assets?format=json';
const localHost = 'http://localhost:3000/nfts';
const imageDiv = document.getElementById('nftInfo'); // append NFTS to div
const modalImage = document.getElementById('modal-content');
const modal = document.getElementById('myModal');
const caption = document.getElementById('caption');
const priceCap = document.getElementById('priceCap');
const close = document.getElementsByClassName("close")[0];
const lightmode = document.getElementById('moon');
const form = document.getElementById('nft-form');
// light switch
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM CONTENT LOADED')
    lightmode.addEventListener('click', () => {
        document.body.classList.toggle("light-mode")
    });
})

fetchAndParse(localHost) //local fetch
    .then(data => loopAndCreate(data)) // populate #nftInfo div with local data
    .catch(err => console.error(err));

fetchAndParse(baseURL) //public fetch
    .then(data => loopAndCreate(data.assets)) //populate #nftInfo div with public data
    .catch(err => console.error(err));

close.addEventListener('click', () => { // close pop-up
    modal.style.display = "none"
});

document.addEventListener('keydown', (event) => { // esc pop-up
    if (event.key === 'Escape') {
        modal.style.display = 'none'
    }
});

form.addEventListener('submit', postAndAppend); // mint your own nft

// Functions 
function fetchAndParse(link) {
    return fetch(link).then(res => res.json())
};

//--------------------------
function loopAndCreate(obj) {
    obj.forEach(element => {
        if (element.image_url === null) {
            if (element.name === null) {
                if (element.collection.description === null) {
                    return
                }
                return
            }
            return
        };

        //create elements and assign values
        const span = document.createElement('span');
        const images = document.createElement('img');
        images.src = element.image_url;
        images.setAttribute('class', 'nft-images');

        // append to #mftInfo
        span.append(images);
        imageDiv.append(span);

        // click for NFT info
        images.addEventListener('click', () => {
            modal.style.display = "flex"
            modalImage.src = element.image_url
            caption.textContent = element.name
            if (element.description === undefined) {
                priceCap.textContent = element.collection.description
            } else {
                priceCap.textContent = element.description
            }
        })

    })
}

//--------------------------
function postAndAppend(e) {
    e.preventDefault();
    
    let newNFT = {
        name: e.target['name'].value,
        image_url: e.target['image-url'].value,
        description: e.target['nft-desc'].value,
    }
    const span = document.createElement('span');
    const images = document.createElement('img');
    images.src = newNFT.image_url
    images.setAttribute('class', 'nft-images');
    // append to #mftInfo
    span.append(images);
    imageDiv.append(span);
    // image pop-up
    images.addEventListener('click', () => {
        modal.style.display = "flex"
        modalImage.src = newNFT.image_url
        caption.textContent = newNFT.name
        priceCap.textContent = newNFT.description
    });
    // clear form
    form.reset();
    // post to database
    postNFT(localHost, newNFT)
        .catch(err => console.error(err)) // catch errors
}

//--------------------------
function postNFT(link, obj) { // post callback
    fetch(link, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accpet': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(resp => resp.json())
};