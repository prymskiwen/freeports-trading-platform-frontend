import React from "react";
import { Grid, Card, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  cardRoot: {
    padding: 15,
    marginTop: 10,
  },
  margin0: {
    margin: 0,
  }
}))

const NotifyCard = (): React.ReactElement => {
    const classes = useStyle();

    return(
      <div>
        <Card className={classes.cardRoot}>
          <div>
            <h3 className={classes.margin0}>Re-funding / 23.06.2021 - 14:12</h3>
            <h2 className={classes.margin0}>Notification title</h2>
            <h3 className={classes.margin0}>From (name)</h3>
            <div>
              <Typography>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </Typography>
            </div>
          </div>
        </Card>
      </div>
    )
}

export default NotifyCard;