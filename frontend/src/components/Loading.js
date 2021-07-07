import React from 'react';
import GridLoader from "react-spinners/GridLoader";
import blue from "@material-ui/core/colors/blue";
import Typography from "@material-ui/core/Typography";

export default function Loading(props) {
    return(
        <Typography variant="body2" color="textSecondary" component="p">
            <GridLoader loading={props.isLoading} color={blue[700]} size={30} />
        </Typography>
    )
}