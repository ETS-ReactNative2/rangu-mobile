import axios from 'axios'

const apiUsers = axios.create({
    baseURL: "https://rangu-users.herokuapp.com/api/rangu/v1"
})

const apiMenu  = axios.create({
    baseURL: "https://rangu-menu.herokuapp.com/api/rangu/v1"
})

const apiOrders = axios.create({
    baseURL: 'https://rangu-orders.herokuapp.com/api/rangu/v1'
})

export default apiUsers;
export {
    apiMenu,
    apiOrders,
  };
