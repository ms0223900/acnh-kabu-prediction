import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#b0f7e3'
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Box 
      className={classes.root} 
      paddingLeft={2} 
      paddingY={2}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
      >
        <Box paddingRight={2}>
          <img 
            src={'./images/Animal_Crossing_Leaf.png'} 
            alt={'logo'} 
            style={{
              width: 20,
              height: 'auto'
            }}
          />
        </Box>
        <Typography>
          {'動物森友會 Animal Crossing New Horizons 大頭菜價格趨勢預測'}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;