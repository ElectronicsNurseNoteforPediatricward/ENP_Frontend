import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import router from 'next/router';
import { getAdmitList, getSearchedAdmit } from '@/services/patientService';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';

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

export interface IAdmitTable {
    bed: string;
    room: string;
    name: string;
    surname: string;
    hn: string;
    admitDateTime: string;
    dischargeDate: string;
    an: string;
}
/* 
const [patients, setPatients] = useState<IPatientForm>()

useEffect(() => {
    loadPatientFromApi()
}, [])

const loadPatientFromApi = async () => {
    const response = await axios.get<IPatientForm>(`${window.origin}/api/patient/patient_list`)
    setPatients(response.data)
}

const rows = patients; */

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof IAdmitTable;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'an',
        numeric: false,
        disablePadding: true,
        label: 'AN',
    },
    {
        id: 'room',
        numeric: true,
        disablePadding: false,
        label: 'ห้อง',
    },
    {
        id: 'bed',
        numeric: true,
        disablePadding: false,
        label: 'เตียง',
    },

    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'ชื่อ',
    },
    {
        id: 'surname',
        numeric: true,
        disablePadding: false,
        label: 'นามสกุล',
    },


    {
        id: 'hn',
        numeric: true,
        disablePadding: false,
        label: 'รหัสผู้ป่วย',
    },
    /*  {
         id: 'dischargeDate',
         numeric: true,
         disablePadding: false,
         label: 'เบอร์ติดต่อ',
     }, */
    {
        id: 'admitDateTime',
        numeric: true,
        disablePadding: false,
        label: 'วันที่เข้ารับการรักษา',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IAdmitTable) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof IAdmitTable) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export default function EnhancedTable() {

    // const [patients, setPatients] = useState<IPatientForm>()
    const [rows, setRows] = useState<any>([])

    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            // get the data from the api
            const admit = await loadAdmitFromApi()
            const arr: { bed: any; room: any; name: any; surname: any; hn: any; admitDateTime: any; dischargeDate: any; an: any; }[] = [];
            console.log(admit)
            Object.keys(admit).forEach((id) => {
                console.log(admit[id].patient.name)
                arr.push({
                    "bed": admit[id].bed.id,
                    "room": admit[id].room.id,
                    "name": admit[id].patient.name,
                    "surname": admit[id].patient.surname,
                    "hn": admit[id].patient.hn,
                    "admitDateTime": admit[id].admitDateTime,
                    "dischargeDate": admit[id].dischargeDate,
                    "an": admit[id].an
                })
            })
            console.log(arr);
            setRows(arr)

        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);

    }, [])

    const loadAdmitFromApi = async () => {
        const response = await getAdmitList()
        // setPatients(response.data)
        return response.data
        //console.log(patients)
    }

    const handleSearch = async (searchText: string) => {
        const res = (await getSearchedAdmit(searchText)).data
        const arr: { bed: any; room: any; name: any; surname: any; hn: any; admitDateTime: any; dischargeDate: any; an: any; }[] = [];
        Object.keys(res).forEach((id) => {
            console.log(res[id].patient.name)
            arr.push({
                "bed": res[id].bed.id,
                "room": res[id].room.id,
                "name": res[id].patient.name,
                "surname": res[id].patient.surname,
                "hn": res[id].patient.hn,
                "admitDateTime": res[id].admitDateTime,
                "dischargeDate": res[id].dischargeDate,
                "an": res[id].an
            })
        })
        console.log(arr)
        setRows(arr)

    }
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IAdmitTable>('an');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IAdmitTable,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleClick = (an: String | number) => {
        router.push("/patient/" + an)
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Grid container sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 3 } }}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="ค้นหา"
                            placeholder="ชื่อ, รหัสผู้ป่วย, รหัส admit"
                            onChange={async (search) => {
                                if (search.target.value == "") return
                                handleSearch(search.target.value)
                                /* setRows((await getSearchedAdmit(search.target.value)).data)
                                console.log((await getSearchedAdmit(search.target.value)).data) */
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6.5}></Grid>
                    <Grid item xs={12} sm={1.5} >
                        <Button
                            variant='contained'
                            fullWidth
                            onClick={() => router.push("/patient/admit")}
                        >
                            <AddIcon />
                            เพิ่มคนไข้
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={() => { handleClick(row.an) }}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.an}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">

                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.an}
                                        </TableCell>
                                        <TableCell align="right">{row.room}</TableCell>
                                        <TableCell align="right">{row.bed}</TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.surname}</TableCell>
                                        <TableCell align="right">{row.hn}</TableCell>
                                        <TableCell align="right">{row.admitDateTime}</TableCell>

                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}