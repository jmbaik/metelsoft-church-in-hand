import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { ProSidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { MSideSubTitle } from '../../components/MSideComp';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const MSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  내손안의 교회
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  White Fox
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Super Admin
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title="Dashboard"
              to="/"
              icon={<GridViewOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="코드 등록 [관리자]"
              to="/common-code"
              icon={<AdminPanelSettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <MSideSubTitle title="목사님 말씀" />
            <Item
              title="Youtube 영상"
              to="/youtube-pastor"
              icon={<SubscriptionsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu title="사람들" icon={<Person3OutlinedIcon />}>
              <Item
                title="Manage Team"
                to="/team"
                icon={<ConnectWithoutContactIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default MSidebar;
