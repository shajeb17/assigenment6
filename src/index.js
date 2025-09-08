let catagoryName = document.querySelector(".catagoryName");
async function catagory() {
 
  let url = `https://openapi.programming-hero.com/api/categories`;
  let firstFetch = await fetch(url);
  let firstJson = await firstFetch.json();
  firstJson.categories.forEach((names) => {
    let listName = `
             <p onclick="treename(${names.id})" class="px-3 py-2 rounded-md text-gray-800 newcls singleTag${names.id} hover:bg-green-100 cursor-pointer">
                ${names.category_name}
            </p>
        
    `;
    catagoryName.innerHTML += listName;
  });

}


let cardAll = document.querySelector(".cardAll");
async function allPlants() {
  manageSpinner(true)
  let plantUrl = `https://openapi.programming-hero.com/api/plants`;
  let plantFetch = await fetch(plantUrl);
  let plantjson = await plantFetch.json();

  plantjson.plants.forEach((plantSection) => {
    let plntCard = `
                          <div class="cardValue mb-4 rounded-xl  shadow-md bg-white h-[450px]">
                    <div class="w-full h-[200px] bg-gray-200 rounded-t-xl"><img class="h-full w-full" src="${plantSection.image}" alt=""></div>
                    <div class="p-4">
                        <h3 onclick=newCard(${plantSection.id}) class="text-lg font-bold nameTree">${plantSection.name}</h3>
                        <p class="text-gray-600 text-[12px] mt-1">
                            ${plantSection.description}
                        </p>
                        <div class="flex items-center justify-between mt-3">
                            <span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                                ${plantSection.category}</span>
                            <span class="text-gray-800 font-semibold priceTree">৳${plantSection.price}</span>
                        </div>
                        <button 
                            class="addBtnClick w-full mt-4 bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>

        `;

    cardAll.innerHTML += plntCard;
  });
  manageSpinner(false)
}

async function treename(id) {
  manageSpinner(true)
  document.querySelectorAll(".newcls").forEach((clsAdd) => {
    clsAdd.classList.remove("active");
  });

  cardAll.innerHTML = "";
  let secondUrl = `https://openapi.programming-hero.com/api/category/${id}`;
  let secondFetch = await fetch(secondUrl);
  let secondjson = await secondFetch.json();
  secondjson.plants.forEach((allSection) => {
    let fullCard = `
                          <div class="cardValue mb-4 rounded-xl  shadow-md bg-white h-[450px]">
                    <div class="w-full h-[200px] bg-gray-200 rounded-t-xl"><img class="h-full w-full object-cover" src="${allSection.image}" alt=""></div>
                    <div class="p-4">
                        <h3 onclick="newCard(${allSection.id})" class="text-lg font-bold nameTree">${allSection.name}</h3>
                        <p class="text-gray-600 text-[12px] mt-1">
                            ${allSection.description}
                        </p>
                        <div class="flex items-center justify-between mt-3">
                            <span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                                ${allSection.category}</span>
                            <span class="text-gray-800 font-semibold priceTree">৳${allSection.price}</span>
                        </div>
                        <button onclick="showClick()"
                            class="addBtnClick w-full mt-4 bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>

        `;

    cardAll.innerHTML += fullCard;
  });

  let clickBtn = document.querySelector(`.singleTag${id}`);
  clickBtn.classList.add("active");
   manageSpinner(false)
}



let modalCheckbox = document.querySelector("#my_modal_6");
let modal=document.querySelector(".modal")
async function newCard(num) {
  let addUrl = `https://openapi.programming-hero.com/api/plant/${num}`;
  let addFetch = await fetch(addUrl);
  let addJson = await addFetch.json();
  let card = `
              <div class="modal-box">
            <h3 class="text-lg font-bold">${addJson.plants.name}</h3>
            <img src="${addJson.plants.image}" alt="" class="w-full h-[233px] object-cover">
            <h2 class="py-4"><b>Caragor:</b> ${addJson.plants.category}</h2>
            <h2><b>Price: </b>${addJson.plants.price}</h2>
            <p><b>Descripction: </b>${addJson.plants.description}</p>
            <div class="modal-action">
                <label for="my_modal_6" class="btn">Close!</label>
            </div>
        </div>
   `;
   modal.innerHTML=card
    modalCheckbox.checked = true;
}

let priceTag = document.querySelector(".priceTag");
let mainprice = 0;


cardAll.addEventListener("click", function (e) {
  let cardValue = e.target.closest(".cardValue");

  let nameTree = cardValue.querySelector(".nameTree");
  let priceTree = cardValue.querySelector(".priceTree");

  if (e.target.classList.contains("addBtnClick")) {
    let moneyValu = document.querySelector(".moneyValu");

    let price = parseInt(priceTree.innerHTML.replace("৳", ""));
    mainprice += price;

    let card = `
      <div class="bg-gray-50 rounded-lg p-4 mb-4 flex justify-between items-center shadow-sm singleCard" data-price="${price}">
        <div>
          <p class="text-lg font-medium text-gray-700">${nameTree.innerHTML}</p>
          <p class="text-sm text-gray-500">${priceTree.innerHTML} × 1</p>
        </div>
        <button onclick="btnremover(this,${price})" class="removeBtn text-gray-400 hover:text-gray-600 transition-colors">❌</button>
      </div>
    `;
    alert(`${nameTree.innerHTML} has been added to the card`);
    if (moneyValu) {
      moneyValu.insertAdjacentHTML("beforebegin", card);
    } else {
      priceTag.insertAdjacentHTML("beforeend", card);
    }

    let total = `
      <div class="moneyValu flex justify-between items-center pt-4 border-t border-gray-200">
        <p class="text-lg font-semibold text-gray-800">Total:</p>
        <p class="text-lg font-bold text-gray-900 totalMain">৳${mainprice}</p>
      </div>
    `;

    if (!moneyValu) {
      priceTag.insertAdjacentHTML("beforeend", total);
    } else {
      moneyValu.querySelector(".totalMain").innerText = `৳${mainprice}`;
    }
  }
});

function btnremover(button, prices) {
  let parentCard = button.closest(".singleCard");
  parentCard.remove();

  mainprice -= prices;
  let moneyValu = document.querySelector(".moneyValu");
  if (moneyValu) {
    moneyValu.querySelector(".totalMain").innerText = `৳${mainprice}`;
  }
}


function manageSpinner(status) {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.querySelector(".cardAll").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.querySelector(".cardAll").classList.remove("hidden");
  }
}


allPlants();
catagory();
