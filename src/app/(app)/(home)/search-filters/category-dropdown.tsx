'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { useDropdownPosition } from './use-dropdown-position';
import { SubcategoryMenu } from './subcategory-menu';
import { CustomCategory } from '../types';

interface Props {
	category: CustomCategory;
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
						isActive && !isNavigationHovered && 'border-primary bg-white',
						isOpen &&
							'border-primary bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px]'
					)}
				>
					<Link href={`/${category.slug === 'all' ? '' : category.slug}`}>{category.name}</Link>
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
