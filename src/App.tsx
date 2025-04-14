/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

type ErrorType =
  | 'TodosLoad'
  | 'EmptyTitle'
  | 'UnableToAddTodo'
  | 'UnableToDeleteTodo'
  | 'UnableToUpdateTodo';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [startingTodos, setStartingTodos] = useState<Todo[]>([]);
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [currentError, setCurrentError] = useState<ErrorType | ''>('');
  const [selectedFilter, setSelectedFilter] = useState('#/');

  useEffect(() => {
    client
      .get(`/todos?userId=${USER_ID}`)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      .then((todos: Todo[]) => {
        setVisibleTodos(todos);
        setStartingTodos(todos);
      })
      .catch(() => {
        setCurrentError('TodosLoad');
        // eslint-disable-next-line
        console.warn('Error in loading todos');
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

  const handleTodoFiltering = (query: string) => {
    if (query === 'all') {
      setVisibleTodos(startingTodos);
    }

    if (query === 'active') {
      setVisibleTodos(startingTodos.filter(todo => !todo.completed));
    }

    if (query === 'completed') {
      setVisibleTodos(startingTodos.filter(todo => todo.completed));
    }
  };

  const activeTodos: number = startingTodos.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  const completedTodos: number = startingTodos.filter(
    (todo: Todo) => todo.completed,
  ).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header startingTodos={startingTodos} completedTodos={completedTodos} />
        <TodoList
          visibleTodos={visibleTodos}
          isTodoEditing={isTodoEditing}
          selectedPostId={selectedPostId}
          setIsTodoEditing={setIsTodoEditing}
          setSelectedPostId={setSelectedPostId}
        />
        <Footer
          startingTodos={startingTodos}
          activeTodos={activeTodos}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          handleTodoFiltering={handleTodoFiltering}
        />
      </div>
      <ErrorNotification
        currentError={currentError}
        setCurrentError={setCurrentError}
      />
    </div>
  );
};
