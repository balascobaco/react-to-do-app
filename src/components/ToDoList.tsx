import React from 'react';
import { ToDo } from '../model';
import './styles.css';
import SingleToDo from './SingleToDo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
	toDos: ToDo[];
	setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
	completedTodos: ToDo[];
	setCompletedTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoList: React.FC<Props> = ({
	toDos,
	setToDos,
	completedTodos,
	setCompletedTodos,
}) => {
	return (
		<div className="container">
			<Droppable droppableId="TodosList">
				{(provided, snapshot) => (
					<div
						className={`toDos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="toDos__heading">Tarefas em Aberto</span>
						{toDos.map((toDo, index) => (
							<SingleToDo
								index={index}
								toDo={toDo}
								toDos={toDos}
								key={toDo.id}
								setToDos={setToDos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Droppable droppableId="CompletedTasks">
				{(provided, snapshot) => (
					<div
						className={`toDos completed ${
							snapshot.isDraggingOver ? 'dragcomplete' : ''
						}`}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						<span className="toDos__heading">Tarefas Concluídas</span>
						{completedTodos.map((toDo, index) => (
							<SingleToDo
								index={index}
								toDo={toDo}
								toDos={completedTodos}
								key={toDo.id}
								setToDos={setCompletedTodos}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default ToDoList;
