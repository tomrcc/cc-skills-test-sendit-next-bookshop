import Link from "next/link";
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function ContactHero(block) {
    return (
        <section className="contact-hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="contact-hero-content">
                            <h1 data-editable="text" data-prop="title">{block.title}</h1>
                            <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description || '') }}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}