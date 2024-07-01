export default function SelectField({ name, label, error, value, onChange, disabled, children }) {
	return (
		<label className="form-control w-full">
			<div className="label pt-0">
				<span className="label-text-alt">{label}</span>
			</div>
			<select className={`select select-bordered focus:outline-none focus-within:outline-none ${error?"input-error":""} `} name={name} value={value} onChange={onChange} disabled={disabled}>
				{ children }
			</select>
            <div className="label pb-0">
                <span className="label-text-alt text-error">
                    {error && (error)}            
                </span>
            </div>
		</label>
	);
}
