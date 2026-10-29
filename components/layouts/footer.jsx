
import Link from 'next/link';
import data from '../../lib/data';


export default function Footer({ children, page }) {
    return (
        <>
            <footer className="footer pt-xxl-19 pt-8 pb-sm-7 pb-5" id="footer">
                <div className="container-fluid">
                    <div className="footer-wrapper">
                        <div className="row">
                            <div className="col-12 col-lg-4 me-auto order-2 order-lg-1">
                                <div className="footer-logo mt-7 mt-md-0">
                                    <a href={data.footer.logo_url} className="">
                                        <img data-editable="image" data-prop-src="@data[footer].logo" src={data.footer.logo} alt="logo" />
                                    </a>
                                    <p>
                                        © Copyright <span>{new Date().getFullYear()}</span> <editable-text data-prop="@data[footer].copyright">{data.footer.copyright}</editable-text>
                                    </p>
                                </div>
                                <div className="social-icon">
                                    <ul className="list-unstyled" data-editable="array" data-prop="@data[footer].social">
                                        {data.footer.social.map((link, i) => (
                                            <li key={i} data-editable="array-item">
                                                <Link href={`${link.link}`}>
                                                    <i className={link.icon} aria-hidden="true"><span className="visually-hidden">{link.icon_alt}</span></i>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {data.footer.sections.map((section, i) => (
                                <div className="col-6 col-md-3 col-lg-2 order-1" key={i}>
                                    <div className="footer-widget">
                                        <h3 className="" data-editable="text" data-prop={`@data[footer].sections.${i}.title`}>{section.title}</h3>
                                        <ul className="list-unstyled" data-editable="array" data-prop={`@data[footer].sections.${i}.links`}>
                                            {section.links.map((link, j) => (
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
