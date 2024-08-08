const url = 'https://cdn.drcode.ai/interview-materials/products.json'
const options = {
    
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  
};
try {
    const response = await fetch(url, options);
    const result = await response.text();
} catch (error) {
    console.log(error);
}

export async function fetchData() {
    const response = await fetch('/api/interview-materials/products.json');
    const result = await response.json();
    return Object.values(result.products);
}