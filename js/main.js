let saturation = document.getElementById("saturation");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blurry = document.getElementById("blurry");
let hueRotate = document.getElementById("hue-rotate");
let download = document.getElementById("download");
let reset = document.getElementById("reset");
let upload = document.getElementById("upload");
let myImg = document.getElementById("myImg");
let imgBox = document.querySelector(".img-box");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");


window.onload = function () {
    reset.style.display = "none";
    download.style.display = "none";
    imgBox.style.display = "none";
}

upload.onchange = function () {
    resetValues()
    reset.style.display = "block";
    download.style.display = "block";
    imgBox.style.display = "block";
    let myFile = new FileReader();
    myFile.readAsDataURL(upload.files[0]);
    myFile.onload = function () {
        myImg.src = myFile.result;
    };
    myImg.onload = drawImg()
};
function drawImg() {
    canvas.width = myImg.width;
    canvas.height = myImg.height;
    context.drawImage(myImg, 0, 0, canvas.width, canvas.height);
    myImg.style.display = 'none';
}
let filters = document.querySelectorAll(".filters ul li input");

filters.forEach(filter => {
    filter.addEventListener("input", function () {
        context.filter = `
            saturate(${saturation.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blurry.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
        context.drawImage(myImg, 0, 0, canvas.width, canvas.height);
    });
});

function resetValues() {
    saturation.value = "100"
    contrast.value = "100"
    brightness.value = "100"
    sepia.value = "0"
    grayscale.value = "0"
    blurry.value = "0"
    hueRotate.value = "0"
    myImg.style.filter = ''
    drawImg()
}

download.onclick = function () {
    download.href = canvas.toDataURL();
}
