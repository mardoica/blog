import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

const Footer = () => {
	return (
		<footer className="bg-neutral-50 border-t border-neutral-200">
			<Container>
				<div className="py-28 flex flex-col lg:flex-row items-center">
					{/* newsletter */}
					<div className="flex flex-col  justify-center gap-4">
						<div>
							<div className="text-2xl font-bold">Newsletter</div>
							<p className="text-lg">
								Receba os novos posts no seu email, semanalmente.
							</p>
						</div>
						<div className="flex gap-4">
							<input
								className="border border-gray-400 p-2 rounded"
								type="text"
								placeholder="Seu email"
							/>
							<button className="bg-comuna text-white font-bold py-2 px-4 rounded">
								Assinar
							</button>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
