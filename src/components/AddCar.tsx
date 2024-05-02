import { Button, Dialog, DialogActions } from "@mui/material";
import { useState } from "react";
import { Car } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";

function AddCar(){
    const queryClient=useQueryClient();
    const{ mutate }=useMutation(addCar,{
        onSuccess:()=>{
            queryClient.invalidateQueries(["cars"]);
        },
        onError:(err)=>{
            console.error(err);
        },
    });
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
        setOpen(true);
    };
    const handleClose=()=>{
        setOpen(false);
    };
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setCar({...car,[event.target.name]:event.target.value});
    }
    const handleSave=()=>{
        mutate(car);
        setCar({brand:'',model:'',color:'',registrationNumber:'',modelYear:0,price:0});
        handleClose();
    }
    return(
        <div>
        <Button onClick={handleClickOpen}>New Car</Button>
        <Dialog open={open} onClose={handleClose}>
           <CarDialogContent car={car} handleChange={handleChange}/>
            <DialogActions>
                <Button onClick={handleClose}>Cancle</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
    
   
}
export default AddCar;