// import { useForm } from 'react-hook-form';
// import {useContext} from 'react'
// import {useParams} from 'react-router-dom'

// import {
//     useMutation,
//     useQuery,
//     useQueryClient
// } from '@tanstack/react-query';

// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

// import { updateProduct, getProductById } from '../services/product'
// import Header from '../components/Header';
// import { AuthContext } from '../contexts/Auth';

// const schema = yup.object({
//     title: yup.string().required(),
//     price: yup.number().positive().required(),
//     description: yup.string().max(200),
//     image: yup.string()
// }).required();


// const ProductEditForm = () => {
//     const authContext = useContext(AuthContext)
//     const {id} = useParams();
//     const {data} = useQuery([`products ${id}`, {id}], () => getProductById(id))

//     const queryClient = useQueryClient()
    
//     const updateMutation = useMutation(updateProduct, {
//         onSuccess: () => {
//             queryClient.invalidateQueries([`products ${id}`]);
//             queryClient.invalidateQueries(['products'])
//         }
//     })


//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(schema)
//     });
//     const onSubmit = data => {
//         console.log(data);
//         console.log(authContext.token);
//         updateMutation.mutate({id: id, product: data})
//     };

    

//     return (
//         <>
//             <Header />
//             <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)}>
//                 <p>Title:</p>
//                 <input defaultValue = {data?.title} style={{ display: 'block', width: '80%' }} {...register("title", { required: `Title is Required` })} />
//                 {errors?.title && (
//                     <p>{errors?.title?.message}</p>
//                 )}
//                 <br />
//                 <p>Price:</p>
//                 <input defaultValue = {data?.price} style={{ display: 'block', width: '80%' }} type='number' {...register("price", { required: `Price is required` })} />
                
//                 {errors?.price && (
//                     <p>{errors?.price?.message}</p>
//                 )}
//                 <br />
//                 <p>Image URL:</p>
//                 <input defaultValue = {data?.image} style={{ display: 'block', width: '80%' }} type='text' {...register("image")} />
//                 <br />
//                 <p>Description:</p>
//                 <input defaultValue = {data?.description} style={{ display: 'block', width: '80%' }} type='text' {...register("description")} />
//                 <br />

//                 <input type="submit" />
//             </form>
//         </>
//     );
// }

// export default ProductEditForm


import { useState } from "react";
import { useParams } from "react-router-dom";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { updateProduct, getProductById } from "../services/product";
import Header from "./../components/Header";

const ProductEditForm = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });

    const {id} = useParams();
    const {data} = useQuery([`products ${id}`, id], () => getProductById(id))

    const client = useQueryClient()

    const createUpdateMutation = useMutation((obj) => updateProduct(obj), {
        onSuccess: () => {
          client.invalidateQueries(['products'])
        }
    })

    const handleChange = (e) => {
      setProduct({...product, [e.target.name]: e.target.value})
    }

    const handlePhoto = (e) => {
      console.log(e.target.files[0]);
      setProduct({...product, image: e.target.files[0]})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', product.title || data?.title);
        formData.append('price', product.price || data?.price);
        formData.append('description', product.description || data?.description);
        formData.append('image', product.image || data?.image);

        createUpdateMutation.mutate({id: id, product: formData})
        // createProduct

    };
    return (
        <>
            <Header />
            <form
                encType="multipart/form-data"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                onSubmit={handleSubmit}
            >
                <p>Product title:</p>
                <input
                    onChange={handleChange}
                    value={product.title || data?.title}
                    required
                    name="title"
                    style={{ display: "block", width: "80%" }}
                    type="text"
                />
                <br />
                <p>Product Price:</p>
                <input
                    onChange={handleChange}
                    value={product.price || data?.price}
                    required
                    name="price"
                    style={{ display: "block", width: "80%" }}
                    type="number"
                />
                <br />
                <p>Product Description:</p>
                <input
                    onChange={handleChange}
                    value={product.description || data?.description}
                    required
                    name="description"
                    style={{ display: "block", width: "80%" }}
                    type="text"
                />
                <br />
                <p>Product URL:</p>
                <input
                    onChange={handlePhoto}
                    required
                    name="photo"
                    style={{ display: "block", width: "80%" }}
                    type="file"
                />
                <br />
                <input type="submit" value='Update Product'/>
            </form>
        </>
    );
};

export default ProductEditForm;
