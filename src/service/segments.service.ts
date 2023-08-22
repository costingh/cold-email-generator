import { SegmentInterface } from "@interfaces/Segment.interface";
import api from "@services/ApiService/api";

class SegmentsService {
    getSegments = (userEmail : string, callback: any) => {
        const queryParams = userEmail ? `?userEmail=${encodeURIComponent(userEmail)}` : '';
        api.get(`/api/segments/${queryParams}`)
            .then((response) => callback(response?.data?.error || null, response?.data?.segments || []))
            .catch((error) => callback(error, []));
    }

    createSegment = (segment: SegmentInterface, callback: (error: null, data: null) => void) => {
        api.post('/api/segments', { segment: segment })
            .then((response) => callback(null, response?.data))
            .catch((error) => callback(error, null));
    }

    getContactsFromSegment = (segmentId : string, callback: any) => {
        const queryParams = segmentId ? `?segmentId=${encodeURIComponent(segmentId)}` : '';
        api.get(`/api/segments/${queryParams}`)
            .then((response) => callback(response?.data?.error || null, response?.data?.segments || []))
            .catch((error) => callback(error, []));
    }

    countContactsFromSegment = (segmentId : string, callback: any) => {
        const queryParams = segmentId ? `?count=true?segmentId=${encodeURIComponent(segmentId)}` : '';
        api.get(`/api/segments/${queryParams}`)
            .then((response) => callback(response?.data?.error || null, response?.data?.count || 0))
            .catch((error) => callback(error, []));
    }
    
}

export default new SegmentsService();
