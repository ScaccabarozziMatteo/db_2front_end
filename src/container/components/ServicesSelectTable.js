import * as React from 'react';
import axios from "axios";
import {DataGrid} from '@mui/x-data-grid';
import Table from "@mui/material/Table";
import {TableHead} from "@material-ui/core";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

let _services;

export default function ServicesSelectTable() {

    const [services, setServices] = React.useState([]);

    let fixedPhones
    let fixedInternet
    let mobilePhones
    let mobileInternets


    React.useEffect(() =>  {
            axios.get("../service/getall").then((result) => {

                orderServices()
                setServices(_services);
                _services = result.data
        })
    }, [])


    function orderServices() {
        _services.map(element => {
            console.log(element.id)
            if (element.type === 'fixed phone')
                fixedPhones.add(element)
        })

    }

    return (
        <div>

        </div>
    );

}