import { Category } from '@/payload-types';
import configPromise from '@payload-config';
import { getPayload } from 'payload';

import { Navbar } from './navbar';
import { Footer } from './footer';
import { SearchFilters } from './search-filters';
import { CustomCategory } from './types';

interface Props {
	children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
	const payload = await getPayload({
		config: configPromise
	});

	const data = await payload.find({
		collection: 'categories',
		depth: 1, // Populate subcategories, subcategories.[0] will be of type "Category"
		pagination: false,
		where: {
			parent: {
				exists: false
			}
		},
		sort: 'name'
	});

	const formattedData: CustomCategory[] = data.docs.map((doc) => ({
		...doc,
		subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
			// Guaranteed to be a Category
			...(doc as Category)
		}))
	}));

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<SearchFilters data={formattedData} />
			<div className="flex-1 bg-[#F4F4F0]">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
