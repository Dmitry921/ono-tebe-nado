document.addEventListener('DOMContentLoaded', () => {
    const question = document.getElementById('question');
    const subtext = document.getElementById('subtext');
    const mainQuestion = document.getElementById('main-question');
    const buttons = document.getElementById('buttons');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const successScreen = document.getElementById('successScreen');
    const heartsContainer = document.getElementById('heartsContainer');

    // Create floating hearts in background
    function createFloatingHearts() {
        const hearts = ['💕', '💖', '💗', '💓', '❤️', '💘', '💝'];
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
            heart.style.animationDuration = (Math.random() * 10 + 8) + 's';
            heart.style.animationDelay = (Math.random() * 10) + 's';
            heartsContainer.appendChild(heart);
        }
    }

    createFloatingHearts();

    // Sequence of revealing elements
    setTimeout(() => {
        subtext.classList.remove('hidden');
    }, 1500);

    setTimeout(() => {
        mainQuestion.classList.remove('hidden');
        mainQuestion.style.animation = 'fadeIn 0.6s ease-out forwards';
    }, 2500);

    // "No" button runs away
    let noClickCount = 0;
    const noMessages = [
        'Точно нет?',
        'Подумай ещё...',
        'Ну пожалуйста! 🥺',
        'Не бросай меня!',
        'Я же так прошу...',
        'Последний шанс передумать!',
        'Ладно... нет, ещё раз!',
    ];

    function moveNoButton() {
        const btnRect = noBtn.getBoundingClientRect();
        const maxX = window.innerWidth - btnRect.width - 40;
        const maxY = window.innerHeight - btnRect.height - 40;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.zIndex = '35';
        noBtn.style.transition = 'all 0.3s ease';
    }

    noBtn.addEventListener('mouseenter', () => {
        if (noClickCount >= 3) {
            moveNoButton();
        }
    });

    noBtn.addEventListener('click', () => {
        if (noClickCount < noMessages.length) {
            noBtn.textContent = noMessages[noClickCount];
            noClickCount++;

            if (noClickCount >= 3) {
                moveNoButton();
            }

            if (noClickCount >= noMessages.length) {
                noBtn.style.pointerEvents = 'none';
                noBtn.style.opacity = '0.3';
                noBtn.textContent = 'Ладно, нажми Да! 💕';
            }
        }
    });

    // "Yes" button
    yesBtn.addEventListener('click', () => {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createExplosionHeart();
            }, i * 50);
        }

        setTimeout(() => {
            document.querySelector('.container').classList.add('hidden');
            successScreen.classList.remove('hidden');
        }, 1500);
    });

    function createExplosionHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        const hearts = ['💕', '💖', '💗', '💓', '❤️', '💘', '💝', '🥰', '😍'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.opacity = '1';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
});
