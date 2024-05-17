document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'flex';
    }, 800);
});


const loadingContainer = document.querySelector('.loading-container');

for (let i = 0; i < 50; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.left = `${Math.random() * 100}%`;
    square.style.top = `${Math.random() * 100}%`;
    square.style.animationDuration = `${2 + Math.random() * 1}s`;
    square.style.animationDelay = `${Math.random() * 1}s`;
    loadingContainer.appendChild(square);
}
