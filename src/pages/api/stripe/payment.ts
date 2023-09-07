import Stripe from "stripe";

export default async function handler(req: any, res: any) {
    if (req.method === "POST") {
        const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
            apiVersion: '2023-08-16',
        })
    
        let priceId = req.body.priceId;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId
                }
            ],
            mode: 'subscription',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        })
        res.send({
            error: null,
            status: 200,
            response: session.url,
        });
    } else {
        res.send({
            error: "Method not supported",
            status: 405,
        });
    }
}
