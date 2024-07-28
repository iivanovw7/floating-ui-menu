import type { ForwardRefExoticComponent, RefAttributes } from "react";

import { FloatingTree, useFloatingParentNodeId } from "@floating-ui/react";
import { forwardRef } from "react";

import type { MenuProperties } from "./menu.model";

import { MenuBase, MenuDivider, MenuItem, MenuLabel, MenuList, MenuToggle } from "./components";
import "./menu.component.css";

type TMenuComponent = ForwardRefExoticComponent<MenuProperties & RefAttributes<HTMLButtonElement>> & {
	Divider: typeof MenuDivider;
	Item: typeof MenuItem;
	Label: typeof MenuLabel;
	List: typeof MenuList;
	Toggle: typeof MenuToggle;
};

const MenuComponent = forwardRef<HTMLButtonElement, MenuProperties>((properties, reference) => {
	let parentId = useFloatingParentNodeId();
	let menu = <MenuBase ref={reference} {...properties} />;

	if (parentId === null) {
		menu = <FloatingTree>{menu}</FloatingTree>;
	}

	return menu;
});

MenuComponent.displayName = "Menu";

export const Menu = {
	...MenuComponent,
	Divider: MenuDivider,
	Item: MenuItem,
	Label: MenuLabel,
	List: MenuList,
	Toggle: MenuToggle,
} as TMenuComponent;
