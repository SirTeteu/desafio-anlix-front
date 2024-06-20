import { API_PATH } from "./api.js" 
import { get } from "./api.js" 

export default  {

    index: function(args) {
        get({
            url: `${API_PATH}/paciente/index`,
            ...args
        });
    },

    detailLastIndices: function(pacienteId, args) {
        console.log(pacienteId);
        get({
            url: `${API_PATH}/paciente/${pacienteId}/detail-last-indices`,
            ...args
        });
    }
}