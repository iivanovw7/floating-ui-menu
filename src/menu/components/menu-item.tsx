/* eslint-disable jsx-a11y/prefer-tag-over-role */
import type { ButtonHTMLAttributes, MouseEventHandler } from "react";

import { useListItem, useMergeRefs } from "@floating-ui/react";
import { forwardRef } from "react";

import type { MenuItemProperties } from "../menu.model";

import { useMenu } from "./menu-context";
import "./menu-item.css";

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProperties & ButtonHTMLAttributes<HTMLButtonElement>>(
	(properties, reference) => {
		let { disabled = false, label, onMouseEnter, slotLeft, slotRight, ...rest } = properties;
		let { activeIndex, allowHover, internalAllowHover, listItemsRef, open, setActiveIndex } = useMenu();
		let item = useListItem({ label: disabled ? null : label });

		let handleMouseEnter: MouseEventHandler<HTMLButtonElement> = (event) => {
			if ((allowHover && open) || (internalAllowHover && open)) {
				setActiveIndex(item.index);
			}

			onMouseEnter?.(event);
		};

		let setReference = (node: HTMLButtonElement) => {
			listItemsRef.current[item.index] = node;
		};

		return (
			<button
				{...rest}
				className="menu-item"
				disabled={disabled}
				onMouseEnter={handleMouseEnter}
				ref={useMergeRefs([item.ref, reference, setReference])}
				role="menuitem"
				tabIndex={activeIndex === item.index ? 0 : -1}
				type="button"
			>
				{slotLeft && <div className="menu-item-slot-left">{slotLeft}</div>}
				<div className="menu-item-label">{label}</div>
				{slotRight && <div className="menu-item-slot-right">{slotRight}</div>}
			</button>
		);
	}
);

MenuItem.displayName = "MenuItem";
