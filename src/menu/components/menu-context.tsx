import type { ReactNode } from "react";

import { createContext, useContext } from "react";

import type { MenuContextValue } from "../menu.model";

export type MenuContextProviderProperties = {
	children: ReactNode;
	value: MenuContextValue;
};

export const MenuContext = createContext<MenuContextValue | null>(null);

MenuContext.displayName = "MenuContext";

export const useMenu = () => {
	let context = useContext(MenuContext);

	if (!context) {
		throw new Error("useMenu() must be used within a Menu.");
	}

	return context;
};

export const MenuContextProvider = ({ children, value }: MenuContextProviderProperties) => {
	return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

MenuContextProvider.displayName = "MenuContextProvider";
