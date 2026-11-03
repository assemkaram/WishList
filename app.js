// Data
let wishlist = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Headphone" },
  { id: 3, name: "Camera" },
];

let nextId = 4;

// get Elements
const addForm = document.querySelector("#addForm");
const wishInput = document.querySelector("#wishInput");
const wishItems = document.querySelector("#wishItems");
const emptyState = document.querySelector("#emptyState");
const countLabel = document.querySelector("#countLabel");

function render() {
  wishItems.innerHTML = "";
  emptyState.style.display = wishlist.length === 0 ? "block" : "none";

  wishlist.forEach((wish) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    const removeBtn = document.createElement("button");

    li.className = "wish";
    li.dataset.id = wish.id;
    name.textContent = wish.name;

    removeBtn.className = "wish__remove";
    removeBtn.type = "button";
    removeBtn.setAttribute("aria-label", "delete");
    removeBtn.textContent = "x";

    li.append(name, removeBtn);
    wishItems.appendChild(li);
  });

  countLabel.textContent = wishlist.length;
}

// Handler
addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get Value
  const value = wishInput.value.trim();

  if (value === "") return;

  wishlist = [...wishlist, { id: nextId++, name: value }];

  wishInput.value = "";
  wishInput.focus();

  render();
});

wishItems.addEventListener("click", (event) => {
  if (!event.target.classList.contains("wish__remove")) return;

  const li = event.target.closest(".wish");
  const wishId = Number(li.dataset.id);

  wishlist = wishlist.filter((wish) => {
    return wish.id !== wishId;
  });

  render();
});

const clearBtn = document.querySelector("#clearBtn");

clearBtn.addEventListener("click", (event) => {
  wishlist = [];
  render();
});

render();