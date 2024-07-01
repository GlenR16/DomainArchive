import React from "react";

export default function InputField({ name, type, placeholder, label, error, value, onChange, disabled = false }) {
	return (
		<label className="form-control w-full">
			<div className="label pt-0">
				<span className="label-text-alt">{label}</span>
			</div>
			<input name={name} type={type} autoComplete="off" className={`input input-bordered w-full focus:outline-none focus-within:outline-none ${error?"input-error":""} `} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
			<div className="label pb-0">
                <span className="label-text-alt text-error">
                    {error ? (error) : ""}     
                </span>
            </div>
		</label>
	);
}
