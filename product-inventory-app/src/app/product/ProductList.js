import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import {
    createData,
    deleteData,
    fetchData,
    updateData,
} from "../../helpers/ApiHelper";
import AddProductModal from "./AddProductModal";
import ProductCard from "./ProductCard";
import { useParams,useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the arrow icon from Material-UI


export default function Products() {
    const [products, setProducts] = useState([]);
    const [cateogories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { label } = useParams();

    useEffect(() => {
        getProduts();
    }, []);

    const getProduts = async () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        await fetchData("products", config).then((data) => {
            if (data.length > 0) {
                setProducts(data);
            }
        });
        await fetchData("categories", config).then((data) => {
            if (data.length > 0) {
                setCategories(data);
            }
        });
    };

    const handleAddProduct = async (data) => {
        setIsModalOpen(false);
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        console.log(data);
        if (data.productId) {
            const product = {
                categoryId: data.productId,
                name: data.name,
                description: data.description,
                discount: +data.discount,
                imageUrl: data.imageUrl,
                redirectUrl: data.redirectUrl
            };
            await updateData("products", product, config).then((data) => {
                if (data) {
                    getProduts();
                }
            });
        } else {
            const product = {
                name: data.name,
                description: data.description,
                discount: +data.discount,
                categoryId: data.category,
                imageUrl: data.imageUrl,
            };
            await createData("products", product, config).then((data) => {
                if (data) {
                    getProduts();
                }
            });
        }
    };

    const handleEditProduct = (product) => {
        const data = {
            productId: product.name,
            name: product.name,
            description: product.description,
            discount: +product.discount,
            category: product.categoryId,
            imageUrl: product.imageUrl,
        }
        setSelectedProduct(data);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = (product) => {
        swal({
            title: "Delete Product",
            text: "Are you sure you want to delete?",
            button: "Ok!",
        }).then(async (data) => {
            if (data) {
                deleteProduct(product);
            }
        });
    };

    const deleteProduct = async (product) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        await deleteData(`products/product/${product._id}`, config).then((data) => {
            getProduts();
        });
    };
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back one step
    };
    return (
        <React.Fragment>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
            >
            <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleGoBack}
            startIcon={<ArrowBackIcon />} // Add the arrow icon as the start icon
            sx={{ marginRight: "auto", textTransform: 'none' }} // Adjust textTransform to 'none' to remove text
        />
                {capitalizedLabel} List
                {localStorage.getItem("role") === "admin" ?
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ marginLeft: "auto" }}
                    onClick={() => { setIsModalOpen(true); setSelectedProduct(null) }}
                >
                    Add Product
                </Button>
                : null }
            </Typography>
            {isModalOpen ? (
                <AddProductModal
                    onSubmit={handleAddProduct}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialValues={selectedProduct}
                    categories={cateogories}
                />
            ) : null}
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard
                            product={product}
                            handleEditProduct={handleEditProduct}
                            handleDeleteProduct={handleDeleteProduct}
                        />
                    </Grid>
                ))}
            </Grid>

        </React.Fragment>
    );
}
