
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function GlobalTestimonial(block) {
    return (
        <section className="testimonial">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8 mx-auto text-center mb-5">
                        <div className="testimonial-content">
                            <h2><editable-text data-prop="title">{block.title}</editable-text> <span> <editable-text data-prop="title_suffix">{block.title_suffix}</editable-text></span></h2>
                            <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description) }}/>
                        </div>
                    </div>
                </div>
                <div className="row" data-editable="array" data-prop="slider">
                    {block.slider.map((slide, i) => (
                        <div className="col-lg-4 col-md-6 mb-5" key={i} data-editable="array-item">
                            <div className="testimonial-item">
                                <div className="testimonial-item-person">
                                    <div className="thumb">
                                        <img
                                            data-editable="image"
                                            data-prop-src="image"
                                            src={slide.image}
                                            alt="logo"
                                            className={slide.image_alt}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="content">
                                        <h3 data-editable="text" data-prop="author">{slide.author}</h3>
                                        <p data-editable="text" data-prop="designation">{slide.designation}</p>
                                    </div>
                                </div>
                                <p data-editable="text" data-prop="message">{slide.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
