// const pokenmonInput = document.getElementById("pokemonInput")
// const pokemonBtn = document.getElementById("pokemonBtn")
// const pokemenBlock = document.getElementById("pokomenBlock")

// pokemonBtn.addEventListener("click", loadPokemon)

// async function loadPokemon(){
//     const name = pokenmonInput.value.trim().toLowerCase()

//     if(name === ""){
//         pokemenBlock.innerHTML = "<p>Введите имя покемона</p>"
//         return
//     }

//     try{
//         pokemenBlock.innerHTML = "<p>Загрузка</p>"
        
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

//         if(!response.ok){
//             throw new Error("Покемон не найден")
//         }
//         const pokemon = await response.json()

//         renderPokemon(pokemon)
//     }
//     catch(error){
//         pokemenBlock.innerHTML = `<p>${error.message}</p>`
//     }
// }

// function renderPokemon(pokemon){
//     pokemenBlock.innerHTML = `
//     <div>
//         <h2>${pokemon.name}</h2>
//         <img src ="${pokemon.sprites.front_default}" width = "150">
//         <p>Рост: ${pokemon.height}</p>
//         <p>Вес: ${pokemon.weight}</p> 
//     </div>
//     `
// }

const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const countryBlock = document.getElementById("countryBlock");

searchBtn.addEventListener("click", loadCountry);

async function loadCountry() {
    const countryName = countryInput.value.trim();

    if (countryName === "") {
        countryBlock.innerHTML = `<p class="error">Введите название страны</p>`;
        return;
    }

    try {
        countryBlock.innerHTML = `<p>Загрузка...</p>`;

        const response = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}`
        );

        if (!response.ok) {
            throw new Error("Страна не найдена");
        }

        const data = await response.json();

        const country = data[0];

        renderCountry(country);

    } catch (error) {
        countryBlock.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function renderCountry(country) {
    const name = country.name.common;
    const capital = country.capital ? country.capital[0] : "Нет данных";
    const population = country.population.toLocaleString();
    const region = country.region;
    const flag = country.flags.png;
    const currency = country.currencies
        ? Object.values(country.currencies)[0].name
        : "Нет данных";

    countryBlock.innerHTML = `
        <div class="country-card">
            <img src="${flag}" alt="Флаг ${name}">
            <h2>${name}</h2>
            <p><strong>Столица:</strong> ${capital}</p>
            <p><strong>Регион:</strong> ${region}</p>
            <p><strong>Население:</strong> ${population}</p>
            <p><strong>Валюта:</strong> ${currency}</p>
        </div>
    `;
}