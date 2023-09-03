const baseURL = `http://localhost:5000/api`;

export const getAllProducts = async () => {
    const res = await fetch(`${baseURL}/products`);
    const data = await res.json();
    return data
}

export const getProductById = async (id) => (
    fetch(`${baseURL}/products/${id}`).then(res => res.json())
)


export const createProduct = async (product) => {
    const token = localStorage.getItem('token');
    return fetch(`${baseURL}/products`, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body: product
    })

}

export const updateProduct = async (obj) => {
    const token = localStorage.getItem('token')
    return fetch(`${baseURL}/products/${obj.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: obj.product
    })
        // .then(res => res.json())
    
}

export const removeProduct = async (id) => {
    const token = localStorage.getItem('token');
    return fetch(`${baseURL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
