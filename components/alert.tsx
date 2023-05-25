import Container from "./container";
import cn from "classnames";
import { EXAMPLE_PATH } from "../lib/constants";
import Image from "next/image";

type Props = {
	preview?: boolean;
};

const Alert = ({ preview }: Props) => {
	return (
		<div
			className={cn("border-b", {
				"bg-neutral-800 border-neutral-800 text-white": preview,
				"bg-neutral-50 border-neutral-200": !preview,
			})}
		>
			<Container>
				<div className="py-2 text-sm flex items-center justify-center gap-1">
					Assista todo o meu conteúdo no{" "}
					<a
						href={`https://www.tiktok.com/@mardoica`}
						className="underline hover:text-teal-300 duration-200 transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						TikTok
					</a>
					<Image
						src="/assets/images/logo-tt.png"
						alt="TikTok"
						width={15}
						height={56}
					/>
				</div>
			</Container>
		</div>
	);
};

export default Alert;
