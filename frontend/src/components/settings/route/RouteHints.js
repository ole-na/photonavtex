import React from "react";
import Grid from "@material-ui/core/Grid";

export default function RouteHints() {
    return (
        <Grid item xs={12}>
            <p><i>* Required entry</i></p>
            <p><i>
                ** Please check the coordinate values:
                Valid entry: 54.261, -11.474.
                Coordinate values should be delimited by comma and space.
                The decimal point is a part of the value.
            </i></p>
        </Grid>
    )
}
