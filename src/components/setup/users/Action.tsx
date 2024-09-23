import {Button, IconButton, Popover} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function Action() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <IconButton aria-label="Example" aria-describedby={id} onClick={handleClick}>
                <MoreVertIcon className={'text-gray-500 dark:text-gray-400 cursor-pointer hover:text-blue-500'}/>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div>
                    <Button variant="outlined" startIcon={<DeleteIcon/>}>
                        Delete
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon/>}>
                        Send
                    </Button>
                </div>
            </Popover>
        </div>
    )
}