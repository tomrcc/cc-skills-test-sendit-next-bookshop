
import Link from 'next/link';

export default function Footer({ logo, logo_url, copyright, social, sections }) {
    return (
        <>
            <footer className="footer pt-xxl-19 pt-8 pb-sm-7 pb-5" id="footer">
                <div className="container-fluid">
                    <div className="footer-wrapper">
                        <div className="row">
                            <div className="col-12 col-lg-4 me-auto order-2 order-lg-1">
                                <div className="footer-logo mt-7 mt-md-0">
                                    <a href={logo_url || '/'} className="">
                                        {logo && <img src={logo} alt="logo" data-editable="image" data-prop-src="logo" />}
                                    </a>
                                    <p>
                                        © Copyright <span>{new Date().getFullYear()}</span> <editable-text data-prop="copyright">{copyright}</editable-text>
                                    </p>
                                </div>
                                <div className="social-icon">
                                    <ul className="list-unstyled" data-editable="array" data-prop="social" data-direction="row">
                                        {(social || []).map((link, i) => (
                                            <li key={i} data-editable="array-item">
                                                <Link href={`${link.link}`}>
                                                    <i className={link.icon} aria-hidden="true"><span className="visually-hidden">{link.icon_alt}</span></i>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Columns share Bootstrap's `.row > *` with the logo column, so they bind by index instead of an array region. */}
                            {(sections || []).map((section, i) => (
                                <div className="col-6 col-md-3 col-lg-2 order-1" key={i}>
                                    <div className="footer-widget">
                                        <h3 className="" data-editable="text" data-prop={`sections.${i}.title`}>{section.title}</h3>
                                        <ul className="list-unstyled" data-editable="array" data-prop={`sections.${i}.links`}>
                                            {(section.links || []).map((link, j) => (
                                                <li key={j} data-editable="array-item">
                                                    <Link href={`${link.link}`}>
                                                        <editable-text data-prop="text">{link.text}</editable-text>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
