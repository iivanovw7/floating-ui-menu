import type { FocusEvent } from "react";

import { useListItem, useMergeRefs } from "@floating-ui/react";
import { cloneElement, forwardRef } from "react";

import type { MenuToggleProperties } from "../menu.model";

import { useMenu } from "./menu-context";
import "./menu-toggle.css";

export const MenuToggle = forwardRef<HTMLButtonElement, MenuToggleProperties>(
	({ children, ...rest }, forwardedReference) => {
		let { activeIndex, getReferenceProps, isFocusInside, nested, open, reference, setIsFocusInside } = useMenu();
		let item = useListItem();
		let mergedReference = useMergeRefs([forwardedReference, item.ref, reference]);

		return cloneElement(children, {
			...getReferenceProps({
				...rest,
				className: "menu-toggle",
				onClick: (event) => {
					event.stopPropagation();
				},
				onFocus: (event: FocusEvent<HTMLButtonElement>) => {
					rest.onFocus?.(event);
					setIsFocusInside(false);
				},
				ref: mergedReference,
				...(nested && {
					className: "menu-item",
					"data-nested": "",
					role: "menuitem",
					tabIndex: item.index === activeIndex ? 0 : -1,
				}),
				...(open && {
					"data-open": "",
				}),
				...(isFocusInside && {
					"data-focus-inside": "",
				}),
			}),
		});
	}
);

MenuToggle.displayName = "MenuToggle";
