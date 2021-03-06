import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';

type InfoTooltipProps = {
    title: string;
};

const InfoTooltip = ({ title }: InfoTooltipProps): JSX.Element => {
    const [open, setOpen] = useState(false);

    let id = title.split(' ', 2).join('');
    id = id.slice(0, id.length - 1);

    const handleTooltipClose = () => {
        setOpen(false);
    };
    
    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                id={id}
                title={title}
                open={open}
                placement='top-end'
                arrow
                disableFocusListener
                disableHoverListener
                disableTouchListener
                componentsProps={{
                    tooltip: {
                        sx: {
                            maxWidth: 300,
                            padding: '1rem',
                            color: 'Black',
                            fontSize: 12,
                            lineHeight: 2,
                            backgroundColor: 'White',
                            boxShadow: '0px 0px 5px 1px lightgray',
                            borderBottom: '2px solid DeepSkyBlue',
                            borderRadius: '4px',
                            '& .MuiTooltip-arrow': {
                                color: 'White',
                                '&::before': {
                                    border: '2px solid DeepSkyBlue'
                                }
                            }
                        }
                    }
                }}
                sx={{
                    color: 'DeepSkyBlue',
                    float: 'right',
                    padding: 0,
                }}
            >
                <IconButton onClick={handleTooltipOpen}>
                    <InfoIcon/>
                </IconButton>
            </Tooltip>
        </ClickAwayListener>
    );
};

export default InfoTooltip;