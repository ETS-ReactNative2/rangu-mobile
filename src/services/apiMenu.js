import axios from 'axios'

const apiMenu  = axios.create({
    baseURL: "https://rangu-menu.herokuapp.com/api/rangu/v1"
})

export default apiMenu;
