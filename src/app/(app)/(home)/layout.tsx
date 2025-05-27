import configPromise from '@payload-config';
import { getPayload } from 'payload';

import { Navbar } from './navbar';
import { Footer } from './footer';
import { SearchFilters } from './search-filters';

interface Props {
	children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
	const payload = await getPayload({
		config: configPromise
	});

	const data = await payload.find({
		collection: 'categories',
		depth: 1,
		where: {
			parent: {
				exists: false
			}
		}
	});

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<SearchFilters data={data} />
			<div className="flex-1 bg-[#F4F4F0]">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
