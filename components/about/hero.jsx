import Link from "next/link";
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function AboutHero(block) {

    const renderPlacer = (param) => {
        switch (param) {
            case 'front_bottom':
                return 'image-one';
            case 'back_top_right':
                return 'image-two';
            case 'back_top_left':
                return 'image-three';
            default:
                return '';
        }
    };

    return (
        <section className="about-hero-two">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-10 mx-auto">
                        <div className="about-hero-two-content position-relative">
                            <h2 data-editable="text" data-prop="title">{block.title}</h2>
                            <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description || '') }}/>
                            <div className="scroll-down d-flex justify-content-center justify-content-xl-start">
                                {block.button?.text &&
                                    <Link href={block.button.link || '/'} className="btn btn-primary btn-lg"> <editable-text data-prop="button.text">{block.button.text}</editable-text> </Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-12">
                        <div className="about-hero-two-banner">
                            {/* `display: contents` keeps the images positioned against the banner. */}
                            <div className="array-contents" data-editable="array" data-prop="hero_images">
                                {(block.hero_images || []).map((image, i) => (
                                    <div className={`${renderPlacer(image.placement)}`} key={i} data-editable="array-item">
                                        {image.image &&
                                            <img src={image.image} alt={image.image_alt} loading="lazy" data-editable="image" data-prop-src="image" data-prop-alt="image_alt" />
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className="pattern"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
