import axios from 'axios'

const apiOrchestrate  = axios.create({
    baseURL: "https://rangu-orchestrate.herokuapp.com/api/rangu/v1"
})

export default apiOrchestrate;
