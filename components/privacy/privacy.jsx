import MarkdownIt from 'markdown-it';
import Link from 'next/link';
const md = new MarkdownIt({ html: true });
import { createRef } from 'react'
import { Scrollspy } from "@makotot/ghostui";

export default function PrivacyPrivacy(block) {
    const terms = block.terms_and_conditions || [];
    const sectionRefs = [];
    terms.map((privacy, i) => (
        sectionRefs.push(createRef())
    ))
    const handleClick = event => {
        Array.from(document.querySelectorAll('.privacy-nav .nav-link')).forEach(element => {
            element.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    };
    return (
        <section className="privacy">
            <div className="container">
                <div className="row">
                    <Scrollspy sectionRefs={sectionRefs} offset={-90}>
                        {({ currentElementIndexInViewport }) => (
                            <div className="privacy-wrapper">
                                <div className="col-lg-7 mx-auto">
                                    <div
                                        data-bs-spy="scroll"
                                        data-bs-target="#navbar-example2"
                                        data-bs-offset="0"
                                        className="scrollspy-example"
                                        tabIndex="0"
                                        data-editable="array"
                                        data-prop="terms_and_conditions"
                                    >

                                        {terms.map((privacy, i) => (
                                            <div className="privacy-items" id={`item${i + 1}`} key={i} ref={sectionRefs[i]} data-editable="array-item">
                                                <div className="card">
                                                    <h3 className="sub-title" data-editable="text" data-prop="heading">{privacy.heading}</h3>
                                                    <div className="card-body">
                                                        <div className="card-text" data-editable="text" data-type="block" data-prop="description" dangerouslySetInnerHTML={{ __html: md.render(privacy.description || '') }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <nav id="scrol-nav" className="navbar navbar-light privacy-nav">
                                        <ul className="nav nav-pills">

                                            {terms.map((privacy, i) => (
                                                <li className="nav-item" key={i}>
                                                    <Link href={`#item${i + 1}`} onClick={handleClick} className={`nav-link ${currentElementIndexInViewport === i ? "active" : ""}`}>
                                                        {privacy.heading}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </Scrollspy>
                </div>
            </div>
        </section>
    );
}
