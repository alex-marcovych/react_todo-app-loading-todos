import React from 'react';
import classNames from 'classnames';

type Props = {
  currentError: string;
  setCurrentError: React.Dispatch<React.SetStateAction<'' | ErrorType>>;
};

type ErrorType =
  | 'TodosLoad'
  | 'EmptyTitle'
  | 'UnableToAddTodo'
  | 'UnableToDeleteTodo'
  | 'UnableToUpdateTodo';

export const ErrorNotification: React.FC<Props> = ({
  currentError,
  setCurrentError,
}) => {
  // eslint-disable-next-line
  const ERROR_MESSAGES: any = {
    TodosLoad: 'Unable to load todos',
    EmptyTitle: 'Title should not be empty',
    UnableToAddTodo: 'Unable to add a todo',
    UnableToDeleteTodo: 'Unable to delete a todo',
    UnableToUpdateTodo: 'Unable to update a todo',
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: currentError === '' },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setCurrentError('')}
      />
      {currentError && ERROR_MESSAGES[currentError]}
    </div>
  );
};
