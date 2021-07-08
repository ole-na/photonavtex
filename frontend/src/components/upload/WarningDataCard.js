import React from "react";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function WarningDataCard(props) {
    return (
        <CardContent>
            <Typography>
                Warning: {props.warningData.title}<br />
                Category: {props.warningData.category}<br />
                Geo Object: {props.warningData.geoObject}<br />
                Position:&nbsp;
                {props.warningData.position && props.warningData.position.length > 0 && props.warningData.position.map((pair, index) => {
                   const key = "positionString" + index;
                   return (
                       <span key={key}>"{pair.join(', ').toString()}",&nbsp;
                       </span>
                   )
                })}
                <br />
                Radius: {props.warningData.radius === true ? "yes" : "no"}
            </Typography>
        </CardContent>
    );
}