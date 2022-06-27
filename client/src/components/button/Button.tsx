import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

type ButtonProps = {
    name: string;
    onClick: () => void;
}

const Button = ({ name, onClick }: ButtonProps): JSX.Element => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingButton
            className="Button"
            variant="outlined"
            loading={loading}
            endIcon={<SendIcon />}
            loadingPosition="end"
            onClick={onClick}
            sx={{
                fontWeight: 'bold',
                margin: '2rem 1rem',
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
}

export default Button;