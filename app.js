class Price {
  constructor(apiResource, coinId, currency) {
    this.coinId = coinId;
    this.currency = currency;
    this.apiResource = apiResource;
  }

  async getResource() {
    const response = await axios.get(this.apiResource, {
      params: { ids: this.coinId, vs_currencies: this.currency },
    });

    return response.data;
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

const checkPrice = new Price(
  "https://api.coingecko.com/api/v3/simple/price",
  "bitcoin,ethereum",
  "usd"
);

checkPrice.displayResult();

// axios
//   .get("https://api.coingecko.com/api/v3/simple/price", {
//     params: { ids: "bitcoin,ethereum", vs_currencies: "eur" },
//   })
//   .then((res) => console.log(res.data))
//   .catch((err) => console.error(err));
