import { useState } from "react";
import { Car, CarEntry, CarResponse } from "./types"
import { Button, DialogActions, DialogTitle, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";

type FormProps ={
    carData:CarResponse;
}
function EditCar({carData}:FormProps){
    const[open,setOpen]=useState(false);
    const[car,setCar]=useState<Car>({
        brand:'',
        model:'',
        color:'',
        registrationNumber:'',
        modelYear:0,
        price:0
    });
    const handleClickOpen=()=>{
        setCar({
            brand:carData.brand,
            model:carData.model,
            color:carData.color,
            registrationNumber:carData.registrationNumber,
            modelYear:carData.modelYear,
            price:carData.price
        });
        setOpen(true);
    };
    const handleClose=()=>{
        setOpen(false);
    };
    const handleSave=()=>{
        const url=carData._links.self.href;
        const carEntry:CarEntry={car,url}
        mutate(carEntry);
        setCar({
            brand:'',
            model:'',
            color:'',
            registrationNumber:'',
            modelYear:0,
            price:0
        });
        setOpen(false);
    };
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setCar({...car,[event.target.name]:event.target.value});
    }
    const queryClient=useQueryClient();
    const{mutate}=useMutation(updateCar,{
        onSuccess:()=>{
            queryClient.invalidateQueries(["cars"]);
        },
        onError:(err)=>{
            console.error(err);
        }
    });
    return(
        <>
        <Tooltip title="Edit car">
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}><EditIcon fontSize="small">
        </EditIcon>
        </IconButton>
        </Tooltip>
        <dialog open={open}onClose={handleClose}>
            <DialogTitle>Edit Car</DialogTitle>
            <CarDialogContent car={car} handleChange={handleChange}/>
            <DialogActions> 
                <Button onClick={handleClose}>Cancle</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </dialog>
        </>
    );
}
export default EditCar;