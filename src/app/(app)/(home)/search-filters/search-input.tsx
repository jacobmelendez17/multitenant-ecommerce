'use client';

import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { CustomCategory } from '../types';
import { CategoriesSidebar } from './categories-sidebar';

interface Props {
	disabled?: boolean;
	data: CustomCategory[];
}

export const SearchInput = ({ disabled, data }: Props) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="flex w-full items-center gap-2">
			<CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
			<div className="relative w-full">
				<SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
				<Input className="pl-8" placeholder="Search products" disabled={disabled} />
			</div>

			<Button
				variant="elevated"
				className="flex size-12 shrink-0 lg:hidden"
				onClick={() => setIsSidebarOpen(true)}
			></Button>
			{/* TODO: Add library button */}
		</div>
	);
};
