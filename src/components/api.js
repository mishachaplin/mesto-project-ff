const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: 'b0cb3e3c-2034-43f3-80f9-eca5c6b363b1',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if(res.ok) {
    return res.json();
  } 
  return Promise.reject(`Ошибка: ${res.status}`)
};


const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)
}


const getAllCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
}


const updateUserData = (title, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      about: description
    })
  })
  .then(handleResponse)
}

// Post new card to server
const postNewCard = (newCarddata) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCarddata)
  })
  .then(handleResponse)
}


export { getUserData, getAllCards, postNewCard, updateUserData };