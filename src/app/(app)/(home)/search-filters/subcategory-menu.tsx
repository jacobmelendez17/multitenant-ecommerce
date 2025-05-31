import { Category } from '@/payload-types';
import Link from 'next/link';

interface Props {
	category: Category;
	isOpen: boolean;
	position: { top: number; left: number };
}

export const SubcategoryMenu = ({ category, isOpen, position }: Props) => {
	if (!isOpen || category.subcategories?.length === 0) {
		return null;
	}

	const backgroundColor = category.color || '#F5F5F5';

	return (
		<div
			className="z-100 fixed"
			style={{
				top: position.top,
				left: position.left
			}}
		>
			{/* Invisible bridge to maintian hover */}
			<div className="h-3 w-60" />
			<div
				style={{ backgroundColor }}
				className="w-60 -translate-x-[2px] -translate-y-[2px] overflow-hidden rounded-md border text-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
			>
				<div>
					{category.subcategories?.map((subcategory: Category) => (
						<Link
							key={subcategory.slug}
							href="/"
							className="flex w-full items-center justify-between p-4 text-left font-medium underline hover:bg-black hover:text-white"
						>
							{subcategory.name}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
