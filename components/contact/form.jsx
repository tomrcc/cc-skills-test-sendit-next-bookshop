import Link from "next/link";

// Clicking into a label inside the submit button would otherwise submit the form in the editor.
const blockSubmitInEditor = (event) => {
    if (window.inEditorMode) event.preventDefault();
};

export default function ContactForm(block) {
    return (
        <section className="contact">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 me-auto order-2 order-lg-1">
                        <div className="contact-form-Information">
                            <div className="address">
                                { block.address &&
                                    <>
                                    <h3 data-editable="text" data-prop="address.heading">{block.address.heading}</h3>
                                    <p data-editable="text" data-prop="address.address">{block.address.address}</p>
                                    </>
                                }
                                <div className="item mb-4">
                                    { block.phone &&
                                        <>
                                            <h3 data-editable="text" data-prop="phone.heading">{block.phone.heading}</h3>
                                            <Link href={`tel:${block.phone.cell}`}><editable-text data-prop="phone.cell">{block.phone.cell}</editable-text>
                                                <span>
                                                    {block.phone.image &&
                                                        <img
                                                            src={block.phone.image}
                                                            alt={block.phone.image_alt}
                                                            loading="lazy"
                                                            data-editable="image"
                                                            data-prop-src="phone.image"
                                                            data-prop-alt="phone.image_alt"
                                                        />
                                                    }
                                                </span>
                                            </Link>
                                        </>
                                    }
                                </div>
                                <div className="item">

                                    { block.email &&
                                        <>
                                            <h3 data-editable="text" data-prop="email.heading">{block.email.heading}</h3>
                                            <Link href={`tel:${block.email.email}`}><editable-text data-prop="email.email">{block.email.email}</editable-text>
                                                <span>
                                                    {block.email.image &&
                                                        <img
                                                            src={block.email.image}
                                                            alt={block.email.image_alt}
                                                            loading="lazy"
                                                            data-editable="image"
                                                            data-prop-src="email.image"
                                                            data-prop-alt="email.image_alt"
                                                        />
                                                    }
                                                </span>
                                            </Link>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2">
                        <div className="contact-form">

                            { block.form &&
                                <>
                                    <form method="post" onSubmit={blockSubmitInEditor}>
                                        <h3 data-editable="text" data-prop="form.heading">{block.form.heading}</h3>
                                        { block.form.fullname &&
                                            <>
                                                <div className="col-md-12">
                                                    <label for="Name" className="label" data-editable="text" data-prop="form.fullname.heading">{block.form.fullname.heading}</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="Name"
                                                        name="name"
                                                        placeholder={block.form.fullname.placeholder}
                                                        required=""
                                                    />
                                                </div>
                                            </>
                                        }
                                        { block.form.phone_number &&
                                            <>
                                                <div className="col-md-12">
                                                    <label for="phone-number" className="label" data-editable="text" data-prop="form.phone_number.heading">{block.form.phone_number.heading}</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        id="phone-number"
                                                        name="phone-number"
                                                        placeholder={block.form.phone_number.placeholder}
                                                        required=""
                                                    />
                                                </div>
                                            </>
                                        }
                                        { block.form.email &&
                                            <>
                                                <div className="col-md-12">
                                                    <label for="email" className="label" data-editable="text" data-prop="form.email.heading">{block.form.email.heading}</label>
                                                    <input
                                                        type="email"
                                                        className="form-control mb-6"
                                                        id="email"
                                                        name="_replyto"
                                                        placeholder={block.form.email.placeholder}
                                                        required=""
                                                    />
                                                </div>
                                            </>
                                        }
                                        { block.form.message &&
                                            <>
                                                <div className="col-md-12">
                                                    <label for="message" className="label" data-editable="text" data-prop="form.message.heading">{block.form.message.heading}</label>
                                                    <textarea
                                                        className="form-control mb-4"
                                                        id="floatingTextarea2"
                                                        name="message"
                                                        placeholder={block.form.message.placeholder}
                                                        rows="8"
                                                        spellcheck="false"
                                                    />
                                                </div>
                                            </>
                                        }
                                        <input type="text" name="_gotcha" style={{display: 'none'}} />

                                        { block.form.submit_button?.text &&
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-primary btn-lg mt-7">
                                                    <span className="position-relative" data-editable="text" data-prop="form.submit_button.text">{block.form.submit_button.text}</span>
                                                </button>
                                            </div>
                                        }
                                    </form>
                                </>
                            }
                            <div className="effect"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
