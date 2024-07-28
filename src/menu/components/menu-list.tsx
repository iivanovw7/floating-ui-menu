import { FloatingFocusManager, FloatingList, FloatingOverlay, FloatingPortal, useMergeRefs } from "@floating-ui/react";
import { Children, cloneElement, forwardRef, isValidElement } from "react";

import type { MenuListProprerties } from "../menu.model";

import { useMenu } from "./menu-context";
import "./menu-list.css";

export const MenuList = forwardRef<HTMLUListElement, MenuListProprerties>((properties, reference) => {
	let { children, className, ...rest } = properties;
	let {
		context,
		floating,
		floatingStyles,
		getFloatingProps,
		getItemProps,
		listContentRef,
		listItemsRef,
		lockScroll,
		nested,
		onOpenChange,
		open,
		setIsFocusInside,
		tree,
	} = useMenu();

	let mergedReference = useMergeRefs([reference, floating]);

	let menuComponent = (
		<div
			{...rest}
			className="menu-list"
			ref={mergedReference}
			style={floatingStyles}
			{...getFloatingProps({
				onKeyDown: (event) => {
					if (event.key === "Tab") {
						onOpenChange(false);

						if (event.shiftKey) {
							event.preventDefault();
						}
					}
				},
			})}
		>
			{Children.map(
				children,
				(child) =>
					isValidElement(child) &&
					cloneElement(
						child,
						getItemProps({
							className: child.props.className,
							onClick: (event) => {
								child.props.onClick?.(event);
								tree?.events.emit("click");
							},
							onFocus: (event) => {
								child.props.onFocus?.(event);
								setIsFocusInside(true);
								tree?.events.emit("focus");
							},
						})
					)
			)}
		</div>
	);

	let manager = (
		<FloatingFocusManager
			context={context}
			initialFocus={nested ? -1 : 0}
			modal={false}
			returnFocus={!nested}
			visuallyHiddenDismiss
		>
			{menuComponent}
		</FloatingFocusManager>
	);

	if (lockScroll) {
		manager = <FloatingOverlay lockScroll>{manager}</FloatingOverlay>;
	}

	return (
		<FloatingList elementsRef={listItemsRef} labelsRef={listContentRef}>
			<FloatingPortal>{open && manager}</FloatingPortal>
		</FloatingList>
	);
});

MenuList.displayName = "MenuList";
