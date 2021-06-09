import {Drawer} from '@material-ui/core';
import React from 'react';

const Sidebar = () : React.ReactElement => {

  const anchor = 'left'
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div>
      <Drawer anchor={anchor}
        open={isOpen}
        onClose={
          () => setIsOpen(false)
      }>
        list
      </Drawer>
    </div>
  );
}

export default Sidebar;
