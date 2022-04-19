//global variables
let baseURL = 'https://api.opensea.io/api/v1/assets?format=json';
let imageDiv = document.getElementById('nftInfo')
let spanImg = document.getElementById('nft-id')
let modalImage = document.getElementById('modal-content')
let modal = document.getElementById('myModal')
let caption = document.getElementById('caption')
let priceCap = document.getElementById('priceCap')
let span = document.getElementsByClassName("close")[0];
let darkmode = document.getElementById('mode-toggle')
let form = document.getElementById('nft-form')

let currentNFT = {}

//initial fetch 
fetch(baseURL)
.then(resp => resp.json())
.then(data => callbackNFT(data))
.catch(err => console.error(err))

// git check


//populate with data with json info
function callbackNFT(data) {    
    data.assets.forEach(element => {
        if(element.image_url === null || element.name === null) {
            return;
        }

        // let createSpan = document.createElement('span')
        let images = document.createElement('img')
        let h3 = document.createElement('h3')

        images.src = element.image_url
        spanImg.append(images)
        images.appendChild(h3)
        h3.textContent = element.name
        images.setAttribute('class', 'nft-images')

        images.addEventListener('click', () => {
            console.log(element.image)
            console.log(element.price)
            console.log(modal)
            modal.style.display = "flex"
            modalImage.src = element.image_url
            caption.textContent = element.name
            priceCap.textContent = element.price + ' ETH'

            document.addEventListener('keydown', () => {
                if(event.key === 'Escape'){
                    modal.style.display = 'none';
                }
            })

            span.onclick = function() { 
                modal.style.display = "none";
              }
        })
    })
}

// filter by price

// click for info

// switch light/dark mode
darkmode.addEventListener('click', ()=> {
    let mode = document.body;
    mode.classList.toggle("dark-mode")
})

// STRETCH GOALS

// mint your own nft
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newNFT = {
    name: e.target['name'].value,
    image: e.target['image-url'].value,
    price: e.target['nft-price'].value,
    }

    postNFT(newNFT)
})

function postNFT(newNFT) {
    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accpet': 'application/json'
        },
        body: JSON.stringify(newNFT)
    })
    .then(resp => resp.json())
    .then(data => callbackNFT(data))
    .catch(err => console.error(err))
}


