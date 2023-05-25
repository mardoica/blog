import Image from "next/image";
import { CMS_NAME } from "../lib/constants";

const Intro = () => {
	return (
		<header className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
			<Image
				src="/assets/images/Marx.png"
				alt="Mardoica"
				width={100}
				height={100}
				style={{
					filter: "brightness(1.1)",
					borderRadius: "50%",
					marginRight: ".8rem",
				}}
			/>
			<h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
				Mardoica
			</h1>
			<h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
				Meu nome é João, este blog, Mardoica, é o meu espaço de aprendizado em
				público.
			</h2>
		</header>
	);
};

export default Intro;
