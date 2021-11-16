import axios from 'axios'

const apiOrders = axios.create({
    baseURL: 'https://rangu-orders.herokuapp.com/api/rangu/v1'
})


export default apiOrders;
