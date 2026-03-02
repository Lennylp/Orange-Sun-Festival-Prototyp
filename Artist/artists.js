const poster = document.getElementById("posterImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const posters = [
    "../Plakate/1.jpg",
    "../Plakate/2.jpg",
    "../Plakate/3.jpg",
    "../Plakate/4.jpg"
];

let currentIndex = 0;
let isAnimating = false;

function changePoster(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const newIndex =
        (currentIndex + direction + posters.length) % posters.length;

    const container = document.querySelector(".poster-container");
    const currentImg = container.querySelector("img");

    const newImg = document.createElement("img");
    newImg.src = posters[newIndex];

    newImg.style.position = "absolute";
    newImg.style.top = "0";
    newImg.style.left = "0";
    newImg.style.height = "100%";
    newImg.style.width = "auto";
    newImg.style.objectFit = "contain";
    newImg.style.transition =
        "transform 0.8s cubic-bezier(.22,.61,.36,1), filter 0.8s";
    
    newImg.style.transform =
        `translateX(${direction * 100}%) rotateY(${ -direction * 35 }deg) scale(0.9)`;
    newImg.style.filter = "brightness(0.7)";

    currentImg.style.transition =
        "transform 0.8s cubic-bezier(.22,.61,.36,1), filter 0.8s";

    container.appendChild(newImg);

    requestAnimationFrame(() => {
        currentImg.style.transform =
            `translateX(${ -direction * 100 }%) rotateY(${ direction * 35 }deg) scale(0.9)`;
        currentImg.style.filter = "brightness(0.6)";

        newImg.style.transform = "translateX(0) rotateY(0deg) scale(1)";
        newImg.style.filter = "brightness(1)";
    });

    setTimeout(() => {
    container.removeChild(currentImg);

    newImg.style.transition = "";
    newImg.style.filter = "";

    currentIndex = newIndex;
    isAnimating = false;
}, 800);
}

prevBtn.addEventListener("click", () => changePoster(-1));
nextBtn.addEventListener("click", () => changePoster(1));