'use client';

import { useRef, useState } from 'react';

import { Category } from '@/payload-types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useDropdownPosition } from './use-dropdown-position';
import { SubcategoryMenu } from './subcategory-menu';

interface Props {
	category: Category;
	isActive?: boolean;
	isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({ category, isActive, isNavigationHovered }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { getDropdownPosition } = useDropdownPosition(dropdownRef);

	const onMouseEnter = () => {
		if (category.subcategories) {
			setIsOpen(true);
		}
	};

	const onMouseLeave = () => setIsOpen(false);

	const dropdownPosition = getDropdownPosition();

	return (
		<div
			className="relative"
			ref={dropdownRef}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className="relative">
				<Button
					variant="elevated"
					className={cn(
						'hover:border-primary h-11 rounded-full border-transparent bg-transparent px-4 text-black hover:bg-white',
						isActive && !isNavigationHovered && 'border-primary bg-white'
					)}
				>
					{category.name}
				</Button>
				{category.subcategories && category.subcategories.length > 0 && (
					<div
						className={cn(
							'absolute -bottom-3 left-1/2 h-0 w-0 -translate-x-1/2 border-b-[10px] border-l-[10px] border-r-[10px] border-b-black border-l-transparent border-r-transparent opacity-0',
							isOpen && 'opacity-100'
						)}
					/>
				)}
			</div>

			<SubcategoryMenu category={category} isOpen={isOpen} position={dropdownPosition} />
		</div>
	);
};
