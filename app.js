class Price {
  constructor(apiResource, coinId, currency) {
    this.coinId = coinId.value;
    this.currency = currency.value;
    this.apiResource = apiResource;
  }

  async #getResource() {
    try {
      const response = await axios.get(this.apiResource, {
        params: { ids: this.coinId, vs_currencies: this.currency },
      });

      return response.data;
    } catch (error) {
      document.getElementById("cryptoError").textContent = "Limit exceeded!";
    }
  }

  displayResult() {
    this.#getResource()

      .then((data) => {
        document.getElementById("cryptoTable").innerHTML = " ";

        for (const coin in data) {
          const coinData = data[coin];

          // Get the first currency key dynamically
          const currencyKey = Object.keys(coinData).find(
            (key) => !key.includes("_change")
          );
          const price = coinData[currencyKey];

          const tr = document.createElement("tr");

          const coinTd = document.createElement("td");
          coinTd.classList.add("coin");
          coinTd.textContent = this.coinId;

          const priceTd = document.createElement("td");
          priceTd.classList.add("price");
          priceTd.textContent = `${currencyKey.toUpperCase()}  ${price}`;

          const changeTd = document.createElement("td");
          changeTd.classList.add("change");
          changeTd.textContent = "-";

          tr.appendChild(coinTd);
          tr.appendChild(priceTd);
          tr.appendChild(changeTd);
          document.getElementById("cryptoTable").appendChild(tr);
        }
      })
      .catch((err) => {
        console.log("Data can't be found!");
        document.getElementById("cryptoError").textContent =
          "Data can't be found!";
      });
  }
}
const form = document.getElementById("cryptoForm");
const coinIds = document.getElementById("coinIds");
const currency = document.getElementById("fiat");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (coinIds.value === "") {
    return;
  } else {
    const checkPrice = new Price(
      "https://api.coingecko.com/api/v3/simple/price",
      coinIds,
      currency
    );
    checkPrice.displayResult();

    coinIds.value = "";
    document.getElementById("cryptoError").innerHTML = "";
  }
});
