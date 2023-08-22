import { ContactInterface } from "@interfaces/Contact.interface";
import api from "@services/ApiService/api";

class ContactsService {
    getContacts = (userEmail: string, callback: { (contacts: any): void; (arg0: null, arg1: never[]): any; }) => {
        const queryParams = userEmail ? `?userEmail=${encodeURIComponent(userEmail)}` : '';
        api.get(`/api/contacts/${queryParams}`)
            .then((response) => callback(response?.data?.error || null, response?.data?.contacts || []))
            .catch((error) => callback(error, []));
    }

    createContact = (contact: ContactInterface, callback: (arg0: null, arg1: null) => void) => {
        api.post('/api/contacts', { contact: contact })
            .then((response) => callback(null, response?.data))
            .catch((error) => callback(error, null));
    }
}

export default new ContactsService();
