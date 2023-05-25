const VisitsBoard = () => {
	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col items-center gap-4">
				<div className="text-2xl font-bold">Visitas</div>
				<p className="text-lg">Veja quantas pessoas já visitaram este post.</p>
			</div>
			<div className="flex gap-4">
				<input
					className="border border-gray-400 p-2 rounded"
					type="text"
					placeholder="Seu email"
				/>
				<button className="bg-comuna text-white font-bold py-2 px-4 rounded" />
			</div>
		</div>
	);
};

export default VisitsBoard;
