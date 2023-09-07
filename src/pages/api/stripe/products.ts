import Stripe from "stripe";

export default async function handler(req: any, res: any) {

    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '', {
        apiVersion: '2023-08-16',
    })
    const prices = await stripe.prices.list({
        limit: 4
    })

    res.send({
        error: null,
        status: 200,
        response: prices.data.reverse(),
    });
}
