import AboutHero from '../components/about/hero';
import AboutTeam from '../components/about/team';
import AboutVideo from '../components/about/video';
import ContactForm from '../components/contact/form';
import ContactHero from '../components/contact/hero';
import FeatureHero from '../components/feature/hero';
import GlobalCounter from '../components/global/counter';
import GlobalError from '../components/global/error';
import GlobalFaq from '../components/global/faq';
import GlobalFeature from '../components/global/feature';
import GlobalHeader from '../components/global/header';
import GlobalLogin from '../components/global/login';
import GlobalSignup from '../components/global/signup';
import GlobalTestimonial from '../components/global/testimonial';
import HomeHero from '../components/home/hero';
import HomeVideo from '../components/home/video';
import PricingHero from '../components/pricing/hero';
import PricingTable from '../components/pricing/table';
import PrivacyHero from '../components/privacy/hero';
import PrivacyPrivacy from '../components/privacy/privacy';
import Footer from '../components/layouts/footer';

// Keys are the `_type` values in content_blocks.
export const blockMap = {
	'about/hero': AboutHero,
	'about/team': AboutTeam,
	'about/video': AboutVideo,
	'contact/form': ContactForm,
	'contact/hero': ContactHero,
	'feature/hero': FeatureHero,
	'global/counter': GlobalCounter,
	'global/error': GlobalError,
	'global/faq': GlobalFaq,
	'global/feature': GlobalFeature,
	'global/header': GlobalHeader,
	'global/login': GlobalLogin,
	'global/signup': GlobalSignup,
	'global/testimonial': GlobalTestimonial,
	'home/hero': HomeHero,
	'home/video': HomeVideo,
	'pricing/hero': PricingHero,
	'pricing/table': PricingTable,
	'privacy/hero': PrivacyHero,
	'privacy/privacy': PrivacyPrivacy
};

export const componentMap = {
	...blockMap,
	footer: Footer
};
