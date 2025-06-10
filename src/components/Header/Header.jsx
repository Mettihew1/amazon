import './Header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/slices/authSlice'; // Example action
import { useNavigate } from 'react-router-dom';

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  Typography 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BurgerMenu from '../Drawer'


function Header() {
    // Redux selectors instead of useStateValue
    const basket = useSelector((state) => state.basket.items);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
      const [isOpen, setIsOpen] = useState(false);
      const navigate = useNavigate()
    
    const [searchInput, setSearchInput] = useState('');

    const handleAuthentication = () => {
        if (user) {
            dispatch(signOut()); // Dispatch Redux action
            // auth.signOut(); // Firebase sign out if needed
        }
    };

    const handleSearchSubmit = (ev) => {
        ev.preventDefault();
        navigate(`/search?=${searchInput}`)        
    };

    return (
        <div className='flex flex-col'>

        <div className="header">

            <Link to="/">
                <img
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt="Amazon Logo"
                />
            </Link>

            <form className="header__search" onSubmit={handleSearchSubmit}>
                <input 
                    className="header__searchInput" 
                    type="text" 
                    onChange={(ev) => setSearchInput(ev.target.value)} 
                />
                <button className="header__searchIcon__button" >
                    <SearchIcon className="header__searchIcon" />
                </button>
            </form>

            <div className="header__nav">
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className="header__option">
                        <span className="header__optionLineOne">
                            Hello {user ? user.email : 'Guest'}
                        </span>
                        <span className="header__optionLineTwo">
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>

                <Link to="/orders">
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                </Link>

                <div className="header__option">
                    <span className="header__optionLineOne">Your</span>
                    <span className="header__optionLineTwo">Prime</span>
                </div>

                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingCartIcon />
                        <span className="header__optionLineTwo header__basketCount">
                            {basket?.length || 0}
                        </span>
                    </div>
                </Link>
            </div>
        </div>



   
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <a href='/products' >All Products</a>
            <a href='/about' >About</a>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <List>
          <ListItem button component={Link} to="/">Home</ListItem>
          <ListItem button component={Link} to="/about">About</ListItem>
        </List>
      </Drawer>

        </div>

    );
}

export default Header;