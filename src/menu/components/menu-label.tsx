import type { MenuLabelProperties } from "../menu.model";

import "./menu-label.css";

export const MenuLabel = (properties: MenuLabelProperties) => {
	let { children, ...restProperties } = properties;

	return (
		<div {...restProperties} className="menu-label">
			{children}
		</div>
	);
};

MenuLabel.displayName = "MenuLabel";
