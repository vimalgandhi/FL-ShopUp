import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createData } from "../../helpers/ApiHelper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";

const defaultTheme = createTheme();

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [role, setRole] = useState("customer"); // Default role is "customer"
    console.log(role);
    const handleRoleChange = (event) => {
        setRole(event.target.value); // Update role state
    };

    const onSubmit = async (data) => {
        const userData = { ...data, role }; // Include role in form data
        console.log(userData);
        const response = await createData("users/sign-up", userData);
        if (response) {
            navigate("/login");
        }
    }
    const handleClick = (event) => {
        event.preventDefault();
        navigate("/login");
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    {...register("firstName", {
                                        required: "First name is required",
                                    })}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    {...register("lastName", {
                                        required: "Last name is required",
                                    })}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value:
                                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~=\`{}\[\]:;"'<>,.?\/\\-]).{8,}$/,
                                            message:
                                                "Password must be at least 8 characters long, containing at least one digit, one uppercase letter, one lowercase letter, and one special character",
                                        },
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <Select
                                labelId="role-label"
                                id="role"
                                value={role} 
                                fullWidth
                                label="Role"
                                onChange={handleRoleChange} 
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="customer">Customer</MenuItem>
                            </Select>
                        </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#01adf2' // Set background color
                            }}
                        >
                            Sign Up
                        </Button>


                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2" onClick={handleClick}>
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
