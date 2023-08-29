import chatgpt from '../../../openai/openai'
 
export default async function handler(req: { method: string; body: { prompt: string; }; }, res: { send: (arg0: { answer?: any | null; error: any; response?:  | null; message?: string; status?: number; }) => void; }) {
	if (req.method === "POST") {
        let prompt = req.body.prompt;
        try {
            let answer = await chatgpt(prompt)

            res.send({
                answer: answer,
                error: null,
                status: 200,
            });
        } catch(err) {
            res.send({
                error: err,
                status: 500,
            });
        }
    } else {
        res.send({
            error: "Method not supported",
            status: 405,
        });
    }
}
