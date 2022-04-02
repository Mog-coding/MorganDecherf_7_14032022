 // listen liste + cree tags
 function listenListCreateTags() {
  const nodeSectionTag = document.querySelector(".sectionTags");
  const nodesList = document.querySelectorAll(".itemLiFilter");

  // A modifier sur TOUTES les listes <li> pour chaque appel
  // Ajout Listener sur chaque ingrédient de la liste
  nodesList.forEach((el) => {
     el.addEventListener("click", (event) => {
        const tagName = event.target.textContent;

        /******* Clic sur liste *******/
        // Depuis <li> cliquée vers <input> de la <li>
        closeDropDown(event.target.parentElement.previousElementSibling);

        // Creation du tag
        const tag = document.createElement("button");
        tag.innerHTML = `${tagName}
        <img src="assets/icons/croix.svg" alt="" />`;
        tag.classList.add("btnTag");

        if (event.target.parentElement.id === "ingredientList") {
           tag.classList.add("colorIngredient");
        } else if (event.target.parentElement.id === "appareilList") {
           tag.classList.add("colorAppareil")
        }

        selectedTags[event.target.parentElement.id].push(tagName);

        nodeSectionTag.appendChild(tag);

        console.log(filteredRecipes);
        // Filtre tableau recette avec nom tag
        filterRecipes(event.target);
        console.log(filteredRecipes);

        // Régénération de toutes les listes sans les noms de tag
        createListWithoutTagName();

        // Récursivité 
        listenListCreateTags();


        /******* Clic sur tag *******/
        nodeSectionTag.lastChild.addEventListener("click", (event) => {

           // Supression du tag
           event.target.remove();

           // Filtre tableau recette
           const nodeTags = document.querySelectorAll(".btnTag");

           // Remise état origine tableau recette
           filteredRecipes = [...recipeService.recipes];

           // Si tag, filtre du tableau avec chaque tag 
           if (nodeTags) {
              nodeTags.forEach((el) => {
                 filterRecipesWithTag(el.innerText);
              })
           }
           // Régénération liste ingrédients sans les noms de tag
           createListWithoutTagName();

           // Récursivité 
           listenListCreateTags();

        })
     })
  })
}