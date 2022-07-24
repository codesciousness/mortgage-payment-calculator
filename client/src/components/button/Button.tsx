import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

type ButtonProps = {
    name: string;
    width?: number | string;
    loading?: boolean;
    onClick: () => void;
};

const Button = ({ name, width, loading, onClick }: ButtonProps): JSX.Element => {
    const id = name.replaceAll(' ', '');

    return (
        <LoadingButton
            id={id}
            variant='outlined'
            loading={loading}
            endIcon={<SendIcon />}
            loadingPosition="end"
            onClick={onClick}
            sx={{
                width,
                fontWeight: 'bold',
                margin: '1rem',
                color: 'DeepSkyBlue',
                background: 'linear-gradient(45deg, white, white, white, PaleTurquoise, PowderBlue, SkyBlue, DeepSkyBlue)',
                backgroundSize: '300% 100%',
                transition: 'all 1s ease-in-out',
                '&:hover': {
                    color: 'white',
                    backgroundPosition: '100% 0'
                }
            }}
        >
            {name}
        </LoadingButton>
    );
};

export default Button;