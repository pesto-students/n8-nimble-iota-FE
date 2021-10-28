import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons/lib/icons";
import { Avatar } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import PropTypes from "prop-types";
import assetMap from "src/assets";
import styles from "src/components/Common/NavBar/NavBar.module.less";
import { extractInitials } from "src/util/helperFunctions";
import CustomTag from "src/components/Common/CustomTag/CustomTag";
import { colors } from "src/config/constants";
import AppTourContext from "src/contexts/AppTourContext";
import { toggleHideSidebar } from "src/redux";

const NavBar = ({ onLogin, onRegister, onLogout, onProfileClick }) => {
    const breakpoints = useBreakpoint();
    const TourContext = useContext(AppTourContext);
    const { isAuthenticated, user, userProfile } = useSelector((state) => state.user);
    const name = user?.name ?? "-";
    const smSize = !breakpoints.md;
    const imgUrl = userProfile?.imgurl;
    const dispatch = useDispatch();
    const { sidebarHidden } = useSelector((state) => state.common);
    return (
        <nav className={styles.navbar}>
            {isAuthenticated && smSize && (
                <div
                    onClick={() => {
                        dispatch(toggleHideSidebar());
                    }}
                    className={styles.menuIconContainer}
                >
                    {sidebarHidden ? (
                        <MenuOutlined className={styles.menuIcon} />
                    ) : (
                        <CloseOutlined className={styles.menuIcon} />
                    )}
                </div>
            )}
            <Link className={styles.logoLink} to="/projects">
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <img src={assetMap("Logo")} alt="Nimble" />
                    </div>
                    <div className={styles.brandName}>
                        <h1 className={styles.title}>Nimble</h1>
                        {!smSize && <div className={styles.subTitle}>Quickly, easily & lightly</div>}
                    </div>
                </div>
            </Link>
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
                        <>
                            <div className={styles.navLink} onClick={onLogin}>
                                Login
                            </div>
                            <div className={styles.navLink} onClick={onRegister}>
                                Register
                            </div>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <CustomTag
                                    text="Want to have a tour ?"
                                    color={colors.priorityLow}
                                    onClick={() => TourContext.setIsTourOpen(true)}
                                />
                            </div>
                            <a className={styles.navLink} onClick={onLogout}>
                                Logout
                            </a>
                            <div className={styles.navLink} onClick={onProfileClick}>
                                {imgUrl ? <Avatar src={imgUrl}></Avatar> : <Avatar>{extractInitials(name)}</Avatar>}
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
