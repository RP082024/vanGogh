document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.memory-game');
    const imageNames = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg'];
    let cardsChosen = [];

    // Double the images for 2 of each, then sort randomly
    const cardArray = imageNames.flatMap(image => [{ img: `images/${image}` }, { img: `images/${image}` }])
        .sort(() => 0.5 - Math.random());

    // Create cards
    cardArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = index;

        const cardImage = document.createElement('img');
        cardImage.src = 'images/placeholder.jpg'; // A placeholder image when the card is not flipped
        cardImage.setAttribute('data-img', card.img);
        cardElement.appendChild(cardImage);

        gameContainer.appendChild(cardElement);

        cardElement.addEventListener('click', flipCard);
    });

    function flipCard() {
        const clickedCard = this;
        const cardImage = clickedCard.querySelector('img');
        cardImage.src = cardImage.getAttribute('data-img');
        clickedCard.classList.add('flipped');
        cardsChosen.push(clickedCard);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const [cardOne, cardTwo] = cardsChosen.map(card => card.querySelector('img'));

        if (cardOne.getAttribute('data-img') === cardTwo.getAttribute('data-img')) {
            cardOne.parentElement.removeEventListener('click', flipCard);
            cardTwo.parentElement.removeEventListener('click', flipCard);
        } else {
            cardOne.src = 'images/placeholder.jpg';
            cardTwo.src = 'images/placeholder.jpg';
            cardOne.parentElement.classList.remove('flipped');
            cardTwo.parentElement.classList.remove('flipped');
        }

        cardsChosen = [];
    }
});