import FaqItem from './faqItem';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function GlobalFaq(block) {
	return (
        <section className="faq-two">
            <div className="container">
                <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="section-header">
                    <h2><editable-text data-prop="title">{block.title}</editable-text> <span data-editable="text" data-prop="title_suffix">{block.title_suffix}</span></h2>
                    <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description) }}/>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-lg-12">
                    <div className="accordion" id="accordionExample" data-editable="array" data-prop="FAQ">
                        {block.FAQ.map((q, i) => (
                            <FaqItem faq={q} i={i} key={i} />
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </section>
	);
}
