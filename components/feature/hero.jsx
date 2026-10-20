import Link from "next/link";
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function FeatureHero(block) {
	return (
        <section className="feature-hero">
            <div className="container">
                <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="feature-hero-content">
                    <h1 className="" data-editable="text" data-prop="title">{block.title}</h1>
                    <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description || '') }}/>
                    <div className="d-block mb-6">
                        {block.button?.text &&
                            <Link href={block.button.link || '/'} className="btn btn-primary btn-lg"> <editable-text data-prop="button.text">{block.button.text}</editable-text> </Link>
                        }
                    </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="feature-hero-banner">
                    {block.image && <img src={block.image} alt={block.image_alt} loading="lazy" data-editable="image" data-prop-src="image" data-prop-alt="image_alt" />}
                    <div className="shape">
                        <img src="/images/feature/effect-4.png" alt="shape" loading="lazy" />
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
	);
}
