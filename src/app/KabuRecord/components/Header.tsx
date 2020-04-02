import React from 'react';
import { Box, Typography, makeStyles, Button } from '@material-ui/core';
import { reportDocLink } from '../config';

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
          {'動物森友會 大頭菜價格趨勢預測'}
        </Typography>
        {/* <Typography>
          {'Animal Crossing New Horizons'}
        </Typography> */}
      </Box>
      <Button
        // color={'secondary'}
        variant={'outlined'}
        target={'_blank'}
        href={reportDocLink}
      >
        {'問題回報'}
      </Button>
    </Box>
  );
};

export default Header;