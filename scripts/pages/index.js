/* imports */
import CardFactory from "../factories/cardFactory.js";
import Recipe from "../model/Recipe.js";


/* Récupération des données avec fetch */
fetch("data/recipes.json") // Promise résolue: serveur répond
   .then((response) => {  // Promise résolue: data chargée  
      return response.json();
   })
   .then((response) => { // Promise résolue: retourne data
      const {recipes} = response;
      console.log(recipes); // [{..}, {..},] 50 objets
      const recipesInst = recipes.map(function(el){
           const test = new Recipe(el);
           return new CardFactory(test)
      })
      console.log(recipesInst)
      recipesInst.forEach(function(el){
         const node = document.querySelector(".sectionRecettes");
         node.appendChild(el.createRecipeCards());
      })
   })