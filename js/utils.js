// export async function getCurrencyRates() {
//   const baseUrl = "";

//   try {
//     const response = await fetch(baseUrl);
//     const toJson = await response.toJson();
//     return toJson;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

function showName(name) {
  console.log(`My name is ${name}`);
}

const result = deleteNotDigit("200%");
console.log(result);
