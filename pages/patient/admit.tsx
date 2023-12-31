import { useAuth } from "@/_auth";
import Navbar from "@/components/Navbar";
import { setup } from "@/lib/csrf";
import { admitPatient } from "@/services/patientService";
import { getRoomList } from "@/services/roomService";
import { AppBar, Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface IPatientCard {
    id: number;
    bed: { id: number };
    room: { id: number };
    patient: {
        name: string;
        surname: string;
        gender: any;
        idCard: string;
        height: string;
        weight: string;
        bloodType: any;
        dateOfBirth: any;
        hn: string;
        age: string;
        symptom: string;
        allergies: string;
        doctor: any;
        address: string;
        parentName: string;
        phoneNumber: string;
        image: any;
    };
    admitDateTime: any;
    dischargeDate: any;
    an: string;
}

export interface Patient {
    name: string;
    surname: string;
    gender: any;
    idCard: string;
    height: string;
    weight: string;
    bloodType: any;
    dateOfBirth: any;
    hn: string;
    age: string;
    admitDateTime: any;
    symptom: string;
    allergies: string;
    doctor: any;
    address: string;
    parentName: string;
    phoneNumber: string;
    image: any;
}


export default function AdmitPatient() {
    const { isLoggedIn } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        control,
        setValue
    } = useForm<IPatientCard>({
        mode: "onSubmit"
    })
    const genders = [
        { value: "ชาย", label: "ชาย" },
        { value: "หญิง", label: "หญิง" }
    ]
    const bloodTypes = [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "O", label: "O" },
        { value: "AB", label: "AB" }
    ]

    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            // get the data from the api
            const room = await loadRoomFromAPI()
            console.log(room)
            //setPatientInfo(patient)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    const loadRoomFromAPI = async () => {
        const response = await getRoomList()
        // setPatientInfo(response.data)
        return response.data
    }

    const handleAdmit = (data: IPatientCard) => new Promise((resolve) => {
        // call api

        // .......

        alert("Success, Ready to request to API")
        alert(JSON.stringify(data))

        admitPatient({
            ...data,
            // patient.dateOfBirth : data.patient.dateOfBirth || dayjs().format("YYYY-MM-DD"),
            admitDateTime: data.admitDateTime || dayjs().format("YYYY-MM-DD hh:mm A"),
        })
        //  axios.post(`${process.env.NEXT_PUBLIC_CORE_URL_API}/register`, data)
        resolve(null)
        //router.push('/patient/list')

    })
    const handleCancel = () => {
        router.push('/patient/list')

    }

    return (
        <>
            <CssBaseline />
            <Navbar item={
                <Button href="/" color="inherit"></Button>
            } isLoggedIn={isLoggedIn} />
            <form onSubmit={handleSubmit(handleAdmit)}>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                    <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            เพิ่มผู้ป่วยใหม่
                        </Typography>
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                Basic information
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="ชื่อ"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.name", { required: "Please input name" })}
                                        error={!!errors.patient?.name}
                                        helperText={errors.patient?.name?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="นามสกุล"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.surname", { required: "Please input surname" })}
                                        error={!!errors.patient?.surname}
                                        helperText={errors.patient?.surname?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="เลขสูติบัตร/บัตรประจำตัวประชาชน"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.idCard", { required: "Please input IDcard" })}
                                        error={!!errors.patient?.idCard}
                                        helperText={errors.patient?.idCard?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="ส่วนสูง"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.height", { required: "Please input height" })}
                                        error={!!errors.patient?.height}
                                        helperText={errors.patient?.height?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="น้ำหนัก"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.weight", { required: "Please input weight" })}
                                        error={!!errors.patient?.weight}
                                        helperText={errors.patient?.weight?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        id="outlined-select-currency"
                                        fullWidth
                                        select
                                        label="เพศ"
                                        variant="standard"
                                        {...register("patient.gender", { required: "Please select gender" })}
                                        error={!!errors.patient?.gender}
                                        helperText={errors.patient?.gender?.message}
                                    >
                                        {genders.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        id="outlined-select-currency"
                                        fullWidth
                                        select
                                        label="หมู่เลือด"
                                        variant="standard"
                                        {...register("patient.bloodType", { required: "Please select bloodType" })}
                                        error={!!errors.patient?.bloodType}
                                        helperText={errors.patient?.bloodType?.message}
                                    >
                                        {bloodTypes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <DatePicker
                                        label="วัน/เดือน/ปี เกิด"
                                        defaultValue={dayjs()}
                                        sx={{ width: '100%' }}
                                        onChange={d => {
                                            setValue("patient.dateOfBirth", d?.format("YYYY-MM-DD"))
                                            //alert(d?.format("YYYY-MM-DD"))
                                        }
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="ที่อยู่ปัจจุบัน"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.address", { required: "Please input address" })}
                                        error={!!errors.patient?.address}
                                        helperText={errors.patient?.address?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="ผู้ปกครอง"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.parentName", { required: "Please input parent name" })}
                                        error={!!errors.patient?.parentName}
                                        helperText={errors.patient?.parentName?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="เบอร์ติดต่อ"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.phoneNumber", { required: "Please input telephone number" })}
                                        error={!!errors.patient?.phoneNumber}
                                        helperText={errors.patient?.phoneNumber?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload File
                                        <input
                                            type="file"
                                            hidden
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12}><h1></h1></Grid>
                            <Typography variant="h6" gutterBottom>
                                Medical information
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="รหัสผู้ป่วย HN"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.hn", { required: "Please input AN" })}
                                        error={!!errors.patient?.hn}
                                        helperText={errors.patient?.hn?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <DateTimePicker
                                        label="วันและเวลาที่เข้ารับการรักษา"
                                        defaultValue={dayjs()}
                                        sx={{ width: '100%' }}
                                        onChange={d => {
                                            setValue("admitDateTime", d?.format("YYYY-MM-DD hh:mm A"))
                                            //alert(d?.format("YYYY-MM-DD hh:mm A"))
                                        }
                                        } />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="อาการที่มาพบแพทย์"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.symptom", { required: "Please input symptom" })}
                                        error={!!errors.patient?.symptom}
                                        helperText={errors.patient?.symptom?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="ประวัติการแพ้ยา"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        {...register("patient.allergies", { required: "Please input allergies" })}
                                        error={!!errors.patient?.allergies}
                                        helperText={errors.patient?.allergies?.message}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <FormControl variant="standard" fullWidth >
                                        <InputLabel id="demo-simple-select-standard-label">แพทย์ที่ดูแล</InputLabel>
                                        <Controller
                                            control={control}
                                            name="patient.doctor"
                                            render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
                                                <>
                                                    <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={value}
                                                        onChange={onChange}
                                                        label="แพทย์ที่ดูแล"
                                                        name='doctor'
                                                        inputProps={{
                                                            inputRef: (ref: { value: any; }) => {
                                                                if (!ref) return;
                                                                register("patient.doctor", { required: "Please select doctor" })
                                                            },
                                                        }}
                                                        error={!!errors.patient?.doctor}
                                                    >
                                                        <MenuItem value="A">A</MenuItem>
                                                        <MenuItem value="B">B</MenuItem>
                                                        <MenuItem value="O">O</MenuItem>
                                                        <MenuItem value="AB">AB</MenuItem>

                                                    </Select>
                                                </>
                                            )}
                                        />

                                    </FormControl>
                                </Grid>


                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 3, ml: 1 }}
                                    onClick={handleCancel}
                                >
                                    ยกเลิก
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    บันทึก
                                </Button>

                            </Box>
                        </React.Fragment>

                    </Paper>
                </Container>
            </form>
        </>
    );
}


export const getServerSideProps = setup(async (req, res) => {
    return {
        props: {}
    }
})
