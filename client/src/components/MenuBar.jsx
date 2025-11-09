import React, { useContext, useState } from "react";
import { MenuMenu, MenuItem, Menu } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

function MenuBar() {
  // const [activeItem, setActiveItem] = useState('home'); //Setting home as the default page
  const { user, logout } = useContext(AuthContext)
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const pathname = window.location.pathname;
  // /login
  const path = pathname === "/" ? "home" : pathname.substr(1); //the current user path should be highlighted if it is not home the dafault path. It could be login or otherwise.
  const [activeItem, setActiveItem] = useState(path); //Setting home as the default page

  const menuBar = user ? (
    <div>
      <Menu pointing secondary size="massize" color="teal">
        <MenuItem name={user.username} active as={Link} to="/" />

       <MenuMenu position="right">
        <MenuItem name="logout" active onClick={logout} />
       </MenuMenu>
      </Menu>
    </div>
  ) : (
    //menu that you share when you are not logged in
    <div>
      <Menu pointing secondary size="massize" color="teal">
        <MenuItem
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        {/* <MenuItem
            name='Register'
            active={activeItem === 'Register'}
            onClick={handleItemClick}
          /> */}
        <MenuMenu position="right">
          <MenuItem
            name="Register"
            active={activeItem === "Register"}
            onClick={handleItemClick}
            as={Link}
            to="/Register"
          />
          <MenuItem
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
        </MenuMenu>
      </Menu>

      {/* <Segment>
          <img src='/images/wireframe/media-paragraph.png' />
        </Segment> */}
    </div>
  );

  return menuBar;
}

export default MenuBar;
