import { data } from "./data.js";

const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector("#close-btn");

const tl = gsap.timeline({ paused: true, overwrite: "auto" });
tl.to(overlay, {
  duration: 0.5,
  bottom: "0px",
  rotation: 0,
  transformOrigin: "bottom center",
  ease: "power2.out",
});
const items = document.querySelectorAll(".item");
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    tl.play();

    updateOverlay(data[index]);
  });
});

closeBtn.addEventListener("click", () => {
  tl.reverse();
});

function updateOverlay(dataItem) {
  const itemName =
    document.querySelector("#item-category").previousElementSibling;
  const itemCategory = document.querySelector("#item-category");
  const itemLink = document.querySelector("#item-link");
  const itemCopy = document.querySelector("#item-copy");
  const mediaContainer = document.getElementById("media-container");

  itemName.textContent = dataItem.itemName;
  itemCategory.textContent = dataItem.itemCategory;
  itemLink.href = dataItem.itemLink;
  itemCopy.textContent = dataItem.itemCopy;

  // Limpa o container
  mediaContainer.innerHTML = "";

  // Adiciona cada mídia
  dataItem.media.forEach((media) => {
    if (media.type === "image") {
      const img = document.createElement("img");
      img.src = media.src;
      img.alt = "";
      img.style.width = "100%";
      img.style.marginBottom = "1em";
      mediaContainer.appendChild(img);
    } else if (media.type === "video") {
      const video = document.createElement("video");
      video.src = media.src;
      video.controls = true;
      video.style.width = "100%";
      video.style.marginBottom = "1em";
      mediaContainer.appendChild(video);
    }
  });
}

document.addEventListener("click", (e) => {
  if (!overlay.contains(e.target) && !isItem(e.target)) {
    tl.reverse();
  }
});

function isItem(target) {
  return target.closest(".item");
}
