const proxyUrl = 'https://api.allorigins.win/get?url=';
const url = 'https://cdn.drcode.ai/interview-materials/products.json';
const options = {
    
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers':
          'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
      },
  
};
try {
    const response = await fetch(url, options);
    const result = await response.text();
} catch (error) {
    console.log(error);
}

export async function fetchData() {
    const response = await fetch(proxyUrl + encodeURIComponent(url));
    const result = await response.json();
    const products = JSON.parse(result.contents).products;
    return Object.values(products);
}