import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";
import Newsletter from "./newsletter";

const Footer = () => {
	return (
		<footer className="bg-neutral-50 border-t border-neutral-200">
			<Container>
				<Newsletter />
			</Container>
		</footer>
	);
};

export default Footer;
