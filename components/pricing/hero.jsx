import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function PricingHero(block) {
	return (
        <section className="pricing-inner @@bg-color">
            <div className="container">
                <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="section-header position-relative text-center">
                    <h2 data-editable="text" data-prop="title">{block.title}</h2>
                    <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description) }}/>
                    </div>
                </div>
                </div>
            </div>
        </section>
	);
}
