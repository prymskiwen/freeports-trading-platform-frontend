import React, { useState } from "react";
import { useHistory } from "react-router";
import { Snackbar, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

import useAuth from "../../../../hooks";

// function TransitionDown(props: TransitionProps) {
//   return <Slide {...props} direction="down" />;
// }

const PublicKeyBanner = (): React.ReactElement =>{
  const history = useHistory();
  const [opened, setOpened] = useState(true);
  const { isAuthenticated, signOut } = useAuth();
  const vertical = 'top';
  const horizontal = 'center';
  const messageInfo = 'snaxBar';
  const handleClose = () => {
    setOpened(false);
    history.push(`/profile`);
  }
  return (
    <div>
      <Snackbar
        key={messageInfo}
        open={opened}
        autoHideDuration={2000}
        anchorOrigin={{vertical, horizontal}}
        onClose={handleClose}
        message="missing public key"
      />
    </div>
  )
}

export default PublicKeyBanner;