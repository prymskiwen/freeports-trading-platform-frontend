import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Snackbar, createStyles, makeStyles, Theme } from "@material-ui/core";

import { useAuth } from "../../../../hooks";

// function TransitionDown(props: TransitionProps) {
//   return <Slide {...props} direction="down" />;
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorSnackbar: {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      top: "75px",
    },
  })
);

const PublicKeyBanner = (): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const [opened, setOpened] = useState(false);
  const [alertText, setAlertText] = useState("");
  const { checkPublicKey } = useAuth();

  useEffect(() => {
    let unmounted = false;

    const checkKey = async () => {
      const getResult = await checkPublicKey();
      if (!getResult.success) {
        if (!unmounted) {
          setAlertText(getResult.data);
          setOpened(true);
        }
      }
    };

    checkKey();

    return () => {
      unmounted = true;
    };
  }, []);

  const vertical = "top";
  const horizontal = "center";
  const messageInfo = "snaxBar";
  const handleClose = () => {
    setOpened(false);
    history.push(`/profile`);
  };
  return (
    <div>
      <Snackbar
        key={messageInfo}
        open={opened}
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        ContentProps={{ className: classes.errorSnackbar }}
        onClose={handleClose}
        message={alertText}
      />
    </div>
  );
};

export default PublicKeyBanner;
