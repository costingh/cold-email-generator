import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function Pricing() {

    const [prices, setPrices] = useState([])

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        const { data } = await Axios.get('/api/stripe/products');
        setPrices(data?.response || [])
    }

    const handleSubscription = async (e, price) => {
        e.preventDefault()
        const { data } = await Axios.post('/api/stripe/payment', {
            priceId: price.id
        }, {
            'Content-Type': 'application/json'
        });
        window.location.assign(data?.response || '')
    }
    return (
        <div className='pricing-page'>
            <h1 className='page-header'>Get unlimited access.</h1>
            <p className='page-subtitle'>Find the perfect plan, starting from less than $2/week — cancel anytime.</p>
            
            <div className="pricing-plans-wrapper">
            {prices && prices.map(price => (
                <div key={price.id} className='pricing-card'>
                    <h1>Basic plan</h1>
                    <p className='subtitle'>This is the most basic plan</p>

                    <div className="price">
                        <span>$</span>
                        <p>{(price.unit_amount / 100)}</p>
                    </div>

                    <div className="get-started" onClick={(e) => handleSubscription(e, price)}>Get started</div>

                    <p>Billed monthly</p>
                    <p>All integrations</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Pricing