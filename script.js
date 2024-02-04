const form = document.querySelector(".form");
const imgGallery = document.querySelector(".img-section");

const handleFormSubmission = (e) => {
    e.preventDefault();

    const userPrompt = e.srcElement[0].value;
    const imgQuantity = e.srcElement[1].value;

    const imgCardMarkup = Array.from({length: imgQuantity}, ()=>
        `<div class="loading">
            <img src="loader.svg" alt="img1" />
            <a href="#" class="download-btn"
              ><i class="fa-solid fa-download"></i
            ></a>
          </div>
        `
    ).join("");

    imgGallery.innerHTML = imgCardMarkup;
}

form.addEventListener("submit", handleFormSubmission);