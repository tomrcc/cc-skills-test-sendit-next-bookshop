import Link from "next/link";
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function HomeHero(block) {
	return (
		<section className="hero-two">
            <div className="hero-two-shape"></div>
            <div className="container-fluid">
                <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="hero-two-content">
                    <h1 className="mb-4" data-editable="text" data-prop="title">{block.title}</h1>
                    <div className="mb-7 w-xxl-80" data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description || '') }}></div>
                    <div className="">
                        { block.button?.text &&
                            <Link href={block.button.link || '/'} className="btn btn-primary btn-lg"> <editable-text data-prop="button.text">{block.button.text}</editable-text> </Link>
                        }
                    </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="hero-two-banner">
                    {block.image &&
                        <img src={block.image} alt={block.image_alt} data-editable="image" data-prop-src="image" data-prop-alt="image_alt" />
                    }
                    <div className="hero-two-banner-shape"></div>
                    </div>
                </div>
                </div>
            </div>
        </section>
	);
}
