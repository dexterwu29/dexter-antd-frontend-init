import {Footer} from '@/components';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Helmet, history, useModel} from '@umijs/max';
import {message, Tabs} from 'antd';
import {createStyles} from 'antd-style';
import React, {useState} from 'react';
import Settings from '../../../../config/defaultSettings';
import {userLoginUsingPost} from "@/services/backend/userController";

const useStyles = createStyles(({token}) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });
      const defaultLoginSuccessMessage = '登录成功！';
      message.success(defaultLoginSuccessMessage);
      // 获取已登录的用户信息
      setInitialState({
        ...initialState,
        currentUser: res.data,
      })
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } catch (error) {
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      const defaultLoginFailureMessage = `登录失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" style={{height: '100%'}} src="/logo.svg"/>}
          title="Ant Design"
          subTitle={'Ant Design 是西湖区最具影响力的 Web 设计规范'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          >
            <a>新用户注册</a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
