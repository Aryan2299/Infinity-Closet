const mobile = window.matchMedia("(min-width: 1025px)");

// const rentOptions = document.createElement("form");
// const btn = document.createElement("button");
// const hiddenInputProductId = document.createElement("input");
const wishlist = document.createElement("a");
const heartIcon = document.createElement("i");
const sortByButton = document.getElementById("sortByButton");
const optionsBar = document.getElementById("optionsBar");
const footer = document.getElementById("footer");
const sideNav = document.getElementById("sideNav");
const category = document.getElementsByClassName("category");
const searchInput = document.getElementById("searchInput");
const searchbar = document.getElementById("searchbar");
const searchIcon = document.getElementsByClassName(".fa-search");
const sizeBtn = document.getElementsByClassName("size-btn");

wishlist.setAttribute("href", "#");
heartIcon.setAttribute("class", "fa fa-heart");
wishlist.appendChild(heartIcon);

rentOptions.style.display = "flex";
rentOptions.style.marginTop = "50px";
rentOptions.style.alignItems = "center";
rentOptions.setAttribute("action", "/product/<%=product._id%>");
rentOptions.setAttribute("method", "POST");

hiddenInputProductId.setAttribute("type", "hidden");
hiddenInputProductId.setAttribute("name", "productId");
hiddenInputProductId.setAttribute("value", "<%=product._id%>");

btn.setAttribute("class", "btn btn-success");
btn.setAttribute("type", "submit");

btn.innerText = "Rent Now";
btn.style.padding = "3px 5px";
btn.style.width = "85%";
btn.style.margin = "20px 10px 5px 0px";
btn.style.padding = "3px 5px";

heartIcon.style.fontSize = "22px";
heartIcon.style.color = "#fbfbfb";
heartIcon.style.bottom = "15px";
heartIcon.style.position = "absolute";

const cards = document.getElementsByClassName("productCard");
const heartHover = document.getElementsByClassName("fa-heart");

rentOptions.appendChild(btn);
rentOptions.appendChild(wishlist);
rentOptions.appendChild(hiddenInputProductId);

for (let i = 0; i < cards.length; i++) {
  mobile.matches
    ? cards[i].addEventListener("mouseenter", function (e) {
        cards[i].appendChild(btn);
        cards[i].appendChild(wishlist);
      })
    : null;
  mobile.matches
    ? cards[i].addEventListener("mouseleave", function (e) {
        cards[i].removeChild(btn);
        cards[i].removeChild(wishlist);
      })
    : null;
}

heartIcon.addEventListener("mouseenter", function () {
  heartIcon.style.color = "#DC143C";
});
heartIcon.addEventListener("mouseleave", function () {
  heartIcon.style.color = "#fbfbfb";
});

const dropDownBtn = document.getElementById("optionsBar");
mobile.matches
  ? dropDownBtn.addEventListener("mouseover", function () {
      const men = document.getElementById("mensPage");
      // men.style.filter = "brightness(20%) ";
      men.style.opacity = mobile.matches ? 1 : 0.1;
    })
  : null;
mobile.matches
  ? dropDownBtn.addEventListener("mouseleave", function () {
      const men = document.getElementById("mensPage");
      // men.style.filter = "brightness(100%)";
      men.style.opacity = 1;
    })
  : null;

function showSideBar() {
  sideNav.style.width = "120%";
  sideNav.style.height = "100vh";
  sideNav.style.margin = "10px 10px";
  sideNav.style.alignItems = "space-around";
}
function hideSideBar() {
  sideNav.style.width = 0;
}

function showFilterOptions() {
  const filterOpt = document.getElementsByClassName("filterOpt");

  if (!mobile.matches) {
    const men = document.getElementById("mensPage");
    if (filterOpt[0].style.display === "flex") {
      filterOpt[0].style.display = "none";
      men.style.opacity = 1;
    } else {
      filterOpt[0].style.display = "flex";
      men.style.opacity = 0.2;
    }

    filterOpt[0].style.flexDirection = "column";
    filterOpt[0].style.position = "fixed";
    filterOpt[0].style.zIndex = 3;
    filterOpt[0].style.border = "1px solid #404040";
  }
}

function showSortByOptions() {
  const filterOpt = document.getElementsByClassName("sortByOpt");

  if (!mobile.matches) {
    const men = document.getElementById("mensPage");
    if (filterOpt[0].style.display === "flex") {
      filterOpt[0].style.display = "none";
      men.style.opacity = 1;
    } else {
      filterOpt[0].style.display = "flex";
      // filterOpt[0].style.zIndex = 3
      men.style.opacity = 0.2;
    }

    filterOpt[0].style.flexDirection = "column";
    filterOpt[0].style.position = "fixed";
    filterOpt[0].style.zIndex = 3;
    filterOpt[0].style.border = "1px solid #404040";
  }
}

const products = document.getElementById("productCard");

mobile.matches ? products.setAttribute("class", "col-sm-6") : null;

!mobile.matches ? (optionsBar.style.top = 0) : null;
!mobile.matches ? (optionsBar.style.marginTop = "16.1vh") : null;


