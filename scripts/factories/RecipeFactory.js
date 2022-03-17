export default class RecipeFactory {
    constructor(objet) {
        this.objet = objet;
    }
    createRecipeCards() {
        const article = document.createElement("article");
        article.innerHTML = `
        <div class="imgRecette"></div>
        <div class="legende">
            <div class="titre">
                <h2>${this.objet.name}</h2>
                <span><img src="assets/icons/clock.svg" alt="" />${this.objet.time} min</span>
            </div>
            <div class="description">
                <ul>
                    ${this.createLi()}
                </ul>
                <p>${this.objet.description}</p>
            </div>
        </div>`;
        const node = document.querySelector(".sectionRecettes");
        return article
    }
    createLi() {
        const arrayLi = this.objet.ingredients;
        let newLi = "";
        let x = 0;
        while (x < arrayLi.length) {
            if (this.objet.ingredients[x]["unit"]) {
                newLi = newLi + `<li><span>${this.objet.ingredients[x]["ingredient"]}:</span> ${this.objet.ingredients[x]["quantity"]} ${this.objet.ingredients[x]["unit"]}</li>`;
            } else if (this.objet.ingredients[x]["quantity"]) {
                newLi = newLi + `<li><span>${this.objet.ingredients[x]["ingredient"]}:</span> ${this.objet.ingredients[x]["quantity"]}</li>`;
            } else {
                newLi = newLi + `<li><span>${this.objet.ingredients[x]["ingredient"]}</span></li>`;
            }
            x++;
        }
        return newLi
    }
}
// carote poisson tahicienne sucre limo coco corrigés: quantite