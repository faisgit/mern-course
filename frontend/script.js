const productList = document.getElementById('productlist')
console.log(productList)

const apiUrl = 'http://localhost:5000/api/products/';

async function fetchProducts(){
    try {
        const response =  await fetch('http://localhost:5000/api/products/',{method :'GET'})
        const result =  await response.json()
        console.log(result.data);
        
        displayProduct(result.data)
    } catch (error) {
        console.log(error)
    }
}

function displayProduct (products){
    const productList = document.getElementById('productlist')
    productList.innerHTML = ''

    products.forEach(product => {
        const productItem = document.createElement('tr')
        productItem.innerHTML = `
            <td>${product.name}</td>
                <td>${product.price}$</td>
                <td><img src=${product.image} alt="" height="100px" width="100px">
                <td>
                    <button onclick="deleteProduct('${product._id}')">Delete</button>
                </td>
            </td>
        `
        productList.appendChild(productItem)
    });

}

fetchProducts(apiUrl)

async function deleteProduct (id){
    console.log(id)
    const confirmDelete =  confirm("Are you want to delete this product? ")
    if(!confirmDelete) return

    try {
        const response =  await fetch(`${apiUrl}/${id}`,{
            method : 'DELETE'
        })
        const result = await response.json()
        if (result.success) {
            alert("Product deleted successfully");
            fetchProducts()
            window.location.href('http://127.0.0.1:5500/frontend/index.html')
        }
        else{
            alert("Error in deleting product ")
        }
    } catch (error) {
        console.log(error)
    }
}