import { UserInterface } from "@interfaces/User.interface";
import api from "@services/ApiService/api";

class UsersService {
    getUsers = () => {
        api.get('/api/users')
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
    }

    createUser = (userToSave: UserInterface, callback: (arg0: null, arg1: null) => void) => {
        api.post('/api/users', {
            user: userToSave
        })
            .then((response) => {
                callback(null, response?.data)
            })
            .catch((error) => {
                callback(error, null)
            });
    }
}

export default new UsersService();
