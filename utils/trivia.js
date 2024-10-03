export async function fetchQuestion() {
    const response = await fetch('https://opentdb.com/api.php?amount=1&category=21&type=multiple');
    const data = await response.json();
    return data.results[0];
  }