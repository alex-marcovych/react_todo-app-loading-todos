/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export enum ErrorType {
  TodosLoad = 'Unable to load todos',
  EmptyTitle = 'Title should not be empty',
  UnableToAddTodo = 'Unable to add a todo',
  UnableToDeleteTodo = 'Unable to delete a todo',
  UnableToUpdateTodo = 'Unable to update a todo',
}

export enum Filter {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const App: React.FC = () => {
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [currentError, setCurrentError] = useState<ErrorType | ''>('');
  const [selectedFilter, setSelectedFilter] = useState(Filter.all);
  const [todos, setTodos] = useState<Todo[]>([]);

  const startingTodos = useRef<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then((data: Todo[]) => {
        setTodos(data);
        startingTodos.current = data;
      })
      .catch(() => {
        setCurrentError(ErrorType.TodosLoad);
      });
  }, []);

  useEffect(() => {
    if (!currentError) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentError]);

  useEffect(() => {
    switch (selectedFilter) {
      case Filter.all:
        setTodos(startingTodos.current);
        break;

      case Filter.active:
        setTodos(startingTodos.current.filter(todo => !todo.completed));
        break;

      case Filter.completed:
        setTodos(startingTodos.current.filter(todo => todo.completed));
        break;

      default:
        setTodos(startingTodos.current);
    }
  }, [selectedFilter]);

  const activeTodos: number = startingTodos.current.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  const completedTodos: number = startingTodos.current.filter(
    (todo: Todo) => todo.completed,
  ).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          startingTodos={startingTodos.current}
          completedTodos={completedTodos}
        />
        <TodoList
          visibleTodos={todos}
          isTodoEditing={isTodoEditing}
          selectedPostId={selectedPostId}
          setIsTodoEditing={setIsTodoEditing}
          setSelectedPostId={setSelectedPostId}
        />
        {startingTodos && (
          <Footer
            startingTodos={startingTodos.current}
            activeTodos={activeTodos}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            completedTodos={completedTodos}
          />
        )}
      </div>
      <ErrorNotification
        currentError={currentError}
        setCurrentError={setCurrentError}
      />
    </div>
  );
};
