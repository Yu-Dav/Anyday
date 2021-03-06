import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export function Snack({ onRemoveTask }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        // setTimeout(onRemoveTask, 1000)
        setOpen(true);
        onRemoveTask()
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <i className= "fas fa-trash remove-task"  onClick={handleClick}></i>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    color: '#323338',
                    fontFamily: "Roboto-light",
                    backgroundColor: '#c4c4c4'

                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Task deleted"
                varient='success'
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}