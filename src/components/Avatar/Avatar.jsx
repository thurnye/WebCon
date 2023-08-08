import React from 'react';
import { Box } from "@mui/material";


const Avatar = ({image, size="60px"}) => {

    return (
        <Box width={size} height={size}>
            <img
                style={{objectFit: 'cover', borderRadius: '50%'}}
                width={size}
                height={size}
                alt={image?.name}
                src={image?.avatar}
            />
        </Box>
    )
}

export default Avatar;