import { Details } from "./details.js";
import { Ui } from "./design.js";

export class Games {
    constructor() {
        this.getGames("mmorpg");

        document.querySelectorAll(".menu a").forEach((link) => {
            link.addEventListener("click", (e) => {
                document.querySelector(".menu .active").classList.remove("active");
                e.target.classList.add("active");
                this.getGames(e.target.dataset.category);
            });
        });

        this.ui = new Ui();
    }

    async getGames(category) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("d-none");
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b6b705d33emshf9fda1e793b671cp1aa0f6jsn4aefb57721a8',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        const response = await api.json();

        this.ui.displayDataGame(response);
        this.startEvent();  
        loading.classList.add("d-none");
    }

    startEvent() {
        document.querySelectorAll(".card").forEach((item) => {
            item.addEventListener("click", () => {
                const id = item.dataset.id;
                this.showDetails(id);
            });
        });
    }

    showDetails(idGame) {
        const details = new Details(idGame);
        document.querySelector(".games").classList.add("d-none");
        document.querySelector(".details").classList.remove("d-none");
    }
}
