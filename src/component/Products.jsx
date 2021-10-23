import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { ButtonGroup, Button ,Box} from "@mui/material";
import { styled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <center>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => setFilter(data)}>All</Button>
            <Button onClick={() => filterProduct("men's clothing")}>
              Men's Clothing
            </Button>
            <Button onClick={() => filterProduct("women's clothing")}>
              Women's Clothing
            </Button>
            <Button onClick={() => filterProduct("jewelery")}>Jewelery</Button>
            <Button onClick={() => filterProduct("electronics")}>
              Electronic
            </Button>
          </ButtonGroup>
        </center>
        {filter.map((product) => {
          return (
            <div style={{marginTop: "50px"}}>
              <Grid
  container
  direction="row"
  justifyContent="space-around"
  alignItems="center"
>
                    <React.Fragment>
                      <Grid item xs={4}>
                        <Item>
                          <Card sx={{ maxWidth: 500 }}>
                            <img
                              height="140px"
                              src={product.image}
                              alt={product.title}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {product.title.substring(0, 12)}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small"> ${product.price}</Button>
                            </CardActions>
                            <NavLink
                              to={`/products/${product.id}`}
                              class="btn btn-outline-red"
                            >
                              <span style={{ fontSize: "25px" }}> Buy Now</span>
                            </NavLink>
                          </Card>
                        </Item>
                      </Grid>
                    </React.Fragment>
                  </Grid>
            
            </div>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;

