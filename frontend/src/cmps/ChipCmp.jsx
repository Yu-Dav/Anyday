import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// import FaceIcon from '@material-ui/icons/Face';
// import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export function ChipCmp({id, label, onRemoveMember, imgUrl}) {
  const classes = useStyles();

  const handleDelete = (ev) => {
    console.info('You clicked the delete icon.');
    onRemoveMember(ev)
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div className={classes.root} data-id={id}>
      <Chip
      data-id={id}
        variant="outlined"
        size="small"
        avatar={<Avatar alt={label} src="/static/images/avatar/1.jpg" />}
        label={label}
        onDelete={handleDelete}
      />
    </div>
  );
}
