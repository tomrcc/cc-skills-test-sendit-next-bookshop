
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function GlobalHeader(block) {
	return (
        <section className="feature pt-0 pb-0">
        <div className="container">
            <div className="row">
            <div className="col-lg-8 mx-auto">
                <div className={`section-header @@disply ${block.remove_top_padding ? 'no-top-pad': ''}`}>
                <h2><editable-text data-prop="title">{block.title}</editable-text><span data-editable="text" data-prop="title_suffix">{block.title_suffix}</span></h2>
                <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description || '') }}/>
                </div>
            </div>
            </div>
        </div>
        </section>
	);
}