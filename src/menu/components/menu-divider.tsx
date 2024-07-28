import type { MenuDividerProperties } from "../menu.model";

import "./menu-divider.css";

export const MenuDivider = (properties: MenuDividerProperties) => <div {...properties} className="menu-divider" />;

MenuDivider.displayName = "MenuDivider";
