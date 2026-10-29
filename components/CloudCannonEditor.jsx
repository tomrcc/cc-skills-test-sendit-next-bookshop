import { useEffect } from 'react';

export default function CloudCannonEditor() {
	useEffect(() => {
		if (!window.inEditorMode) return;
		import('../cloudcannon/registerComponents').catch((error) => {
			console.warn('Failed to load CloudCannon component registration:', error);
		});
	}, []);

	return null;
}
