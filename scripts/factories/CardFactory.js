export default class CardFactory {
    constructor(objet) {
        this.objet = objet; 
    }
    createRecipeCards(){
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
                    <li><span>${this.objet.ingredients[0]["ingredient"]}:</span> ${this.objet.ingredients[0]["quantity"]} ${this.objet.ingredients[0]["unit"]}</li>
                    <li><span>${this.objet.ingredients[1]["ingredient"]}:</span> ${this.objet.ingredients[1]["quantity"]} ${this.objet.ingredients[1]["unit"]}</li>
                    <li><span>${this.objet.ingredients[2]["ingredient"]}:</span> ${this.objet.ingredients[2]["quantity"]} ${this.objet.ingredients[2]["unit"]}</li>
                </ul>
                <p>${this.objet.description}</p>
            </div>
        </div>`;
        const node = document.querySelector(".sectionRecettes");
        return article
    }
}