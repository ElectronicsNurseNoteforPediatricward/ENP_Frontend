import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

export interface ITriage {
    id: number,
    date: string,
    nurseName: string,
    name: string,
    surname: string,
    hn: string,
    an: string,
    indicator: {
        respiratory: boolean,
        sepsis: boolean,
        shock: boolean,
        seizure: boolean
    },
    vitalSign: {
        heartRate: number,
        respiratoryRate: number,
        temperature: number,
        oxygenSaturation: number,
        oxygenTherapy: number,
        systolic_blood_pressure: number,
        diastolic_blood_pressure: number
    },
    add: {
        poor_feeding: boolean,
        history_of_seizure: boolean,
        generalize_seizure: boolean,
        comoatose_stage_seizure: boolean,
        gcs: number,
        e: number,
        v: number,
        m: number,
    },
    initialImpression: {
        scalene_muscle: boolean,
        irritable: boolean,
        stupor_drownsiness: boolean,
        dehedration: boolean,
        nasal_flaring: boolean,
        subcostral_retraction: boolean,
        supersternal_retraction: boolean,
        grunting: boolean,
        pale_cyanosis: boolean,
        motting_skin: boolean,
        petichea: boolean
    },
    riskFactor: {
        suspected_infection: boolean,
        organtranplantation: boolean,
        history_bone_marrow: boolean
        primary_immune_defencing: boolean,
        postSplenectomy_asplenia: boolean,
        malignancy: boolean,
        bedRidden_cerebralPulsy: boolean,
        center_iv_catheter: boolean
    },
    physicalExam: {
        weak_pulse: boolean,
        bounding_pulse: boolean,
        cap_refill: boolean,
        flash_cap: boolean,
        consciousness: string,
        airEntry: number,
        wheezing: number
    },
    triageResult: {
        mpew: number,
        severity: number;
        result_respiratory: string,
        result_sepsis: string,
        result_shock: string,
        result_seizure: string
    }
}

export default function TriageResultBox(props: ITriage) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Container component="main" sx={{ mb: 1 }} >

                <Paper sx={{ my: { xs: 1, md: 1 }, p: 2 }}>
                    <Grid container
                        spacing={1}
                    //  direction="column"
                    //alignItems="center"
                    //justifyContent="center"
                    >
                        <Grid item container md={3}
                            alignItems="center"
                            justifyContent="center">

                            {props.triageResult.severity == 0 &&


                                <Grid item container md={12} spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ backgroundColor: "#C0DDB7" }}>
                                    <Grid item md={12}>
                                        <Typography sx={{ fontSize: 20 }}> MPEW Score</Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Typography sx={{ fontSize: 50 }}>{props.triageResult.mpew}</Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Typography sx={{ fontSize: 20 }}>ปกติ</Typography>
                                    </Grid>
                                </Grid>


                            }

                            {props.triageResult.severity == 1 &&
                                <Grid item container md={12} spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ backgroundColor: "#DFDB9B" }}>
                                    <Grid item md={12}>
                                        <Typography sx={{ fontSize: 20 }}> MPEW Score</Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Typography sx={{ fontSize: 50 }}>{props.triageResult.mpew}</Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Typography sx={{ fontSize: 20 }}>น่าเป็นห่วง</Typography>
                                    </Grid>
                                </Grid>
                            }
                            {props.triageResult.severity == 2 &&
                                <Grid item container md={12} spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ backgroundColor: "#E3A469" }}>
                                    <Grid item md={12}>
                                        <Typography sx={{ fontSize: 20 }}> MPEW Score</Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Typography sx={{ fontSize: 50 }}>{props.triageResult.mpew}</Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Typography sx={{ fontSize: 20 }}>รุนแรง</Typography>
                                    </Grid>
                                </Grid>
                            }
                            {props.triageResult.severity == 4 &&
                                <Grid item container md={12} spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ backgroundColor: "#C73837" }}>
                                    <Grid item md={12}>
                                        <Typography sx={{ fontSize: 20 }}> MPEW Score</Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Typography sx={{ fontSize: 50 }}>{props.triageResult.mpew}</Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Typography sx={{ fontSize: 20 }}>รุนแรงมาก</Typography>
                                    </Grid>
                                </Grid>
                            }

                        </Grid>
                        <Grid item container md={9} >
                            <Grid item container md={12} spacing={0}
                                sx={{ backgroundColor: "#CEE2FF", p: 2, pl: 5, py: 1 }}>
                                <Grid item md={12}>
                                    <Typography sx={{ fontSize: 20 }}> คำแนะนำ</Typography>
                                </Grid>
                                {props.triageResult.severity == 0 &&
                                    <Grid item md={12} >
                                        <Typography >ปกติ: คนไข้มีอาการเป็นปกติในขณะนี้</Typography>
                                    </Grid>
                                }
                                {props.triageResult.severity == 1 &&
                                    <Grid item md={12} >
                                        <Typography >น่าเป็นห่วง: คนไข้มีอาการผิดปกติเบื้องต้น กรุณาแจ้งเตือนแพทย์เจ้าของไข้เพื่อประเมิณอาการผู้ป่วยและเฝ้าสังเกตอาการอย่างใกล้ชิดต่อไป</Typography>
                                    </Grid>
                                }
                                {props.triageResult.severity == 2 &&
                                    <Grid item md={12} >
                                        <Typography >รุนแรง: คนไข้มีอาการผิดปกติอย่างรุนแรง กรุณาตามแพทย์เจ้าของไข้หรือแพทย์ที่ระดับสูงกว่าเพื่อประเมิณอาการและรักษาโดยด่วน</Typography>
                                    </Grid>
                                }
                                {props.triageResult.severity == 4 &&
                                    <Grid item md={12} >
                                        <Typography >รุนแรงมาก: คนไข้มีอาการผิดปกติอย่างรุนแรงมาก กรุณาตามแพทย์เจ้าของไข้หรือแพทย์ที่ระดับสูงกว่าเพื่อประเมิณอาการและรักษาโดยด่วนที่สุด!</Typography>
                                    </Grid>
                                }

                            </Grid>
                        </Grid>

                        <Grid item md={12}>
                            <Paper variant="outlined" sx={{ my: { xs: 1, md: 1 }, p: 2 }}>
                                <Grid container spacing={0} >
                                    <Grid item sm={6} md={6}>
                                        <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
                                            Respiratory Indicator
                                        </Typography>
                                        <Typography>
                                            <div dangerouslySetInnerHTML={{ __html: props.triageResult.result_respiratory ? props.triageResult.result_respiratory : "-" }}></div>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6}>
                                        <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
                                            Sepsis Indicator
                                        </Typography>
                                        <Typography>
                                            <div dangerouslySetInnerHTML={{ __html: props.triageResult.result_sepsis ? props.triageResult.result_sepsis : "-" }}></div>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6}>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography sx={{ fontSize: 25, fontWeight: "bold" }} >
                                            Shock Indicator
                                        </Typography>
                                        <Typography>
                                            <div dangerouslySetInnerHTML={{ __html: props.triageResult.result_shock ? props.triageResult.result_shock : "-" }}></div>
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6}>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
                                            Seizure Indicator
                                        </Typography>
                                        <Typography>
                                            <div dangerouslySetInnerHTML={{ __html: props.triageResult.result_seizure ? props.triageResult.result_seizure : "-" }}></div>
                                        </Typography>
                                    </Grid>
                                </Grid>


                            </Paper>
                            <Grid container>
                                <Grid sm={11}></Grid>
                                <Grid sm={1}>
                                    <Button variant="outlined" size="small" onClick={handleClickOpen}>
                                        Record
                                    </Button >
                                </Grid>
                            </Grid>

                        </Grid>


                    </Grid>
                    <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                        fullWidth
                        maxWidth="md"
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            Detail record
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent dividers>
                            <Grid container spacing={1} sx={{ m: 1 }} >
                                <Grid item md={3} sm={3} sx={{ backgroundColor: "#FAFAFA" }} >
                                    <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                                        Vital Signs Monitor
                                    </Typography>
                                    <Typography >
                                        • RR (/min) :{props.vitalSign.respiratoryRate}
                                    </Typography>
                                    <Typography >
                                        • SpO2 (%) : {props.vitalSign.oxygenSaturation}
                                    </Typography>
                                    <Typography >
                                        • Body Temp (°C) : {props.vitalSign.temperature}
                                    </Typography>
                                    <Typography >
                                        • Heart rate (/min) : {props.vitalSign.heartRate}
                                    </Typography>
                                    <Typography >
                                        • BP (mmHg) : {props.vitalSign.systolic_blood_pressure}/{props.vitalSign.diastolic_blood_pressure}
                                    </Typography>
                                </Grid>
                                <Grid item container md={3} sm={3} >
                                    <Grid item md={12} sm={12} sx={{ backgroundColor: "#FAFAFA", mb: 1 }} >
                                        <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                                            Initial Impression
                                        </Typography>
                                        {props.initialImpression.irritable ? (
                                            <Typography>
                                                • Irritable
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.scalene_muscle ? (
                                            <Typography>
                                                • Scalene muscle
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.stupor_drownsiness ? (
                                            <Typography>
                                                • Stupor/Drownsiness
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.dehedration ? (
                                            <Typography>
                                                • Dehydration
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.nasal_flaring ? (
                                            <Typography>
                                                • Nasal flaring
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.subcostral_retraction ? (
                                            <Typography>
                                                • Subcostral retraction
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.supersternal_retraction ? (
                                            <Typography>
                                                • Supersternal retraction
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.grunting ? (
                                            <Typography>
                                                • Grunting
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.pale_cyanosis ? (
                                            <Typography>
                                                • Pale/cyanosis
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.motting_skin ? (
                                            <Typography>
                                                • Motting Skin
                                            </Typography>
                                        ) : (<></>)}
                                        {props.initialImpression.petichea ? (
                                            <Typography>
                                                • Petichea
                                            </Typography>
                                        ) : (<></>)}

                                    </Grid>
                                    <Grid item md={12} sm={12} sx={{ backgroundColor: "#FAFAFA" }} >
                                        <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                                            Risk Factor
                                        </Typography>
                                        {props.riskFactor.suspected_infection ? (
                                            <Typography>
                                                • Suspected Infection
                                            </Typography>
                                        ) : (<></>)}
                                        {props.riskFactor.organtranplantation ? (
                                            <Typography>
                                                • Organtransplantation
                                            </Typography>
                                        ) : (<></>)}
                                        {props.riskFactor.history_bone_marrow ? (
                                            <Typography>
                                                • History bone marrow
                                            </Typography>
                                        ) : (<></>)}
                                        {props.riskFactor.primary_immune_defencing ? (
                                            <Typography>
                                                • Primary immune defencing
                                            </Typography>
                                        ) : (<></>)}
                                        {props.riskFactor.postSplenectomy_asplenia ? (
                                            <Typography>
                                                • Post splenectomy/asplenia
                                            </Typography>
                                        ) : (<></>)}
                                        {props.riskFactor.malignancy ? (
                                            <Typography>
                                                • Malignancy
                                            </Typography>
                                        ) : (<></>)}
                                        {props.riskFactor.bedRidden_cerebralPulsy ? (
                                            <Typography>
                                                • Bed ridden/Cerebral pulsy
                                            </Typography>
                                        ) : (<></>)}
                                        {props.riskFactor.center_iv_catheter ? (
                                            <Typography>
                                                • Center IV Catheter
                                            </Typography>
                                        ) : (<></>)}
                                        {props.add.poor_feeding ? (
                                            <Typography>
                                                • Poor Feeding
                                            </Typography>
                                        ) : (<></>)}
                                        {props.add.generalize_seizure ? (
                                            <Typography>
                                                • Generalize seizure
                                            </Typography>
                                        ) : (<></>)}
                                        {props.add.history_of_seizure ? (
                                            <Typography>
                                                • History of seizure
                                            </Typography>
                                        ) : (<></>)}
                                        {props.add.comoatose_stage_seizure ? (
                                            <Typography>
                                                • Comoatose stage seizure
                                            </Typography>
                                        ) : (<></>)}
                                    </Grid>
                                </Grid>
                                <Grid container item md={6} sm={6} >
                                    <Grid item md={6} sm={6} sx={{ backgroundColor: "#FAFAFA", mb: 1 }} >
                                        <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                                            Indicators
                                        </Typography>
                                        {props.indicator.respiratory ? (
                                            <Typography>
                                                • Respiratory Indicator
                                            </Typography>
                                        ) : (<></>)}
                                        {props.indicator.sepsis ? (
                                            <Typography>
                                                • Sepsis Indicator
                                            </Typography>
                                        ) : (<></>)}
                                        {props.indicator.shock ? (
                                            <Typography>
                                                • Shock Indicator
                                            </Typography>
                                        ) : (<></>)}
                                        {props.indicator.seizure ? (
                                            <Typography>
                                                • Seizure Indicator
                                            </Typography>
                                        ) : (<></>)}

                                    </Grid>
                                    <Grid item md={6} sm={6} sx={{ backgroundColor: "#FAFAFA", mb: 1 }} >
                                        <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                                            Physical Exam
                                        </Typography>
                                        {props.physicalExam.weak_pulse ? (
                                            <Typography>
                                                • Pulse : Weak pulse
                                            </Typography>
                                        ) : (<></>)}
                                        {props.physicalExam.bounding_pulse ? (
                                            <Typography>
                                                • Pulse : Bounding pulse
                                            </Typography>
                                        ) : (<></>)}
                                        {!props.physicalExam.weak_pulse && !props.physicalExam.bounding_pulse ? (
                                            <Typography>
                                                • Pulse : Normal
                                            </Typography>
                                        ) : (<></>)}
                                        {props.physicalExam.cap_refill ? (
                                            <Typography>
                                                • Capillary : refill
                                            </Typography>
                                        ) : (<></>)}
                                        {props.physicalExam.flash_cap ? (
                                            <Typography>
                                                • Capillary : flash
                                            </Typography>
                                        ) : (<></>)}
                                        {!props.physicalExam.flash_cap && !props.physicalExam.cap_refill ? (
                                            <Typography>
                                                • Capillary : Normal
                                            </Typography>
                                        ) : (<></>)}
                                        <Typography>
                                            • Air Entry : {props.physicalExam.airEntry}
                                        </Typography>
                                        <Typography>
                                            • Wheezing : {props.physicalExam.wheezing}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} sm={12} sx={{ backgroundColor: "#FAFAFA" }} >
                                        <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                                            Total Symptoms
                                        </Typography>
                                        <Typography>
                                            • O2 Therapy (LPM) : {props.vitalSign.oxygenTherapy}
                                        </Typography>
                                        <Typography>
                                            • Level of Consciousness (LOC) : {props.physicalExam.consciousness}
                                        </Typography>
                                        <Typography>
                                            • Glasgow Coma Scale : {props.add.gcs}
                                        </Typography>
                                        <Typography>
                                            E: {props.add.e}  V: {props.add.v} M: {props.add.m}
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>

                </Paper >
            </Container >
        </React.Fragment >
    )

}