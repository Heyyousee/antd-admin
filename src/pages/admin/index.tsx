import { t } from 'i18next'

import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import routes from '../../router'
import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd'
import logo from '../../assets/images/logo.svg'
import MyHeader from '../../components/header'
import { query_user_menu } from './service'
import { MyMenuItem, RecordVo } from './data'
import { tree } from '../../utils/treeUtils'
import './index.less'
import useStore from '../../store'
import DynamicIcon from './icons'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

// function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
//     return {key, icon, children, label} as MenuItem;
// }

function getMyItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  parent_id?: number,
  id?: number
): MyMenuItem {
  return { label, key, icon, parent_id, id } as MyMenuItem
}

// const items: MenuItem[] = [
//     getItem(<Link to={'/home'}><span>首页</span></Link>, '1', <PieChartOutlined/>),
//     getItem(<Link to={'/user'}><span>系统管理</span></Link>, '2', <UserOutlined/>, [
//         getItem(<Link to={'/user'}><span>用户管理</span></Link>, '3'),
//         getItem(<Link to={'/role'}><span>角色管理</span></Link>, '4'),
//         getItem(<Link to={'/menu'}><span>菜单管理</span></Link>, '5'),
//     ]),
//     getItem(<Link to={'/log'}><span>日志管理</span></Link>, '6', <DesktopOutlined/>, [
//         getItem(<Link to={'/log'}><span>登录日志</span></Link>, '7')]),
//     getItem(<Link to={'/pie'}><span>常用图表</span></Link>, '8', <UserOutlined/>, [
//         getItem(<Link to={'/pie'}><span>饼图</span></Link>, '9'),
//         getItem(<Link to={'/line'}><span>线图</span></Link>, '10'),
//         getItem(<Link to={'/bar'}><span>柱状图</span></Link>, '11'),
//     ]),
//     getItem(<Link to={'/center'}><span>个人中心</span></Link>, '12', <UserOutlined/>, [
//         getItem(<Link to={'/center'}><span>个人中心</span></Link>, '13'),
//         getItem(<Link to={'/setting'}><span>个人设置</span></Link>, '14'),
//     ]),
// ];

const Admin: React.FC = () => {
  const { setUserName, setAvatar } = useStore() as any
  const routesElement = useRoutes(routes)

  let navigate = useNavigate()
  const location = useLocation();
  const [menuItem, setMenuItem] = useState<MenuItem[]>([])
  const [menuVo, setMenuVo] = useState<RecordVo[]>([])
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer,borderRadiusLG  },
  } = theme.useToken()

  useEffect(() => {
    query_user_menu().then((res) => {
      setUserName(res.data.name)
      setAvatar(res.data.avatar)
      setMenuVo(res.data.sys_menu)
      const menu = tree(menuListTree(res.data.sys_menu), 0, 'parent_id')
      setMenuItem(menu)
    }).catch((err) => {
    });
  }, [])

  const menuListTree = (menuList: RecordVo[]) => {
    return menuList.map((item) => {
      return getMyItem(
        <span>{item.name}</span>,
        item.path,
        // <PieChartOutlined />,
        <DynamicIcon iconName={item.icon} />,
        item.parent_id,
        item.id
      )
    })
  }

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const getFarthers = (path: string): string[] => {
    let meun = menuVo.find((item) => item.path === path);
    if (meun && meun.parent_id) {
      let pid = meun.parent_id;
      let parent = menuVo.find((item) => item.id === pid);
      if (parent && parent.path) {
        return [...getFarthers(parent.path)]
      }
    }
    return [path]
  };
  
  const mytheme = "light";
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null} 
        breakpoint="lg"
        theme= {mytheme}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Link to="/home" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{ height: 32, width: 32, margin: 16 }}
            src={logo}
            alt="logo"
          />
          <h1 style={{ marginBottom: 0, color: 'white', fontSize: 20 }}>
            hello
          </h1>
        </Link>
        <Menu
          theme= {mytheme}
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={getFarthers(location.pathname)}
          // onOpenChange={onOpenChange} 
          mode="inline"
          items={menuItem}
          onClick={(item) => {
            navigate(item.key)
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: colorBgContainer, height: '40px' }}
        >
          <MyHeader></MyHeader>

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: 40,
              height: 40,
              marginLeft: '2px',
              top: 0,
              position: 'absolute',
            }}
          />
        </Header>
        <Content style={{ margin: '2px 2px', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Breadcrumb style={{ margin: '2px 2px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ minHeight: 360, }}>
            {routesElement}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>{t('写点东西在这里')}</Footer>
      </Layout>
    </Layout>
  )
}

export default Admin
