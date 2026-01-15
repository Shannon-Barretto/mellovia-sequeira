const photos = [
  "images/four.JPG",
  "images/five.jpeg",
  "images/six.jpeg",
  "images/seven.jpeg",
  "images/eight.jpeg",
  "images/nine.jpeg",
  "images/ten.JPG",
  "images/eleven.jpeg"
];

let photoInterval;

function playMusic() {
  const song = document.getElementById("song");
  song.play();

  startFloatingPhotos();
}

function startFloatingPhotos() {
  const layer = document.getElementById("photo-layer");
  const gallery = document.querySelector(".gallery");

  photoInterval = setInterval(() => {
    const img = document.createElement("img");
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.classList.add("floating-photo");

    const position = getSafePosition(gallery, 150, 150);

    img.style.left = position.x + "px";
    img.style.top = position.y + "px";

    layer.appendChild(img);

    setTimeout(() => {
      img.remove();
    }, 8000);

  }, 2000);
}

function getSafePosition(avoidElement, imgWidth, imgHeight) {
  const avoidRect = avoidElement.getBoundingClientRect();
  const maxX = window.innerWidth - imgWidth;
  const maxY = window.innerHeight - imgHeight;

  let x, y;
  let tries = 0;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
    tries++;
  } while (isOverlapping(x, y, imgWidth, imgHeight, avoidRect) && tries < 50);

  return { x, y };
}

function isOverlapping(x, y, w, h, rect) {
  return !(
    x + w < rect.left ||
    x > rect.right ||
    y + h < rect.top ||
    y > rect.bottom
  );
}
