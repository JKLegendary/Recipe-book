let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function save() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function render() {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  const filtered = recipes.filter(r => 
    r.title.toLowerCase().includes(searchTerm) ||
    r.category.toLowerCase().includes(searchTerm)
  );

  filtered.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "recipe";

    div.innerHTML = `
      <h3 onclick="toggleContent(${i})">${r.title} (${r.category})</h3>
      <div class="recipeContent" id="content${i}">
        <strong>Ingredients:</strong>
        <pre>${r.ingredients}</pre>
        <strong>Steps:</strong>
        <pre>${r.steps}</pre>
        <button onclick="deleteRecipe(${i})">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });

  renderCategories();
}

function toggleContent(i) {
  const content = document.getElementById(`content${i}`);
  content.style.display = content.style.display === "block" ? "none" : "block";
}

function addRecipe() {
  const title = document.getElementById("title").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const steps = document.getElementById("steps").value.trim();
  const category = document.getElementById("category").value.trim() || "Uncategorized";

  if (!title) return alert("Add a recipe name");

  recipes.push({ title, ingredients, steps, category });
  save();
  render();

  document.getElementById("title").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("steps").value = "";
  document.getElementById("category").value = "";
}

function deleteRecipe(i) {
  if (confirm(`Are you sure you want to delete "${recipes[i].title}"?`)) {
    recipes.splice(i, 1);
    save();
    render();
  }
}

function renderCategories() {
  const catContainer = document.getElementById("categoriesList");
  const categories = [...new Set(recipes.map(r => r.category))];
  catContainer.innerHTML = "";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => filterByCategory(cat);
    btn.style.marginRight = "5px";
    btn.style.marginBottom = "5px";
    btn.style.background = "#ffb76b";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.padding = "5px 10px";
    catContainer.appendChild(btn);
  });
}

function filterByCategory(cat) {
  document.getElementById("searchInput").value = cat;
  render();
}

render();