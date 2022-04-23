import { ChangeEventHandler, FC, Fragment, InputHTMLAttributes, useState } from 'react';
import { Box, Switch } from 'theme-ui';

interface property extends InputHTMLAttributes<HTMLInputElement> {
  child: InputHTMLAttributes<HTMLInputElement>[];
}

const checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = (prop, ind) => (
  <Fragment key={ind}>
    <Switch {...{ label: prop.name ? prop.name : '', ...prop }} />
  </Fragment>
);

const IndeterminateCheckbox: FC<property> = (prop) => {
  const [checked, setChecked] = useState(prop.child.map((_) => _.defaultChecked as boolean));

  const handleChangeParent: ChangeEventHandler<HTMLInputElement> = (event) => {
    setChecked(checked.map((_) => event.target.checked));
    prop.onChange?.call(undefined, event);
  };

  const handleChangeChild: (index: number) => ChangeEventHandler<HTMLInputElement> = (index) => (event) => {
    setChecked(checked.map((_, ind) => (ind === index ? event.target.checked : _)));
    if (prop.child[index].onChange) {
      prop.child[index].onChange!(event);
    }
  };

  return (
    <>
      <Switch
        label={prop.name ? prop.name : ''}
        checked={checked.every((_) => _)}
        // indeterminate={checked.some((_) => _) && checked.some((_) => !_)}
        onChange={handleChangeParent}
      />
      <Box px={40}>
        {prop.child.map((prop, ind) => {
          const { onChange, defaultChecked, ...prop_ } = prop;
          return checkbox({ ...prop_, checked: checked[ind], onChange: handleChangeChild(ind) }, ind);
        })}
      </Box>
    </>
  );
};

IndeterminateCheckbox.defaultProps = {
  name: 'Parent',
  child: [
    {
      name: 'Child 1',
      defaultChecked: true,
    },
    {
      name: 'Child 2',
      defaultChecked: false,
    },
  ],
};

export default IndeterminateCheckbox;
