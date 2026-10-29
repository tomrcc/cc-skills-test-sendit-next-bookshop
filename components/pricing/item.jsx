import Link from "next/link";

export default function PricingTier( {tier}) {

    let pricing = ''
    if (tier.has_discount){
        pricing = <>
            <div className="price">
            <p className="pricingtable"><editable-text data-prop="currency_symbol">{tier.currency_symbol}</editable-text><editable-text data-prop="discount_price">{tier.discount_price}</editable-text></p>
            <div className="discount">
                <p><editable-text data-prop="currency_symbol">{tier.currency_symbol}</editable-text><editable-text data-prop="price">{tier.price}</editable-text></p>
                <div className="vector vector-one">
                <img src="/images/pricing/Vector1.svg" alt="Vector" loading="lazy"/>
                </div>
            </div>
            <div className="shape-two top-0"></div>
            </div>
        </>
    } else {
        pricing = <>
            <div className="price">
            <p><span><editable-text data-prop="currency_symbol">{tier.currency_symbol}</editable-text><editable-text data-prop="price">{tier.price}</editable-text></span></p>
            <div className="shape-one"></div>
            </div>
        </>
    }
	return (
        <div className="col-lg-4" data-editable="array-item">
            <div className={`card pricing-item ${tier.highlight_tier ? 'active' : ''}`}>
                <h5 className="card-title" data-editable="text" data-prop="tier">{tier.tier}</h5>
                <p className="card-text" data-editable="text" data-prop="description">
                {tier.description}
                </p>
                {pricing}
                <div className="card-body">
                <ul className="list-unstyled" data-editable="array" data-prop="features">
                    
                    {tier.features.map((feature, i) => (
                        <li key={i} className={feature.active_feature? '': 'deactive'} data-editable="array-item">
                            <i className={`ph-check ${feature.active_feature? '': 'deactive'}`}></i>
                            <editable-text data-prop="item">{feature.item}</editable-text>
                        </li>
                    ))}
                </ul>
                <div className="link">
                    { tier.button &&
                        <Link href={tier.button.link} className="btn btn-lg btn-white">
                            <editable-text data-prop="button.text">{tier.button.text}</editable-text>
                        </Link>
                    }
                </div>
                </div>
            </div>
        </div>
	);
}
