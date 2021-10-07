import React from "react";
import styles from "./NavBar.module.less";
import assetMap from "../../../assets";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { MenuOutlined } from "@ant-design/icons/lib/icons";
import { useSelector } from "react-redux";
import { Link as ScrollLink } from "react-scroll";
import PropTypes from "prop-types";
import { Avatar } from "antd";

const NavBar = ({ onLogin, onRegister, onLogout, onProfileClick }) => {
    const breakpoints = useBreakpoint();
    const { isAuthenticated } = useSelector((state) => state.user);
    console.log(breakpoints);
    const smSize = !breakpoints.md;
    return (
        <nav className={styles.navbar}>
            {smSize && (
                <div className={styles.menuIconContainer}>
                    <MenuOutlined className={styles.menuIcon} />
                </div>
            )}
            <div className={styles.brand}>
                <div className={styles.logo}>
                    <img src={assetMap("Logo")} alt="Nimble" />
                </div>
                <div className={styles.brandName}>
                    <h1 className={styles.title}>Nimble</h1>
                    <div className={styles.subTitle}>Quickly, easily & lightly</div>
                </div>
            </div>
            <div className={styles.nav}>
                {!isAuthenticated && !smSize && (
                    <div className={styles.navLinkContainer}>
                        <ScrollLink
                            activeClass={styles.active}
                            to="features"
                            className={styles.navLink}
                            smooth={true}
                            duration={200}
                        >
                            Features
                        </ScrollLink>
                        <ScrollLink
                            activeClass={styles.active}
                            to="pricing"
                            className={styles.navLink}
                            smooth={true}
                            duration={200}
                        >
                            Pricing
                        </ScrollLink>
                    </div>
                )}
                <div className={`${styles.navLinkContainer} ${styles.end}`}>
                    {!isAuthenticated && (
                        <div
                            // to="/signin"
                            className={styles.navLink}
                            onClick={onLogin}
                        >
                            Login
                        </div>
                    )}
                    {!smSize && !isAuthenticated && (
                        <div
                            // to="/signup"
                            className={styles.navLink}
                            onClick={onRegister}
                        >
                            Register
                        </div>
                    )}
                    {isAuthenticated && (
                        <>
                            <a className={styles.navLink} onClick={onLogout}>
                                Logout
                            </a>
                            <div className={styles.navLink} onClick={onProfileClick}>
                                <Avatar>SM</Avatar>
                            </div>
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
    onLogout: PropTypes.func,
    onProfileClick: PropTypes.func,
};

export default NavBar;
