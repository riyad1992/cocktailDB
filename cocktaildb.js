document.getElementById('input-button').addEventListener('click', function(){
    const inputValue = document.getElementById('input-value')
    const searchText = inputValue.value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearch(data.drinks))
    inputValue.value = ''
})
const displaySearch = (datas) => {
    const displayDiv = document.getElementById('display-search')
    displayDiv.textContent = ''
    datas.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div onclick = "drinkDetails(${data.idDrink})" class="card">
            <img src="${data.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.strDrink}</h5>
                <p class="card-text">${data.strInstructions.slice(0, 40)}</p>
            </div>
        </div>`
        displayDiv.appendChild(div)
    })
}

const drinkDetails = id => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.drinks[0]))
}

const displayDetails = (details) => {
    const detailsDiv = document.getElementById('details')
    detailsDiv.textContent = ''
    const div = document.createElement('div')
    div.classList.add('row')
    div.innerHTML = `
    <div class="col-md-4">
        <img src="${details.strDrinkThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${details.strDrink}</h5>
            <p class="card-text">${details.strInstructionsDE.slice(0, 120)}</p>
            <p class="card-text"><small class="text-muted">Last updated ${details.dateModified}</small></p>
        </div>
    </div>`
    detailsDiv.appendChild(div)
}