import React from 'react';

interface Props {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  [key: string]: any;
}

const TextForm: React.FC<Props> = props => {
  const { value } = props;
  return <> {value || '--'}</>;
};

export default TextForm;
