import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  startingTodos: Todo[];
  completedTodos: number;
};

export const Header: React.FC<Props> = ({ startingTodos, completedTodos }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: startingTodos.length === completedTodos,
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={event => event.preventDefault()}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
