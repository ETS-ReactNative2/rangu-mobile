import axios from 'axios'

const apiOauth = axios.create({
    baseURL: "https://rangu-oauth.herokuapp.com/api/rangu/v1/security/oauth"
})
export default apiOauth;
