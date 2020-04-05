import React from 'react';
import { Box, Typography, Link, Divider, List, ListItemText, ListItem } from '@material-ui/core';
import referenceLinks from '../static/referenceLinks.json';
import texts from '../static/lang/texts.json';

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
const footerRemarks = [
  `${texts['zh_TW']['footer.remark.1']}`,
  `${texts['zh_TW']['footer.remark.2']}`,
  `${texts['zh_TW']['footer.remark.3']}`,
];

const Footer = () => {
  return (
    <Box
      style={{
        backgroundColor: '#eee'
      }}
      paddingLeft={2} 
      paddingY={2}
    >
      {footerRemarks.map((r, i) => (
        <>
          <Typography key={i}>{r}</Typography>
          <Divider />
        </>
      ))}
      <Box paddingY={1}>
        <Typography>
          {'參考來源'}
        </Typography>
        {links.map((link, i) => (
          <LinkItemInFooter
            key={i}
            {...link} />
        ))}
        <Divider />
      </Box>
      <Typography>{`v${version}`}</Typography>
    </Box>
  );
};

export default Footer;