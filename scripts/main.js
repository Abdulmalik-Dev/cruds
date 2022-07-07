// Variables 
let title = document.getElementById("title"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  total = document.getElementById("total"),
  count = document.getElementById("count"),
  category = document.getElementById("category"),
  createBtn = document.getElementById("create"),
  search = document.getElementById("search"),
  sreactByTitleBtn = document.getElementById("search-title"),
  sreactByCategoryBtn = document.getElementById("search-category"),
  deleteAllBtn = document.getElementById("search-delete-all"),
  categoriesContainer = document.querySelector(".gategories"),
  allCategoriesCount = document.getElementById("categories-count"),
  tr = document.createElement("tr"),
  buttonsOfUpdate = [],
  buttonsOfDelete = [];

// Totaly Action
function totalAction() {
  if (
    title.value !== "" &&
    price.value !== "" &&
    taxes.value !== "" &&
    ads.value !== ""
  ) {
    total.innerHTML = `Total ${+price.value + +taxes.value + +ads.value - +discount.value
      }$`;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "red";
    total.innerHTML = "Total";
  }
}

title.addEventListener("input", () => totalAction(this.value));
price.addEventListener("input", () => totalAction(this.value));
taxes.addEventListener("input", () => totalAction(this.value));
ads.addEventListener("input", () => totalAction(this.value));
discount.addEventListener("input", () => totalAction(this.value));

// The Create Action
createBtn.addEventListener("click", () => {
  /*
  Check If The Create Button data-type === create 
    Cerate The Prodict
  Else The Create Button Data-type Will Be Update 
    Make Update On Target Product */
  if (createBtn.dataset.type === "create") {
    if (
      title.value !== "" &&
      price.value !== "" &&
      taxes.value !== "" &&
      ads.value !== "" &&
      category.value !== ""
    ) {
      /*
        If The Count Value === Nothing
          Create One Product 
        Elese 
          Create Many Products  */
      if (count.value === "") createProduct();
      else {
        for (let i = 0; i < count.value; i++) createProduct();
      }

      makeAllInputsEmpty();
    }
  } else {
    doneUpdating(document.querySelectorAll("[data-target='true']"));
    makeAllInputsEmpty();
  }
});

function makeAllInputsEmpty() {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));

  total.innerHTML = "Total";
  total.style.backgroundColor = "red";
}

/*All These Parameters Will Used Just On Load The Page
 Because I Don't Wanna Get The Values From Inputs 
 But I Wanna Get The Values From The Local Storage */
function createProduct(
  theTitle = title.value,
  thePrice = price.value,
  theTaxes = taxes.value,
  theAds = ads.value,
  theDiscount = discount.value === "" ? "1" : discount.value,
  theTotal = total.innerHTML.split(" ")[1],
  theCategory = category.value
) {
  // Create All Elements 
  let tr = document.createElement("tr"),
    idEl = document.createElement("td"),
    idText = document.createTextNode("ID"),
    titleEl = document.createElement("td"),
    titleText = document.createTextNode(theTitle),
    priceEl = document.createElement("td"),
    priceText = document.createTextNode(thePrice),
    taxesEl = document.createElement("td"),
    taxesText = document.createTextNode(theTaxes),
    adsEl = document.createElement("td"),
    adsText = document.createTextNode(theAds),
    discountEl = document.createElement("td"),
    discountText = document.createTextNode(theDiscount),
    totalEl = document.createElement("td"),
    totalText = document.createTextNode(theTotal),
    categoryEl = document.createElement("td"),
    categoryText = document.createTextNode(theCategory),
    updateBtnContainer = document.createElement("td"),
    updateBtnEl = document.createElement("button"),
    updateBtnText = document.createTextNode("Update"),
    deleteBtnContainer = document.createElement("td"),
    deleteBtnEl = document.createElement("button"),
    deleteBtnText = document.createTextNode("Delete");

  // The Elements' Extensions 
  tr.dataset.items = "true";
  idEl.dataset.id = "true";
  updateBtnEl.className = "update-category";
  deleteBtnEl.className = "delete-category";
  titleEl.dataset.value = "title";
  priceEl.dataset.value = "price";
  taxesEl.dataset.value = "taxes";
  adsEl.dataset.value = "ads";
  discountEl.dataset.value = "discount";
  totalEl.dataset.value = "total";
  categoryEl.dataset.value = "category";

  // Append All Elements To Its Parent
  idEl.appendChild(idText);
  titleEl.appendChild(titleText);
  priceEl.appendChild(priceText);
  taxesEl.appendChild(taxesText);
  adsEl.appendChild(adsText);
  discountEl.appendChild(discountText);
  discountEl.appendChild(discountText);
  totalEl.appendChild(totalText);
  categoryEl.appendChild(categoryText);
  updateBtnEl.appendChild(updateBtnText);
  updateBtnContainer.appendChild(updateBtnEl);
  deleteBtnEl.appendChild(deleteBtnText);
  deleteBtnContainer.appendChild(deleteBtnEl);

  tr.appendChild(idEl);
  tr.appendChild(titleEl);
  tr.appendChild(priceEl);
  tr.appendChild(taxesEl);
  tr.appendChild(adsEl);
  tr.appendChild(discountEl);
  tr.appendChild(totalEl);
  tr.appendChild(categoryEl);
  tr.appendChild(updateBtnContainer);
  tr.appendChild(deleteBtnContainer);

  categoriesContainer.appendChild(tr);

  // Push All Buttons For Update And Delete To An Array To Make Action On Click On Them
  buttonsOfUpdate.push(updateBtnEl);
  buttonsOfDelete.push(deleteBtnEl);

  generateID();
  updateAction();
  deleteAction();
  categoriesCount();
  saveItems();
}

// Set The Id 
function generateID() {
  let ids = document.querySelectorAll("[data-id]");

  ids.forEach((id, i) => (id.innerHTML = i + 1));
}

function updateAction() {
  // Make Loop To All Update Buttons 
  buttonsOfUpdate.forEach((btn) =>

    btn.addEventListener("click", (e) => {
      // This Dataset Will Added To The Click Product Parent 
      document
        .querySelectorAll("[data-target]")
        .forEach((el) => (el.dataset.target = "false"));

      let values = [...e.target.parentElement.parentElement.children], // All Td Element For The Target Product 
        tds = document.querySelectorAll("td"); // All Tds

      // Get The Total 
      values.forEach((getTotal) => {
        if (getTotal.dataset.value === "total") {
          total.innerHTML = `Total ${getTotal.innerHTML}`;
          total.style.backgroundColor = "green";
        }
      });

      // To Add The Values On The Inputs 
      values.forEach((element) => {
        let targetElement = document.getElementById(element.dataset.value);

        targetElement !== null
          ? (targetElement.value = element.innerHTML)
          : null;
      });

      /*
      If The Element innerHTML === Input Value 
        Make The Data Taget For This Parent Element === True To Make The Update On It 
        Else 
        Make The Data Taget For This Parent Element === False To Don't Make The Update On It */

      document.querySelectorAll("[data-value='title']").forEach((ele) => {
        ele.innerHTML === title.value
          ? (ele.parentElement.dataset.target = "true")
          : (ele.parentElement.dataset.target = "false");
      });

      // Set The Count Value 
      count.value = 0;
      tds.forEach((td) => {
        td.innerHTML == category.value ? count.value++ : null;
      });

      // Reset The Data-type For The Create Button Make It Update 
      createBtn.innerHTML = "Update";
      createBtn.dataset.type = "update";

      // Make Page scroll === 0 
      window, scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  );
}

function doneUpdating(element) {
  // Remove All Taget Elements 
  element.forEach((e) => e.remove());

  // Recreate Theme 
  if (count.value === "" || count.value == 1) createProduct();
  else for (let i = 0; i < count.value; i++) createProduct();

  // Reset The Create Button Data-type Make It Create 
  createBtn.dataset.type = "create";
  createBtn.innerHTML = "Create";
}

// Delete Products Actions
function deleteAction() {
  buttonsOfDelete.forEach((button) =>
    button.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();

      generateID();
      categoriesCount();
      saveItems();
    })
  );
}

// Set The Categories Count 
function categoriesCount() {
  allCategoriesCount.innerHTML = document.querySelectorAll(
    "[data-value='title']"
  ).length;
}

// Delete All Products 
deleteAllBtn.addEventListener("click", () => {
  document
    .querySelectorAll("[data-id]")
    .forEach((element) => element.parentElement.remove());

  categoriesCount();
  saveItems();
});

// Search Action
function searchAction(text, searchBy) {
  search.placeholder = text;

  search.addEventListener("input", () => {
    let tds = document.querySelectorAll(`[data-value=${searchBy}]`);

    tds.forEach((td) => {
      td.innerHTML.indexOf(search.value) < 0
        ? td.parentElement.classList.add("hide")
        : td.parentElement.classList.remove("hide");
    });
  });
}

sreactByTitleBtn.addEventListener("click", () =>
  searchAction(sreactByTitleBtn.innerHTML, "title")
);
sreactByCategoryBtn.addEventListener("click", () =>
  searchAction(sreactByCategoryBtn.innerHTML, "category")
);

// Save Products To Local Storage
function saveItems() {
  // All These Arrays Created To Cash The Values 
  let titles = [],
    prices = [],
    taxes = [],
    ads = [],
    discounts = [],
    totals = [],
    categories = [];

  // Cash The Values To the Arrays 
  document
    .querySelectorAll("[data-value='title']")
    .forEach((title) => titles.push(title.innerHTML));
  document
    .querySelectorAll("[data-value='price']")
    .forEach((title) => prices.push(title.innerHTML));
  document
    .querySelectorAll("[data-value='taxes']")
    .forEach((title) => taxes.push(title.innerHTML));
  document
    .querySelectorAll("[data-value='ads']")
    .forEach((title) => ads.push(title.innerHTML));
  document
    .querySelectorAll("[data-value='discount']")
    .forEach((title) => discounts.push(title.innerHTML));
  document
    .querySelectorAll("[data-value='total']")
    .forEach((title) => totals.push(title.innerHTML));
  document
    .querySelectorAll("[data-value='category']")
    .forEach((title) => categories.push(title.innerHTML));

  // Cash All Values To An Object To Save Them To The Local Storage 
  let items = {
    titles,
    prices,
    taxes,
    ads,
    discounts,
    totals,
    categories,
  };

  localStorage.setItem("items", JSON.stringify(items));
}

window.onload = () => {
  /*
  Check If There Is A Product 
    Appear It On The Page */
  if (localStorage.length >= 1) {
    let items = JSON.parse(localStorage.getItem("items"));

    for (let i = 0; i < items['titles'].length; i++) {
      createProduct(
        items.titles[i],
        items.prices[i],
        items.taxes[i],
        items.ads[i],
        items.discounts[i],
        items.totals[i],
        items.categories[i]
      );
    }
  }
};
