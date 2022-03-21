
      // Fonction de recherche recette sur propriétés name, ingredients, description 
      function filter() {
        const arrayData = recipes;
        const arrayFiltered = [];
        const saisie = "CiT";
        const saisieLow = saisie.toLowerCase();

        arrayData.forEach(function (objet) {
           const nameLow = objet.name.toLowerCase();
           const descriptionLow = objet.description.toLowerCase();

           if (nameLow.includes(saisieLow)) {
              console.log("name trouvé");
              arrayFiltered.push(objet)
           } 
           else if (descriptionLow.includes(saisieLow)) {
              console.log("description trouvée");
              arrayFiltered.push(objet)
           } 
           else {
              objet.ingredients.forEach((obj) => {
                 // obj = {ingre: "kiwi", quantity:, unit:}
                 const ingredientLow = obj.ingredient.toLowerCase();
                 if (ingredientLow.includes(saisieLow)) {
                    console.log("ingrédient trouvé")
                    arrayFiltered.push(objet)
                 }
              })
           }
        })
        console.log(arrayFiltered);
     }
     filter();