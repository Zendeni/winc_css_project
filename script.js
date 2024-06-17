document.addEventListener("DOMContentLoaded", () => {
    loadRecipes();

    const checkbox = document.getElementById("checkbox");
    checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark");
    });
});

async function loadRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    try {
        const response = await fetch('recipes/index.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const recipes = await response.json();

        for (const recipeFile of recipes) {
            const recipeResponse = await fetch(`recipes/${recipeFile}`);
            if (!recipeResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const recipe = await recipeResponse.json();
            displayRecipe(recipe);
        }
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

function displayRecipe(recipe) {
    const recipeList = document.getElementById('recipe-list');

    const recipeEl = document.createElement('div');
    recipeEl.className = 'recipe';

    const titleEl = document.createElement('div');
    titleEl.className = 'recipe-title';
    titleEl.textContent = recipe.title;

    const ingredientsEl = document.createElement('div');
    ingredientsEl.className = 'recipe-ingredients';
    ingredientsEl.textContent = 'Ingredients: ' + recipe.ingredients.join(', ');

    const codeEl = document.createElement('div');
    codeEl.className = 'recipe-code';
    codeEl.textContent = recipe.code;

    recipeEl.appendChild(titleEl);
    recipeEl.appendChild(ingredientsEl);
    recipeEl.appendChild(codeEl);

    recipeList.appendChild(recipeEl);
}

function searchRecipes() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const recipeEls = document.querySelectorAll('.recipe');

    recipeEls.forEach(recipeEl => {
        const title = recipeEl.querySelector('.recipe-title').textContent.toLowerCase();
        const ingredients = recipeEl.querySelector('.recipe-ingredients').textContent.toLowerCase();
        
        if (title.includes(query) || ingredients.includes(query)) {
            recipeEl.style.display = '';
        } else {
            recipeEl.style.display = 'none';
        }
    });
}
