const form = document.querySelector(".form");
const imgGallery = document.querySelector(".img-section");

const OPENAI_API_KEY = "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";
let isImageGenerated = false;

const updateImgCard = (imgDataArray) => {

  imgDataArray.forEach((imgObject, index)=> {
    const imgCard = imgGallery.querySelectorAll(".img-card")[index];
    const imgElement = imgGallery.querySelector("img");
    const downloadBtn = imgGallery.querySelector(".download-btn");

    const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;

    imgElement.src = aiGeneratedImg;

    imgElement.onload = () => {
      imgCard.classList.remove("loading");
      downloadBtn.setAttribute("href",aiGeneratedImg);
      downloadBtn.setAttribute("download",`${new Date().getTime()}.jpg`);
    }
  })
}

const generateAIImage = async (userPrompt, imgQuantity) => {
  try {

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(
      {
        prompt: userPrompt,
        n: parseInt(imgQuantity),
        size: "512x512",
        response_format: "b64_json"
      }
    )
  });

  if(!response.ok) throw new Error("Failed to generate the images")
  const { data } = await response.json();
  console.log(data);

  updateImgCard([...data]);
} catch(error) {
  console.log(error);
}
finally {
isImageGenerated;
}
}



const handleFormSubmission = (e) => {
    e.preventDefault();

    if(isImageGenerated) return;
    isImageGenerated = true;

    const userPrompt = e.srcElement[0].value;
    const imgQuantity = e.srcElement[1].value;

//
https://api.openai.com/v1/images/generations
//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


    console.log(userPrompt, imgQuantity);
    const imgCardMarkup = Array.from({length: imgQuantity}, ()=>
        `<div class="loading">
            <img src="loader.svg" alt="loading" />
            <a href="#" class="download-btn"
              ><i class="fa-solid fa-download"></i
            ></a>
          </div>
        `
    ).join("");

    imgGallery.innerHTML = imgCardMarkup;

    generateAIImage(userPrompt, imgQuantity);
}

form.addEventListener("submit", handleFormSubmission);