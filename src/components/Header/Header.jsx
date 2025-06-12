import './Header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/slices/authSlice';
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
  Typography,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    const basket = useSelector((state) => state.basket.items);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');

    console.log(user)

    const handleAuthentication = () => {
        if (user) {
            dispatch(signOut());
        }
    };

    const handleSearchSubmit = (ev) => {
        ev.preventDefault();
        navigate(`/search?q=${searchInput}`)        
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
                    <button className="header__searchIcon__button">
                        <SearchIcon className="header__searchIcon" />
                    </button>
                </form>

                <div className="header__nav">
                    <Link to={!user && '/login'}>
                        <div onClick={handleAuthentication} className="header__option">
                            <span className="header__optionLineOne">
                                Hello {user ? user.name || user.email : 'Guest'}
                            </span>
                            <span className="header__optionLineTwo">
                                {user ? 'Sign Out' : 'Sign In'}
                            </span>
                        </div>
                    </Link>

                    {user && (
                        <div className="header__option">
                            <span className="header__optionLineOne">Logged in as:</span>
                            <span className="header__optionLineTwo">{user.email}</span>
                        </div>
                    )}

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
                    <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                        <Typography variant="h6">
                            <a href='/products' className='mx-2 text-white hover:text-gray-200'>Products</a>
                        </Typography>
                        <Typography variant="h6">
                            <a href='/about' className='text-white hover:text-gray-200'>About</a>
                        </Typography>
                    </Box>
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
                    <ListItem button component={Link} to="/products">Products</ListItem>
                    {user && (
                        <ListItem button component={Link} to="/profile">
                            Profile ({user.email})
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </div>
    );
}

export default Header;