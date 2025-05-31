import './Header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/slices/authSlice'; // Example action

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
    // Redux selectors instead of useStateValue
    const basket = useSelector((state) => state.basket.items);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    
    const [searchInput, setSearchInput] = useState('');

    const handleAuthentication = () => {
        if (user) {
            dispatch(signOut()); // Dispatch Redux action
            // auth.signOut(); // Firebase sign out if needed
        }
    };

    const handleSearchSubmit = (ev) => {
        ev.preventDefault();
        console.log(searchInput);
        // Dispatch search action here if needed
    };

    return (
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
    );
}

export default Header;