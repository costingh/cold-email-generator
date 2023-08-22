import { CampaignInterface } from "@interfaces/Campaign.interface";
import api from "@services/ApiService/api";

class CampaignsService {
    getCampaigns = () => {
        api.get('/api/campaigns')
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
    }

    createCampaign = (campaign: CampaignInterface, callback: (error: null, data: null) => void) => {
        api.post('/api/campaigns', { campaign: campaign })
            .then((response) => callback(null, response?.data))
            .catch((error) => callback(error, null));
    }
}

export default new CampaignsService();
