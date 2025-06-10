import { useState } from 'react';
import { IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      {/* Burger Button */}
      <IconButton onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </IconButton>

      {/* Mobile Menu */}
      <Drawer 
        anchor="right" 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <List>
          <ListItem button>Home</ListItem>
          <ListItem button>About</ListItem>
        </List>
      </Drawer>
    </header>
  );
};

export default BurgerMenu;