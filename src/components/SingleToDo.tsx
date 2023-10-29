import React, { useEffect, useState, useRef } from 'react';
import { ToDo } from '../model';
import { AiFillEdit } from 'react-icons/ai';
import { MdDone, MdDelete } from 'react-icons/md';
import './styles.css';
import ToDoList from './ToDoList';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
	toDo: ToDo;
	toDos: ToDo[];
	setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
	index: number;
};

const SingleToDo = ({ toDo, toDos, setToDos, index }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, seteditTodo] = useState(toDo.toDo);

	const handleDone = (id: number) => {
		setToDos(
			toDos.map((toDo) =>
				toDo.id === id ? { ...toDo, isDone: !toDo.isDone } : toDo
			)
		);
	};

	const handleDelete = (id: number) => {
		setToDos(toDos.filter((toDo) => toDo.id !== id));
	};

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();

		setToDos(
			toDos.map((toDo) => (toDo.id === id ? { ...toDo, toDo: editTodo } : toDo))
		);

		setEdit(false);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	return (
		<Draggable
			draggableId={toDo.id.toString()}
			index={index}
		>
			{(provided) => (
				<form
					className="toDos__single"
					onSubmit={(e) => handleEdit(e, toDo.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{edit ? (
						<input
							ref={inputRef}
							value={editTodo}
							onChange={(e) => seteditTodo(e.target.value)}
							className="toDos__edit"
						/>
					) : toDo.isDone ? (
						<s className="toDos__single--text">{toDo.toDo}</s>
					) : (
						<span className="toDos__single--text">{toDo.toDo}</span>
					)}

					<div className="icons">
						<span
							className="icon"
							onClick={() => {
								if (!edit && !toDo.isDone) {
									setEdit(!edit);
								}
							}}
						>
							<AiFillEdit />
						</span>
						<span
							className="icon"
							onClick={() => handleDelete(toDo.id)}
						>
							<MdDelete />
						</span>
						<span
							className="icon"
							onClick={() => handleDone(toDo.id)}
						>
							<MdDone />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
};

export default SingleToDo;
