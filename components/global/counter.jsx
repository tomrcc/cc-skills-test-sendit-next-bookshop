
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });

export default function GlobalCounter(block) {
	return (
        <section
        className={`counter-up ${block.alternate_style ? 'counter-up-two pb-xxl-14 pb-lg-13': ''}`}
        id="counter-up"
       
        >
            <div className="container">
                <div className="row">
                <div className="col-lg-12">
                    <div className="section-header">
                    <h2><editable-text data-prop="title">{block.title}</editable-text> <span data-editable="text" data-prop="title_suffix">{block.title_suffix}</span></h2>
                    <div data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(block.description) }}/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="counter-up-wrapper d-grid" data-editable="array" data-prop="numbers">
                        {block.numbers.map((number, i) => (
                            <div className="counter-up-content" key={i} data-editable="array-item">
                                <div className="counter-up-content-item">
                                <div className="counter-percent">
                                    { number.prefix && 
                                        <span className="percent" data-editable="text" data-prop="prefix">{number.prefix}</span>
                                    }
                                    
                                    <span className="counter" data-editable="text" data-prop="number">{number.number}</span>

                                    { number.suffix && 
                                        <span className="percent" data-editable="text" data-prop="suffix">{number.suffix}</span>
                                    }
                                </div>
                                <p data-editable="text" data-prop="text">{number.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </section>
	);
}
