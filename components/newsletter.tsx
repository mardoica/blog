import { useRef, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import * as Toast from "@radix-ui/react-toast";

const SimpleSpinner = () => (
	<svg
		className="animate-spin h-5 w-5 text-white"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
		></circle>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		></path>
	</svg>
);

const validateEmail = (email) => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
};

const Newsletter = () => {
	const [email, setEmail] = useState("");
	const recaptchaRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [hint, setHint] = useState("");

	const handleChange = ({ target: { value } }) => {
		setEmail(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (loading) return;
		if (!email || !email.length) return;
		if (!validateEmail(email)) {
			setHint("Por favor, insira um email válido.");
			return;
		}
		// Execute the reCAPTCHA when the form is submitted
		recaptchaRef.current.execute();
	};

	const onReCAPTCHAChange = async (captchaCode) => {
		// If the reCAPTCHA code is null or undefined indicating that
		// the reCAPTCHA was expired then return early
		if (!captchaCode) {
			return;
		}
		// Else reCAPTCHA was executed successfully
		setHint("");
		setError(false);
		setLoading(true);
		try {
			await axios.post("/api/subscribe", {
				email,
				captchaCode,
			});

			setEmail("");
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
			}, 5000);
		} catch (error) {
			setOpen(true);
			setError(true);
			setTimeout(() => {
				setOpen(false);
			}, 5000);
		}
		setLoading(false);

		// Reset the reCAPTCHA so that it can be executed again if user
		// submits another email.
		recaptchaRef.current.reset();
	};

	return (
		<div className="py-28 flex flex-col lg:flex-row items-center">
			<Toast.Provider swipeDirection="right">
				<form onSubmit={handleSubmit}>
					<ReCAPTCHA
						ref={recaptchaRef}
						size="invisible"
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
						onChange={onReCAPTCHAChange}
					/>
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
								value={email}
								onChange={handleChange}
							/>
							<button
								type="submit"
								className="bg-comuna text-white font-bold py-2 px-4 rounded"
								disabled={loading}
							>
								{/* <SimpleSpinner /> */}
								{loading ? <SimpleSpinner /> : "Assinar"}
							</button>
						</div>
						{hint && <p className="text-sm text-gray-500">{hint}</p>}
					</div>

					<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
						<Toast.Title className="ToastTitle">
							{error ? "Ops, algo deu errado" : "Venceremos!"}
						</Toast.Title>
						<Toast.Description>
							{error ? (
								"Não foi possível assinar a newsletter. Tente novamente mais tarde."
							) : (
								<>
									Seu email foi cadastrado na nossa newsletter
									<br />
									Obrigado camarada! ☭
								</>
							)}
						</Toast.Description>
						<Toast.Action className="ToastAction" asChild altText="Dismiss">
							<button className={`Button small ${error ? "red" : "green"}`}>
								Ok
							</button>
						</Toast.Action>
					</Toast.Root>
					<Toast.Viewport className="ToastViewport" />
				</form>
			</Toast.Provider>
		</div>
	);
};

export default Newsletter;
