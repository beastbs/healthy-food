export async function getCurrencyRates() {
  const baseUrl = "";

  try {
    const response = await fetch(baseUrl);
    const toJson = await response.toJson();
    return toJson;
  } catch (error) {
    throw new Error(error.message);
  }
}
