import api from "@services/ApiService/api";

class OpenaiService {
    generateAnswer = (prompt: string, callback: (arg0: null, arg1: null) => void) => {
        api.post('/api/openai', {
            prompt: prompt
        })
            .then((response) => {
                callback(null, response?.data)
            })
            .catch((error) => {
                callback(error, null)
            });
    }
}

export default new OpenaiService();
