class Price {
  constructor(apiResource, coinId, currency) {
    this.coinId = coinId.value;
    this.currency = currency.value;
    this.apiResource = apiResource;
  }

  async getResource() {
    try {
      const response = await axios.get(this.apiResource, {
        params: { ids: this.coinId, vs_currencies: this.currency },
      });

      return response.data;
    } catch (error) {
      console.log("Limit exceeded!");
    }
  }

  displayResult() {
    this.getResource()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Data can't be found!");
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
  }
});

// axios
//   .get("https://api.coingecko.com/api/v3/simple/price", {
//     params: { ids: "bitcoin,ethereum", vs_currencies: "eur" },
//   })
//   .then((res) => console.log(res.data))
//   .catch((err) => console.error(err));
