
import Link from 'next/link';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function GlobalError(block) {
	return (
        <section className="error py-xxl-12 py-lg-9 py-10 py-sm-6">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="error-content text-center">
                  {block.image && <img src={block.image} className="" alt={block.image_alt} data-editable="image" data-prop-src="image" data-prop-alt="image_alt" />}
                  <h3 className="my-5" data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description || '') }}></h3>
                  {block.button?.text &&
                    <Link href={block.button.link || '/'} className="btn btn-lg btn-primary"><editable-text data-prop="button.text">{block.button.text}</editable-text></Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
	);
}