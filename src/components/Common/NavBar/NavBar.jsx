import React from "react";
import styles from "./NavBar.module.less";
import logo from "../../../assets/Logo.svg";
import { NavLink } from "react-router-dom";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { MenuOutlined } from "@ant-design/icons/lib/icons";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const NavBar = ({ onLogin, onRegister }) => {
    const breakpoints = useBreakpoint();
    const { isAuthenticated } = useSelector((state) => state.user);
    console.log(breakpoints);
    const smSize = breakpoints.sm && !breakpoints.md;
    return (
        <nav className={styles.navbar}>
            {smSize && (
                <div className={styles.menuIconContainer}>
                    <MenuOutlined className={styles.menuIcon} />
                </div>
            )}
            <div className={styles.brand}>
                <div className={styles.logo}>
                    <img src={logo} alt="Nimble" />
                </div>
                <div className={styles.brandName}>
                    <h1 className={styles.title}>Nimble</h1>
                    <div className={styles.subTitle}>
                        Quickly, easily & lightly
                    </div>
                </div>
            </div>
            <div className={styles.nav}>
                {!isAuthenticated && !smSize && (
                    <div className={styles.navLinkContainer}>
                        <NavLink
                            activeClassName={styles.active}
                            to="/features"
                            className={styles.navLink}
                        >
                            Features
                        </NavLink>
                        <NavLink
                            activeClassName={styles.active}
                            to="/pricing"
                            className={styles.navLink}
                        >
                            Pricing
                        </NavLink>
                    </div>
                )}
                <div className={`${styles.navLinkContainer} ${styles.end}`}>
                    <div
                        activeClassName={styles.active}
                        // to="/signin"
                        className={styles.navLink}
                        onClick={onLogin}
                    >
                        Login
                    </div>
                    {!smSize && (
                        <div
                            activeClassName={styles.active}
                            // to="/signup"
                            className={styles.navLink}
                            onClick={onRegister}
                        >
                            Register
                        </div>
                    )}
                    {isAuthenticated && (
                        <>
                            <div className={styles.navLink}>Logout</div>
                            <div className={styles.navLink}>SH</div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    onLogin: PropTypes.func,
    onRegister: PropTypes.func,
};

export default NavBar;
