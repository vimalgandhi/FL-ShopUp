import {
    Grid, Typography, TextField, InputAdornment,  ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantImage from "../../images/Restaurant.png";
import GroceryStoreImage from "../../images/GroceryStore.png";
import BarImage from "../../images/bar.png";
import CafeImage from "../../images/cafe.png";
import DeliveryImage from "../../images/delivery.png";
import TakeOutImage from "../../images/takeout.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import {  createTheme, styled } from "@mui/material/styles";
import React, { useState } from "react";
import useScreenWidthLessThan768 from "../../hook/window_resize_hook";
const images = [
    { src: RestaurantImage, alt: "Restaurant", label: "Restaurant" },
    { src: GroceryStoreImage, alt: "Grocery Store", label: "Grocery" },
    { src: DeliveryImage, alt: "Delivery", label: "Delivery" },
    { src: TakeOutImage, alt: "Takeout", label: "Takeout" },
    { src: CafeImage, alt: "Cafe", label: "Cafe" },
    { src: BarImage, alt: "Bars", label: "Bars" },
];

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const defaultTheme = createTheme();




export default function DashboardList() {
    const windowResize = useScreenWidthLessThan768();
    const [open, setOpen] = useState(!windowResize);
    const [product, setProduct] = useState(true);
    const navigate = useNavigate();
    const toggleDrawer = () => {
        if (!windowResize) {
            setOpen(!open);
        } else {
            setOpen(false);
        }
    };
    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    const handleImageClick = (label) => {
        navigate(`/dashboard/${label}`);
    };
    const mainListItems = (
        <React.Fragment>
            <ListItemButton
                onClick={() => {
                    if (!product) {
                        setProduct(true);
                    }
                }}
            >
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Shops" />
            </ListItemButton>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                    fontFamily: "Epilogue",
                    fontSize: "36px",
                    fontWeight: 700,
                    lineHeight: "45px",
                    letterSpacing: "-1.187999963760376px",
                    textAlign: "left",
                }}
            >
                Find What you need
            </Typography>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                    fontFamily: "Epilogue",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textAlign: "left",
                }}
            >
                Search for restaurants, hotels, museums and more
            </Typography>
            <TextField
                fullWidth
                placeholder="Search for businesses..."
                variant="outlined"
                sx={{ marginBottom: 4 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid item key={index} xs={5} sm={3} md={3} lg={3} xl={2}>
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                cursor: "pointer",
                            }}
                            onClick={() => handleImageClick(image.label)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />
                            <Typography
                                variant="subtitle2"
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    textAlign: "center",
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    color: "#fff",
                                    padding: "8px",
                                    borderRadius: "0 0 10px 10px",
                                }}
                            >
                                {image.label}
                            </Typography>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}
