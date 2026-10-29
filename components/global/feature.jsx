import Link from "next/link";
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function GlobalFeature(block) {
    let content = ''
    if (block.reversed){
        content = <>
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="feature-item-banner mb-sm-8 mb-lg-10 mb-xxl-15 mb-7">
                    <div className="card-image">
                        <img data-editable="image" data-prop-src="image" data-prop-alt="image_alt" src={block.image} alt={block.image_alt} loading="lazy" />
                    </div>
                    <div className="effect-one"></div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="feature-item-content mb-xl-15 mb-md-10 mb-7 ps-xxl-8 ps-0">
                    <h2 data-editable="text" data-prop="title">{block.title}</h2>
                    <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description) }}/>
                    <div className="Learn-more">
                        { block.button && 
                            <Link href={block.button.link}>
                                <editable-text data-prop="button.text">{block.button.text}</editable-text>
                                <i className="ph-arrow-right"></i>    
                            </Link>
                        }
                    </div>
                    </div>
                </div>
            </div>
        </>
    } else {
        content = <>
            <div className="row align-items-center">
                <div className="col-lg-6 order-2 order-lg-1">
                    <div className="feature-item-content mb-xl-15 mb-md-10 mb-7 ps-xxl-8 ps-0">
                    <h2 className="pe-xl-0" data-editable="text" data-prop="title">{block.title}</h2>
                    <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description) }}/>
                    <div className="Learn-more">
                        { block.button && 
                            <Link href={block.button.link}>
                                <editable-text data-prop="button.text">{block.button.text}</editable-text>
                                <i className="ph-arrow-right"></i>
                            </Link>
                        }
                    </div>
                    </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2">
                    <div className="feature-item-banner mb-sm-8 mb-lg-10 mb-xxl-15 mb-7">
                    <div className="card-image">
                        <img data-editable="image" data-prop-src="image" data-prop-alt="image_alt" src={block.image} alt={block.image_alt} loading="lazy" />
                    </div>
                    <div className="effect-two"></div>
                    </div>
                </div>
            </div> 
        </>
    }
	return (
        <section className="feature pt-sm-10 pt-5 pb-4">
            <div className="container">
                {content}
            </div>
        </section>
	);
}
