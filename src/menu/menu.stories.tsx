/* eslint-disable react/hook-use-state */
/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import type { ChangeEventHandler, PropsWithChildren } from "react";

import { ChevronRight, Folder, PaintRoller } from "lucide-react";
import { useState } from "react";

import { Menu } from "./menu.component";

const meta: Meta<typeof Menu> = {
	component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

const Row = (properties: PropsWithChildren) => (
	<div
		style={{
			alignItems: "flex-start",
			display: "flex",
			flexDirection: "row",
			gap: 24,
			height: "fit-content",
			justifyContent: "flex-start",
			padding: "24px 0",
			width: "100%",
		}}
	>
		{properties.children}
	</div>
);

const Grid = (properties: PropsWithChildren) => (
	<div
		style={{
			display: "grid",
			gap: 16,
			gridTemplateColumns: "80px 80px 80px",
			gridTemplateRows: "auto",
			padding: "24px 0",
		}}
	>
		{properties.children}
	</div>
);

export const Basic: Story = {
	args: {},
	render: () => {
		return (
			<Row>
				<Menu placement="bottom-start">
					<Menu.Toggle aria-label="Menu">
						<button>Menu</button>
					</Menu.Toggle>
					<Menu.List>
						<Menu.Label>
							<Folder size={16} />
							Label
						</Menu.Label>
						<Menu.Item label="Item 1" slotRight={<PaintRoller size={16} />} />
						<Menu.Item label="Item 2" slotRight={<PaintRoller size={16} />} />
						<Menu.Item label="Item 3" />
						<Menu.Divider />
						<Menu.Label>Label</Menu.Label>
						<Menu.Item disabled label="Item 4" />
						<Menu.Item disabled label="Item 5" />
					</Menu.List>
				</Menu>
				<Menu placement="bottom-start">
					<Menu.Toggle aria-label="Menu" disabled>
						<button>Menu</button>
					</Menu.Toggle>
				</Menu>
				<Menu open placement="bottom-start">
					<Menu.Toggle aria-label="Menu">
						<button>Menu</button>
					</Menu.Toggle>
					<Menu.List>
						<Menu.Item label="Item 1" />
					</Menu.List>
				</Menu>
			</Row>
		);
	},
};

export const Controlled: Story = {
	args: {},
	render: () => {
		let [isOpen, setIsOpen] = useState(false);
		let [isOpenChangeAllowed, setIsOpenCnahgeAllowed] = useState(false);

		let handleOpenChange = (value: boolean) => {
			if (isOpenChangeAllowed) {
				setIsOpen(value);
			}
		};

		let handleOpenChangeAllowedChange: ChangeEventHandler<HTMLInputElement> = (event) => {
			setIsOpenCnahgeAllowed(!!event.target.checked);
		};

		return (
			<Row>
				<Menu onOpenChange={handleOpenChange} open={isOpen} placement="bottom-start">
					<Menu.Toggle aria-label="Menu">
						<button>Menu</button>
					</Menu.Toggle>
					<Menu.List>
						<Menu.Label>
							<Folder size={16} />
							Label
						</Menu.Label>
						<Menu.Item label="Item 1" slotRight={<PaintRoller size={16} />} />
						<Menu.Item label="Item 2" slotRight={<PaintRoller size={16} />} />
						<Menu.Item label="Item 3" />
						<Menu.Item disabled label="Item 4" />
						<Menu.Item disabled label="Item 5" />
					</Menu.List>
				</Menu>
				<div>
					<input
						checked={isOpenChangeAllowed}
						id="controlled-story-checkbox"
						onChange={handleOpenChangeAllowedChange}
						type="checkbox"
					/>
					<label htmlFor="controlled-story-checkbox">Allow state change</label>
				</div>
			</Row>
		);
	},
};

export const Nested: Story = {
	args: {},
	render: () => (
		<Row>
			<Menu placement="bottom-start">
				<Menu.Toggle aria-label="Menu">
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Label>
						<Folder size={16} />
						Label
					</Menu.Label>
					<Menu.Item label="Item 1" slotLeft={<PaintRoller size={16} />} />
					<Menu.Item label="Item 2" slotLeft={<PaintRoller size={16} />} />
					<Menu.Item label="Item 3" slotLeft={<PaintRoller size={16} />} />
					<Menu.Item disabled label="Item 4" />
					<Menu.Item disabled label="Item 5" />
					<Menu offset={10} placement="right-start">
						<Menu.Toggle aria-label="Menu">
							<Menu.Item label="Item 6" slotRight={<ChevronRight size={16} />} />
						</Menu.Toggle>
						<Menu.List>
							<Menu.Item label="Item 1" slotRight={<PaintRoller size={16} />} />
							<Menu.Item label="Item 2" slotRight={<PaintRoller size={16} />} />
							<Menu.Item label="Item 3" slotRight={<PaintRoller size={16} />} />
							<Menu.Item disabled label="Item 4" />
							<Menu.Item disabled label="Item 5" />
							<Menu offset={10} placement="right-start">
								<Menu.Toggle aria-label="Menu">
									<Menu.Item label="Item 6" slotRight={<ChevronRight size={16} />} />
								</Menu.Toggle>
								<Menu.List>
									<Menu.Item label="Item 1" />
									<Menu.Item label="Item 2" />
									<Menu.Item label="Item 3" />
									<Menu.Item disabled label="Item 4" />
									<Menu.Item disabled label="Item 5" />
								</Menu.List>
							</Menu>
						</Menu.List>
					</Menu>
				</Menu.List>
			</Menu>
		</Row>
	),
};

export const Placement: Story = {
	args: {},
	render: () => (
		<Grid>
			<Menu placement="top-start">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="top">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="top-end">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="right-start">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="right">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="right-end">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="left-start">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="left">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="left-end">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="bottom-start">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="bottom">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
			<Menu placement="bottom-end">
				<Menu.Toggle>
					<button>Menu</button>
				</Menu.Toggle>
				<Menu.List>
					<Menu.Item label="Item 1" />
				</Menu.List>
			</Menu>
		</Grid>
	),
};
