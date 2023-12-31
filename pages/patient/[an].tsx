import { useAuth } from '@/_auth';
import Navbar from '@/components/Navbar';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, ListItemIcon, ListItemText, Menu, MenuItem, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import PatientCard from '@/components/PatientCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import React, { useEffect, useState } from 'react';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setup } from '@/lib/csrf';
import { useParams } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { getAdmitCard } from '@/services/patientService';

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
export default function PatientInfo() {

    const { isLoggedIn } = useAuth()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const [openDischarge, setOpenDischarge] = React.useState(false);

    const handleClickOpenDischarge = () => {
        setOpenDischarge(true);
    };

    const handleCloseDischarge = () => {
        setOpenDischarge(false);
    };

    const [patientInfo, setPatientInfo] = useState<any>()

    const router = useRouter();
    const an = router.query.an

    // const x = useParams();

    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            if (!an) return
            // get the data from the api
            const patient = await loadAdmitFromApiWithAN()
            console.log(patient)
            setPatientInfo(patient)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);

        /* 
                console.log("an:", an)
                setPatientInfo(loadPatientFromApiWithAN())
                console.log("pt:", patientInfo) */
    }, [an])

    const loadAdmitFromApiWithAN = async () => {

        const response = await getAdmitCard(`${an}`)
        // setPatientInfo(response.data)
        return response.data
    }

    return (
        <>
            <Navbar item={
                <Button href="/" color="inherit"></Button>
            } isLoggedIn={isLoggedIn} />

            <Grid container sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 6 } }}>
                <Grid item md={1}>
                    <Button
                        variant='contained'
                        onClick={() => router.push("/patient/list")}
                    >
                        <ArrowBackIcon />
                    </Button>
                </Grid>
                <Grid item md={10}>
                </Grid>
                <Grid item md={1}>
                    <Button
                        id="basic-button"
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleClickMenu}
                    >
                        <MenuIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClickOpenDischarge}>
                            <ListItemIcon>
                                <PersonOffIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Discharge ผู้ป่วยออกจากโรงพยาบาล</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <HistoryEduIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Triage history ประวัติการประเมินผู้ป่วย</ListItemText>
                        </MenuItem>
                    </Menu>
                    <Dialog
                        open={openDischarge}
                        onClose={handleCloseDischarge}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <Typography variant="h6" align='center' >
                                {"ผู้ป่วยได้รับอนุญาตให้ออกจากโรงพยาบาล"}
                            </Typography>

                        </DialogTitle>
                        <DialogContent >
                            <Paper sx={{ p: { xs: 3, md: 3 } }}>
                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid item sm={12} alignItems="center">
                                        <Typography variant="h6" align='center' >
                                            {patientInfo?.patient.name} {patientInfo?.patient.surname}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} alignItems="center">
                                        <Typography variant="h6" align='center' >
                                            รหัสประจำการแอดมิท {patientInfo?.an}
                                        </Typography>
                                        <Typography variant="h6" align='center' >
                                            รหัสประจำตัวผู้ป่วย {patientInfo?.patient.hn}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Grid container alignItems="center" justifyContent="center" sx={{ mt: { xs: 3, md: 3 } }}>
                                <Grid item sm={12} alignItems="center">
                                    <Typography variant="subtitle1" align='center' >
                                        คุณยืนยันที่จะให้ผู้ป่วยออกจากโรงพยาบาลใช่หรือไม่
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} alignItems="center">
                                    <Typography variant="subtitle1" align='center' >
                                        *เมื่อยืนยันจะไม่สามารถย้ายคนไข้ที่ออกจากโรงพยาบาลกลับสู่คนไข้ปัจจุบันได้!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDischarge}>ยกเลิก</Button>
                            <Button variant='contained' onClick={handleCloseDischarge} autoFocus>
                                ยืนยัน
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <PatientCard
                    id={patientInfo?.id}
                    bed={{
                        id: patientInfo?.bed.id
                    }}
                    room={{
                        id: patientInfo?.room.id
                    }}
                    patient={{
                        name: patientInfo?.patient.name,
                        surname: patientInfo?.patient.surname,
                        gender: patientInfo?.patient.gender,
                        idCard: patientInfo?.patient.idCard,
                        height: patientInfo?.patient.height,
                        weight: patientInfo?.patient.weight,
                        bloodType: patientInfo?.patient.bloodType,
                        dateOfBirth: patientInfo?.patient.dateOfBirth,
                        hn: patientInfo?.patient.hn,
                        age: patientInfo?.patient.age,
                        symptom: patientInfo?.patient.symptom,
                        allergies: patientInfo?.patient.allergies,
                        doctor: patientInfo?.patient.doctor,
                        address: patientInfo?.patient.address,
                        parentName: patientInfo?.patient.parentName,
                        phoneNumber: patientInfo?.patient.phoneNumber,
                        image: patientInfo?.patient.image
                    }}
                    admitDateTime={patientInfo?.admitDateTime}
                    dischargeDate={patientInfo?.dischargeDate}
                    an={patientInfo?.an} />
            </Grid>
        </>
    );
}
/* 
export const getServerSideProps = setup(async (req, res) => {
    const an = //เอามายังไง TT_TT

    const response = await axios.get<IPatientCard>(`${window.origin}/api/patient/${an}`)

    return {
        props: { response }
    }
})
 */