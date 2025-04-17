import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../App';

type Props = {
  startingTodos: Todo[];
  activeTodos: number;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<Filter>>;
  completedTodos: number;
};

export const Footer: React.FC<Props> = ({
  selectedFilter,
  activeTodos,
  setSelectedFilter,
  startingTodos,
  completedTodos,
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
        {Object.values(Filter).map((filter: Filter, index) => {
          return (
            <a
              href={`#/${filter}`}
              key={index}
              className={classNames('filter__link', {
                selected: selectedFilter === filter,
              })}
              data-cy={`FilterLink${filter}`}
              onClick={() => {
                setSelectedFilter(filter);
              }}
            >
              {filter}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
