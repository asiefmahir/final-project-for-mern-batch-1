const baseURL = `http://localhost:5000/api`;

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    return fetch(`${baseURL}/users` , {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json())

}
export const getByUserId = async (id) => {
    const token = localStorage.getItem('token');
    return fetch(`${baseURL}/users/${id}`, {
         headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json())
}

export const updateUser = async (user) => {
    delete user.obj._id;
    const payload = {
        ...user.obj,
        role: 'admin'
    }
    const token = localStorage.getItem('token')
    return fetch(`${baseURL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
    
}

export const removeUser = async (id) => {
    const token = localStorage.getItem('token');
    return fetch(`${baseURL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}