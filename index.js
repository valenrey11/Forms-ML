function deleteElements() {
  const productsEls = document.querySelectorAll(".result-item");
  productsEls.forEach((element) => {
    element.remove();
  });
}
function mostrarResultados(data) {
  const contenedor = document.querySelector(".results");
  const template = document.querySelector("#result-item-template");

  for (const r of data.results) {
    const titleEl = template.content.querySelector(
      ".result-item-content-title"
    );
    titleEl.textContent = r.title;

    const priceEl = template.content.querySelector(".result-item-price");
    priceEl.textContent = "$" + r.price;

    const conditionEl = template.content.querySelector(
      ".result-item-content-condition"
    );
    conditionEl.textContent = r.condition;

    const soldEl = template.content.querySelector(
      ".result-item-content-sell-count-numb"
    );
    soldEl.textContent = r.sold_quantity;

    const aEl = template.content.querySelector(".result-a");
    aEl.href = r.permalink;

    const thumbEl = template.content.querySelector(".result-item-img");
    thumbEl.src = r.thumbnail;

    const resultCountEl = document.querySelector(".results-count");
    resultCountEl.textContent = data.paging.total;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}
function main() {
  const formEl = document.querySelector(".search-form");
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    deleteElements();
    const palabraABuscar = e.target.buscar.value;
    console.log(palabraABuscar);

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar)
      .then((response) => response.json())
      .then((data) => mostrarResultados(data));
  });
}

main();
