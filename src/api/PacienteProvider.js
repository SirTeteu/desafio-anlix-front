import { API_PATH } from "./api.js" 
import { get } from "./api.js" 

export default  {

    index: function(args) {
        get({
            url: `${API_PATH}/paciente/index`,
            ...args
        })
    },
}