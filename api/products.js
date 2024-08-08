export default async function handler(req, res) {
    const response = await fetch('https://cdn.drcode.ai/interview-materials/products.json');
    const data = await response.json();

    res.status(200).json(data);
}