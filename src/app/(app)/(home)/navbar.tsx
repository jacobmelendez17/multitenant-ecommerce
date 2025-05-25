'use client';

import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { NavbarSidebar } from './navbar-sidebar';
import { MenuIcon } from 'lucide-react';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['700']
});

interface NavbarItemProps {
	href: string;
	children: React.ReactNode;
	isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
	return (
		<Button
			asChild
			variant="outline"
			className={cn(
				'hover:border-primary rounded-full border-transparent bg-transparent px-3.5 text-lg hover:bg-transparent',
				isActive && 'bg-black text-white hover:bg-black hover:text-white'
			)}
		>
			<Link href={href}>{children}</Link>
		</Button>
	);
};

const navbarItems = [
	{ href: '/', children: 'Home' },
	{ href: '/about', children: 'About' },
	{ href: '/features', children: 'Features' },
	{ href: '/pricing', children: 'Pricing' },
	{ href: '/contact', children: 'Contact' }
];

export const Navbar = () => {
	const pathname = usePathname();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<nav className="flex h-20 justify-between border-b bg-white font-medium">
			<Link href="/" className="flex items-center pl-6">
				<span className={cn('text-5xl font-semibold', poppins.className)}>Crisp Commerce</span>
			</Link>

			<NavbarSidebar items={navbarItems} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

			<div className="hideen items-center gap-4 lg:flex">
				{navbarItems.map((item) => (
					<NavbarItem key={item.href} href={item.href} isActive={pathname === item.href}>
						{item.children}
					</NavbarItem>
				))}
			</div>

			<div className="hidden lg:flex">
				<Button
					asChild
					variant="secondary"
					className="h-full rounded-none border-b-0 border-l border-r-0 border-t-0 bg-white px-12 text-lg transition-colors hover:bg-pink-400"
				>
					<Link href="/sign-in">Login</Link>
				</Button>
				<Button
					asChild
					className="h-full rounded-none border-b-0 border-l border-r-0 border-t-0 bg-black px-12 text-lg text-white transition-colors hover:bg-pink-400 hover:text-black"
				>
					<Link href="/sign-up">Start selling</Link>
				</Button>
			</div>

			<div className="flex items-center justify-center lg:hidden">
				<Button
					variant="ghost"
					className="size-12 border-transparent bg-white"
					onClick={() => setIsSidebarOpen(true)}
				>
					<MenuIcon />
				</Button>
			</div>
		</nav>
	);
};
