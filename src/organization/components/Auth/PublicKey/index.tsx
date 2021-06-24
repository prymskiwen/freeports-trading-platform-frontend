import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Snackbar, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

import useAuth from "../../../../hooks";

// function TransitionDown(props: TransitionProps) {
//   return <Slide {...props} direction="down" />;
// }

const PublicKeyBanner = (): React.ReactElement =>{
  const history = useHistory();
  const [opened, setOpened] = useState(false);
  const [alertText, setAlertText] = useState("");
  const { checkPublicKey } = useAuth();

  useEffect(() => {
    let unmounted = false;

    const checkKey = async () => {
      const getResult = await checkPublicKey();
      if(!getResult.success){
        setAlertText(getResult.data);
        setOpened(true)
      }
    };

    checkKey();

    return () => {
      unmounted = true;
    };
  }, []);

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
        message={alertText}
      />
    </div>
  )
}

export default PublicKeyBanner;