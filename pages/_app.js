import '../styles/theme.scss';

import { EditableRegions } from '@cloudcannon/editable-regions/react';
import CloudCannonEditor from '../components/CloudCannonEditor';

export default function App({ Component, pageProps }) {
	return (
		<>
			<EditableRegions tag="div">
				<Component {...pageProps} />
			</EditableRegions>
			<CloudCannonEditor />
		</>
	);
}
