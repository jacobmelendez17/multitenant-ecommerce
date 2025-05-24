import { Navbar } from './navbar';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
