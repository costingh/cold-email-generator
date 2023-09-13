import { SegmentInterface } from "@interfaces/Segment.interface";
import api from "@services/ApiService/api";
class SegmentsService {
    getSegments = (userEmail: string, callback: any) => {
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

    getContactsFromSegment = (segment: any, userEmail: string, callback: any) => {
        let queryParams = `?userEmail=${userEmail}`;
        if (segment?.industry) queryParams += `&industry=${encodeURIComponent(segment?.industry)}`;
        if (segment?.location) queryParams += `&location=${encodeURIComponent(segment?.location)}`;
        if (segment?.jobTitle) queryParams += `&jobTitle=${encodeURIComponent(segment?.jobTitle)}`;
        if (segment?.biography) queryParams += `&biography=${encodeURIComponent(segment?.biography)}`;
        if (segment?.education) queryParams += `&education=${encodeURIComponent(segment?.education)}`;
        if (segment?.interests) queryParams += `&interests=${encodeURIComponent(segment?.interests)}`;

        api.get(`/api/segments/get-contacts-from-segment/${queryParams}`)
            .then((response) => {
                console.log(response)
                callback(response?.data?.error || null, response?.data?.contacts || [])
            })
            .catch((error) => callback(error, []));
    }

    countContactsFromSegment = (segmentId: string, callback: any) => {
        const queryParams = segmentId ? `?count=true?segmentId=${encodeURIComponent(segmentId)}` : '';
        api.get(`/api/segments/${queryParams}`)
            .then((response) => callback(response?.data?.error || null, response?.data?.count || 0))
            .catch((error) => callback(error, []));
    }

    deleteSegment = (segmentId: string, callback: (error: any | null, data: string | null) => void) => {
        api.delete(`/api/segments/delete-segment?segmentId=${segmentId}`)
            .then(() => {
                callback(null, 'Segment deleted successfully!')
            })
            .catch((error) => callback(error, null));
    }

}

export default new SegmentsService();
