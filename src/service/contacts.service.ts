import { ContactInterface } from "@interfaces/Contact.interface";
import api from "@services/ApiService/api";

class ContactsService {
    getContacts = () => {
        api.get('/api/contact')
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
    }

    createContact = (contact: ContactInterface, callback: (arg0: null, arg1: null) => void) => {
        api.post('/api/contact', {contact: contact})
            .then((response) => callback(null, response?.data))
            .catch((error) => callback(error, null));
    }
}

export default new ContactsService();
