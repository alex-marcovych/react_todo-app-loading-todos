import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  startingTodos: Todo[];
  activeTodos: number;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  handleTodoFiltering: (v: string) => void;
};

export const Footer: React.FC<Props> = ({
  selectedFilter,
  activeTodos,
  handleTodoFiltering,
  setSelectedFilter,
  startingTodos,
}) => {
  return (
    <footer
      className={classNames('todoapp__footer', {
        'is-hidden': startingTodos.length === 0,
      })}
      data-cy="Footer"
    >
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class FILTERMB*/}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === '#/',
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            setSelectedFilter('#/');
            handleTodoFiltering('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === '#/active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setSelectedFilter('#/active');
            handleTodoFiltering('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === '#/completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setSelectedFilter('#/completed');
            handleTodoFiltering('completed');
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
