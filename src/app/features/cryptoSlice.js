async function getData() {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "eb71184572msh8f332283060f7cbp1f341fjsnc4685458b6c2",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  try {
    let response = await fetch(
      "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
      options
    );
    let resulted = await response.json();
    return resulted;
  } catch (err) {
    return err;
  }
}

const result = await getData();
export default result;