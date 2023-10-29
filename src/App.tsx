import React, { useState } from 'react';
import './App.css';
import './_resets.css';
import { ToDo } from './model';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
	const [toDo, setToDo] = useState<string>('');
	const [toDos, setToDos] = useState<ToDo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<ToDo[]>([]);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();

		if (toDo) {
			setToDos([...toDos, { id: Date.now(), toDo, isDone: false }]);
		}
		setToDo('');
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		let add,
			active = toDos,
			complete = completedTodos;

		if (source.droppableId === 'TodosList') {
			add = active[source.index];
			active.splice(source.index, 1);
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
		}

		if (destination.droppableId === 'TodosList') {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}

		setCompletedTodos(complete);
		setToDos(active);
	};

	console.log(toDos);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<span className="header">Minhas Tarefas 📝</span>
				<InputField
					toDo={toDo}
					setToDo={setToDo}
					handleAdd={handleAdd}
				/>
				<ToDoList
					toDos={toDos}
					setToDos={setToDos}
					completedTodos={completedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
			</div>
		</DragDropContext>
	);
};

export default App;
