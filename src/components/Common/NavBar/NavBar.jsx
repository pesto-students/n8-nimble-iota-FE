import React from "react";
import PropTypes from "prop-types";
import styles from "./NavBar.module.less";
import logo from "../../../assets/Logo.svg";
import { NavLink } from "react-router-dom";
import IndexRouting from "../../../route/IndexRouting";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { MenuOutlined } from "@ant-design/icons/lib/icons";

const NavBar = (props) => {
    const breakpoints = useBreakpoint();
    console.log(breakpoints);
    const smSize = breakpoints.sm && !breakpoints.md;
    return (
        <IndexRouting>
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
                    {!smSize && (
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
                        <NavLink
                            activeClassName={styles.active}
                            to="/signin"
                            className={styles.navLink}
                        >
                            Login
                        </NavLink>
                        {!smSize && (
                            <NavLink
                                activeClassName={styles.active}
                                to="/signup"
                                className={styles.navLink}
                            >
                                Register
                            </NavLink>
                        )}
                        <div className={styles.navLink}>Logout</div>
                        <div className={styles.navLink}>SH</div>
                    </div>
                </div>
            </nav>
        </IndexRouting>
    );
};

NavBar.propTypes = {};

export default NavBar;
