import { SegmentInterface } from "@interfaces/Segment.interface";
import api from "@services/ApiService/api";

class SegmentsService {
    getSegments = () => {
        api.get('/api/segment')
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error));
    }

    createSegment = (segment: SegmentInterface, callback: (error: null, data: null) => void) => {
        api.post('/api/segment', { segment: segment })
            .then((response) => callback(null, response?.data))
            .catch((error) => callback(error, null));
    }
}

export default new SegmentsService();
