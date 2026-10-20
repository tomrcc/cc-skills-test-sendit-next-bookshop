import { blockMap } from '../../cloudcannon/componentMap';

export default function Blocks({ content_blocks }) {
	return (
		<div data-editable="array" data-prop="content_blocks" data-component-key="_type">
			{(content_blocks || []).map((block, i) => {
				const Block = blockMap[block._type];
				if (!Block) {
					throw new Error(`No block component for _type "${block._type}"`);
				}
				return (
					<div className="content-block" data-editable="array-item" data-component={block._type} key={i}>
						<Block {...block} />
					</div>
				);
			})}
		</div>
	);
}
