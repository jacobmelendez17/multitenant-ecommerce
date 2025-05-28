import { Category } from '@/payload-types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
	category: Category;
	isActive?: boolean;
	isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({ category, isActive, isNavigationHovered }: Props) => {
	return (
		<Button
			variant="elevated"
			className={cn(
				'hover:border-primary h-11 rounded-full border-transparent bg-transparent px-4 text-black hover:bg-white',
				isActive && !isNavigationHovered && 'border-primary bg-white'
			)}
		>
			{category.name}
		</Button>
	);
};
