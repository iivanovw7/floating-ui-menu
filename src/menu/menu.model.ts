import type {
	FloatingContext,
	FloatingTreeType,
	OffsetOptions,
	Placement,
	ReferenceType,
	Strategy,
	UseDismissProps,
} from "@floating-ui/react";
import type {
	ComponentProps,
	CSSProperties,
	Dispatch,
	HTMLProps,
	MutableRefObject,
	ReactNode,
	SetStateAction,
} from "react";

export type Dissmiss = UseDismissProps & {
	itemPress?: boolean;
};

export type MenuContextValue = {
	activeIndex: null | number;
	allowHover: boolean;
	context: FloatingContext<ReferenceType>;
	floating: (node: HTMLElement) => void;
	floatingStyles: CSSProperties;
	getFloatingProps: (userProperties?: HTMLProps<HTMLElement>) => Record<string, unknown>;
	getItemProps: (userProperties?: HTMLProps<HTMLElement>) => Record<string, unknown>;
	getReferenceProps: (userProperties?: HTMLProps<Element>) => Record<string, unknown>;
	internalAllowHover: boolean;
	isFocusInside: boolean;
	listContentRef: MutableRefObject<(null | string)[]>;
	listItemsRef: MutableRefObject<(HTMLElement | null)[]>;
	lockScroll: boolean;
	nested: boolean;
	onOpenChange: (isOpen: boolean) => void;
	open?: boolean;
	reference: ((instance: HTMLButtonElement | null) => void) | null;
	setActiveIndex: Dispatch<SetStateAction<null | number>>;
	setInternalOpen: Dispatch<SetStateAction<boolean>>;
	setIsFocusInside: Dispatch<SetStateAction<boolean>>;
	strategy: Strategy;
	tree: FloatingTreeType<ReferenceType> | null;
};

export type MenuProperties = MenuBaseProperties & {};

export type MenuBaseProperties = {
	allowHover?: boolean;
	children: ReactNode;
	dismiss?: Dissmiss;
	lockScroll?: boolean;
	offset?: OffsetOptions;
	onOpenChange?: (isOpned: boolean) => void;
	open?: boolean;
	placement?: Placement;
};

export type MenuListProprerties = ComponentProps<"div"> & {
	children: ReactNode;
	dismissible?: boolean;
};

export type MenuItemProperties = ComponentProps<"li"> & {
	children?: ReactNode;
	disabled?: boolean;
	label: string;
	slotLeft?: ReactNode;
	slotRight?: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MenuToggleProperties = ComponentProps<any> & {
	children: ReactNode;
};

export type MenuDividerProperties = ComponentProps<"div">;

export type MenuLabelProperties = ComponentProps<"div">;
