import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'SNP公司技术部出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      // style={{
      //   background: 'none',
      // }}
      links={[
        {
          key: 'web1',
          title: 'MyProjects',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'web2',
          title: 'MyBlogs',
          href: 'https://ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> Dexter源码</>,
          href: 'https://github.com/dexterwu29',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
