import React, { useRef } from 'react';
import './styles.css';

interface Props {
	toDo: string;
	setToDo: React.Dispatch<React.SetStateAction<string>>;
	handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ toDo, setToDo, handleAdd }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className="input"
			onSubmit={(e) => {
				handleAdd(e);
				inputRef.current?.blur();
			}}
		>
			<input
				ref={inputRef}
				type="input"
				placeholder="Adicione uma tarefa"
				className="input__box"
				value={toDo}
				onChange={(e) => setToDo(e.target.value)}
			></input>
			<button
				className="input__submit"
				type="submit"
			>
				+
			</button>
		</form>
	);
};

export default InputField;
