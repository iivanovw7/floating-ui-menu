import type { Placement } from "@floating-ui/react";

import {
	autoUpdate,
	flip,
	FloatingNode,
	offset,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useFloatingNodeId,
	useFloatingParentNodeId,
	useFloatingTree,
	useHover,
	useInteractions,
	useListNavigation,
	useMergeRefs,
	useRole,
	useTypeahead,
} from "@floating-ui/react";
import { Children, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from "react";

import type { MenuBaseProperties, MenuContextValue } from "../menu.model";

import { MenuContextProvider } from "./menu-context";

const defaultProps = {
	allowHover: false,
	dismiss: {
		bubbles: true,
		itemPress: true,
	},
	lockScroll: false,
	offset: 5,
	placement: "bottom",
};

export const MenuBase = forwardRef<HTMLButtonElement, MenuBaseProperties>((properties, forwardedReference) => {
	let [internalOpen, setInternalOpen] = useState(false);
	let [internalAllowHover, setInternalAllowHover] = useState(false);
	let [activeIndex, setActiveIndex] = useState<null | number>(null);
	let [isFocusInside, setIsFocusInside] = useState(false);

	let listItemsReference = useRef<(HTMLButtonElement | null)[]>([]);
	let listContentReference = useRef(
		Children.map(properties.children, (child) => (isValidElement(child) ? child.props.label : null)) as (
			| null
			| string
		)[]
	);

	let open = properties.open ?? internalOpen;
	let onOpenChange = properties.onOpenChange ?? setInternalOpen;
	let placement = properties.placement ?? (defaultProps.placement as Placement);
	let offsetProperty = properties.offset ?? defaultProps.offset;
	let dismiss = properties.dismiss ?? defaultProps.dismiss;
	let lockScroll = properties.lockScroll ?? defaultProps.lockScroll;
	let allowHover = properties.allowHover ?? defaultProps.allowHover;

	let tree = useFloatingTree();
	let nodeId = useFloatingNodeId();
	let parentId = useFloatingParentNodeId();
	let nested = parentId !== null;

	let { context, floatingStyles, refs, strategy, x, y } = useFloating<HTMLButtonElement>({
		middleware: [offset(offsetProperty), flip(), shift()],
		nodeId,
		onOpenChange,
		open,
		placement,
		whileElementsMounted: autoUpdate,
	});

	let { getFloatingProps, getItemProps, getReferenceProps } = useInteractions([
		useHover(context, {
			delay: { open: 75 },
			enabled: properties.allowHover || (nested && internalAllowHover),
			handleClose: safePolygon({
				blockPointerEvents: true,
				buffer: 25,
			}),
		}),
		useClick(context, {
			event: "mousedown",
			ignoreMouse: nested,
			toggle: !nested || !internalAllowHover,
		}),
		useRole(context, { role: "menu" }),
		useDismiss(context, dismiss),
		useListNavigation(context, {
			activeIndex,
			listRef: listItemsReference,
			nested,
			onNavigate: setActiveIndex,
		}),
		useTypeahead(context, {
			activeIndex,
			listRef: listContentReference,
			onMatch: open ? setActiveIndex : undefined,
		}),
	]);

	useEffect(() => {
		/**
		 * Tree click handler.
		 */
		let handleTreeClick = () => {
			if (dismiss.itemPress) {
				onOpenChange(false);
			}
		};

		/**
		 * Updates submenu open state.
		 */
		let onSubMenuOpen = (event: { nodeId: string; parentId: string }) => {
			if (event.nodeId !== nodeId && event.parentId === parentId) {
				onOpenChange(false);
			}
		};

		tree?.events.on("click", handleTreeClick);
		tree?.events.on("menuopen", onSubMenuOpen);

		return () => {
			tree?.events.off("click", handleTreeClick);
			tree?.events.off("menuopen", onSubMenuOpen);
		};
	}, [tree, nodeId, parentId, dismiss.itemPress, onOpenChange]);

	useEffect(() => {
		/**
		 * Pointer move handler.
		 */
		let onPointerMove = ({ pointerType }: PointerEvent) => {
			if (pointerType !== "touch") {
				setInternalAllowHover(true);
			}
		};

		/**
		 * keydown handler.
		 */
		let onKeyDown = () => {
			setInternalAllowHover(false);
		};

		window.addEventListener("pointermove", onPointerMove, {
			capture: true,
			once: true,
		});

		window.addEventListener("keydown", onKeyDown, true);

		return () => {
			window.removeEventListener("pointermove", onPointerMove, {
				capture: true,
			});

			window.removeEventListener("keydown", onKeyDown, true);
		};
	}, [internalAllowHover]);

	useEffect(() => {
		if (open && tree) {
			tree.events.emit("menuopen", { nodeId, parentId });
		}
	}, [tree, nodeId, parentId, open]);

	let reference = useMergeRefs([refs.setReference, forwardedReference]);

	let contextValue: MenuContextValue = useMemo(
		() => ({
			activeIndex,
			allowHover,
			context,
			floating: refs.setFloating,
			floatingStyles,
			getFloatingProps,
			getItemProps,
			getReferenceProps,
			internalAllowHover,
			isFocusInside,
			listContentRef: listContentReference,
			listItemsRef: listItemsReference,
			lockScroll,
			nested,
			onOpenChange,
			open,
			reference,
			setActiveIndex,
			setInternalOpen,
			setIsFocusInside,
			strategy,
			tree,
			x,
			y,
		}),
		[
			activeIndex,
			allowHover,
			context,
			refs.setFloating,
			floatingStyles,
			getFloatingProps,
			getItemProps,
			getReferenceProps,
			onOpenChange,
			internalAllowHover,
			isFocusInside,
			lockScroll,
			nested,
			open,
			reference,
			strategy,
			tree,
			x,
			y,
		]
	);

	return (
		<MenuContextProvider value={contextValue}>
			<FloatingNode id={nodeId}>{properties.children}</FloatingNode>
		</MenuContextProvider>
	);
});
