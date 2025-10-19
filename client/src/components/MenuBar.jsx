import React, { useState } from 'react'
// import { MenuMenu, MenuItem, Menu, Segment } from 'semantic-ui-react'
import { MenuMenu, MenuItem, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function MenuBar() {
// const [activeItem, setActiveItem] = useState('home'); //Setting home as the default page
  const handleItemClick = (e, { name }) => setActiveItem(name)
  const pathname = window.location.pathname
  // /login
  const path = pathname === '/' ? "home" : pathname.substr(1) //the current user path should be highlighted if it is not home the dafault path. It could be login or otherwise.
    const [activeItem, setActiveItem] = useState(path); //Setting home as the default page

    return (
      <div>
        <Menu pointing secondary size='massize' color='teal'>
          <MenuItem
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as = {Link}
            to = '/'
          />
          
          {/* <MenuItem
            name='Register'
            active={activeItem === 'Register'}
            onClick={handleItemClick}
          /> */}
          <MenuMenu position='right'>
            <MenuItem
                name='Register'
                active={activeItem === 'Register'}
                onClick={handleItemClick}
                as = {Link}
                to = '/Register'
          /> 
            <MenuItem
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as = {Link}
                to = '/login'
          />

            <MenuItem
              name='logout'
              active={activeItem === 'logout'}
              onClick={handleItemClick}
              as = {Link}
              to = '/logout'
            />
          </MenuMenu>
        </Menu>

        {/* <Segment>
          <img src='/images/wireframe/media-paragraph.png' />
        </Segment> */}
      </div>
    )

}

export default MenuBar