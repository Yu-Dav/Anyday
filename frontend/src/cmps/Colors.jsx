// import React from 'react'

// export function Colors({ onChangeGroupColor }) {

//     return (
//         <div className="color-container">
//             <div className="color darkGreen" data-color="#037f4c" onClick={onChangeGroupColor}></div>
//             <div className="color green" data-color="#00c875" onClick={onChangeGroupColor}></div>
//             <div className="color yellowGreen" data-color="#9cd326" onClick={onChangeGroupColor}></div>
//             <div className="color beige" data-color="#cab641" onClick={onChangeGroupColor}></div>
//             <div className="color yellow" data-color="#ffcb00" onClick={onChangeGroupColor}></div>
//             <div className="color darkPurple" data-color="#784bd1" onClick={onChangeGroupColor}></div>
//             <div className="color purple" data-color="#a25ddc" onClick={onChangeGroupColor}></div>
//             <div className="color turquoise" data-color="#0086BE" onClick={onChangeGroupColor}></div>
//             <div className="color blue" data-color="#579bfc" onClick={onChangeGroupColor}></div>
//             <div className="color lightBlue" data-color="#66ccff" onClick={onChangeGroupColor}></div>
//             <div className="color darkRed" data-color="#bb3354" onClick={onChangeGroupColor}></div>
//             <div className="color red" data-color="#e2445c" onClick={onChangeGroupColor}></div>
//             <div className="color darkOrange" data-color="#ff642e" onClick={onChangeGroupColor}></div>
//             <div className="color orange" data-color="#fdab3d" onClick={onChangeGroupColor}></div>
//             <div className="color brown" data-color="#7f5347" onClick={onChangeGroupColor}></div>
//             <div className="color grey" data-color="#c4c4c4" onClick={onChangeGroupColor}></div>
//             <div className="color darkGrey" data-color="#808080" onClick={onChangeGroupColor}></div>
//         </div>
//     )
// }

import React from 'react';
// import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    MenuList: {
        position: 'fixed'
    }
}));

export function Colors({ onChangeGroupColor, board }) {
    console.log(board);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = (ev) => {
        ev.stopPropagation()
        console.log(open);
        //   ev.preventDefault()
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        <div ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            Change group color
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: '2' }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList className="color-container" autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {board.colors.map((color) => { return <li className={`color ${color.name}`} data-color={color.value} onClick={onChangeGroupColor}></li> })}
                                    {/* <MenuItem data-color={color.value} onClick={onChangeGroupColor} /> */}
                                    {/* <div className="color-container">
                                        <div className="color darkGreen" data-color="#037f4c" onClick={onChangeGroupColor}></div>
                                        <div className="color green" data-color="#00c875" onClick={onChangeGroupColor}></div>
                                        <div className="color yellowGreen" data-color="#9cd326" onClick={onChangeGroupColor}></div>
                                        <div className="color beige" data-color="#cab641" onClick={onChangeGroupColor}></div>
                                        <div className="color yellow" data-color="#ffcb00" onClick={onChangeGroupColor}></div>
                                        <div className="color darkPurple" data-color="#784bd1" onClick={onChangeGroupColor}></div>
                                        <div className="color purple" data-color="#a25ddc" onClick={onChangeGroupColor}></div>
                                        <div className="color turquoise" data-color="#0086BE" onClick={onChangeGroupColor}></div>
                                        <div className="color blue" data-color="#579bfc" onClick={onChangeGroupColor}></div>
                                        <div className="color lightBlue" data-color="#66ccff" onClick={onChangeGroupColor}></div>
                                        <div className="color darkRed" data-color="#bb3354" onClick={onChangeGroupColor}></div>
                                        <div className="color red" data-color="#e2445c" onClick={onChangeGroupColor}></div>
                                        <div className="color darkOrange" data-color="#ff642e" onClick={onChangeGroupColor}></div>
                                        <div className="color orange" data-color="#fdab3d" onClick={onChangeGroupColor}></div>
                                        <div className="color brown" data-color="#7f5347" onClick={onChangeGroupColor}></div>
                                        <div className="color grey" data-color="#c4c4c4" onClick={onChangeGroupColor}></div>
                                        <div className="color darkGrey" data-color="#808080" onClick={onChangeGroupColor}></div>
                                    </div> */}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}
