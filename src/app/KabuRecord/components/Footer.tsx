import React from 'react';
import { Box, Typography, Link, Divider } from '@material-ui/core';

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
    >
      {title}
    </Link>
  );
};

const links = [
  {
    href: 'https://forum.gamer.com.tw/Co.php?bsn=7287&sn=19239',
    title: '巴哈姆特 【攻略】大頭菜教學 讓你輕鬆致富'
  },
  {
    href: 'https://forum.gamer.com.tw/Co.php?bsn=60539&sn=46540',
    title: '巴哈姆特 【攻略】動物之森，炒股(蕪菁)攻略-日wiki'
  },{
    href: 'https://w.atwiki.jp/doubutsunomori3ds/pages/99.html',
    title: '日文wiki'
  },
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
      <Typography>
        {'投資有賺有賠，資料僅供預測，如有任何預測失準，一切以遊戲為主'}
      </Typography>
      <Divider />
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