let categories = [];
let sizes = [];
const gender = new Array(1).fill("Men")

function categoryLogic(e) {
  categories.push(e.target.value);
  e.target.className = "addedCategory";
  console.log("Categories", categories);
  return categories;
}

function removeCategory(e) {
  categories = categories.filter((cat) => cat !== e.target.value);
  e.target.className = "addCategoryBtn";
  console.log("Categories", categories);
}

function addCategory(e) {
  return !categories.includes(e.target.value)
    ? categoryLogic(e)
    : removeCategory(e);
}

function sizesLogic(e) {
  sizes.push(e.target.value);
  e.target.className = "addedSize";
  console.log("Sizes", sizes);
  return sizes;
}

function removeSize(e) {
  sizes = sizes.filter((cat) => cat !== e.target.value);
  e.target.className = "addSizeBtn";
  console.log("Sizes", sizes);
}

function addSize(e) {
  return !sizes.includes(e.target.value) ? sizesLogic(e) : removeSize(e);
}

function getResult() {
  return JSON.stringify([categories, sizes, additionalImages, gender]);
}
function validateForm(e) {
  if (categories.length === 0) {
    e.preventDefault();
    alert("Please select atleast one category.");
    return 0;
  } else if (sizes.length === 0) {
           e.preventDefault();
           alert("Please select atleast one size.");
           return 0;
         } else {
           alert("Product added successfully.");
           return true;
         }
}
    let additionalImages = [];
function addImages() {

const imagesDiv = document.getElementById("images-div");

  const imagesInput = document.createElement("input");
  imagesInput.setAttribute("type", "text")

  const deleteImageBtn = document.createElement("button")
  deleteImageBtn.setAttribute("type", "button")
  deleteImageBtn.innerHTML = "&times";

  const addNewImageDiv = document.createElement("div");
  addNewImageDiv.appendChild(imagesInput)
  addNewImageDiv.appendChild(deleteImageBtn);

  imagesDiv.appendChild(addNewImageDiv)

  deleteImageBtn.addEventListener("click", function() {
    imagesDiv.removeChild(addNewImageDiv)
  })

  imagesInput.addEventListener("change", function() {
      const imageUrlValue = event.target.value
      additionalImages.push(event.target.value);
      console.log(additionalImages);
  })
}

function getImageUrls() {
    return additionalImages;
}

  const men = document.getElementById("gender-men");
  const women = document.getElementById("gender-women");


function selectGender(event) {
  gender.fill(event.target.value)
  console.log(gender)
  if (gender[0] === "Men") {
    men.style.backgroundColor = "black"
    men.style.color = "white";
    women.style.backgroundColor = "white";
    women.style.color = "black";

  } else if (gender[0] === "Women") {
    women.style.backgroundColor = "black";
    women.style.color = "white";

    men.style.backgroundColor = "white"
    men.style.color = "black";

  }
}