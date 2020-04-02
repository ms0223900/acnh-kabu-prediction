import React from 'react';
import { Box, Typography, Link, Divider } from '@material-ui/core';
import referenceLinks from '../static/referenceLinks.json';

const version = process.env.REACT_APP_VERSION;

export const LinkItemInFooter = ({
  href,
  title,
}: {
  href: string
  title: string
}) => {
  return (
    <Link 
      display={'block'}
      href={href}
      target={'_blank'}
      color={'textSecondary'}
    >
      {title}
    </Link>
  );
};

const links = referenceLinks;

const Footer = () => {
  return (
    <Box
      style={{
        backgroundColor: '#eee'
      }}
      paddingLeft={2} 
      paddingY={2}
    >
      <Typography>
        {'投資有賺有賠，資料僅供預測，如有任何預測失準，一切以遊戲為主'}
      </Typography>
      <Divider />
      <Typography>
        {'參考來源'}
      </Typography>
      {links.map((link, i) => (
        <LinkItemInFooter
          key={i}
          {...link} />
      ))}
      <Divider />
      <Typography>{`v${version}`}</Typography>
    </Box>
  );
};

export default Footer;