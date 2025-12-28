let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function save() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function render() {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  recipes.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "recipe";

    div.innerHTML = `
      <h3>${r.title}</h3>
      <strong>Ingredients:</strong>
      <pre>${r.ingredients}</pre>
      <strong>Steps:</strong>
      <pre>${r.steps}</pre>
      <button onclick="deleteRecipe(${i})">Delete</button>
    `;

    container.appendChild(div);
  });
}

function addRecipe() {
  const title = document.getElementById("title").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const steps = document.getElementById("steps").value.trim();

  if (!title) return alert("Add a recipe name");

  recipes.push({ title, ingredients, steps });
  save();
  render();

  document.getElementById("title").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("steps").value = "";
}

function deleteRecipe(i) {
  recipes.splice(i, 1);
  save();
  render();
}

render();