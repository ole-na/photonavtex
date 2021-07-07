import React, {useEffect, useState} from "react";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function WarningDataCard(props) {
    const [warningData, setWarningData] = useState({})
    useEffect(() => {
        setWarningData(props.warningData)
        console.log("Position:", props.warningData.position)
    },[]);
    return (
        <CardContent>
            <Typography>
                Warning: {warningData.title}<br />
                Category: {warningData.category}<br />
                Geo Object: {warningData.geoObject}<br />
                Position:&nbsp;
                {warningData.position && warningData.position.length > 0 && warningData.position.map((pair, index) => {
                   const key = "positionString" + index;
                   return (
                       <span key={key}>"{pair.join(', ').toString()}",&nbsp;
                       </span>
                   )
                })}
                <br />
                Radius: {warningData.radius === true ? "yes" : "no"}
            </Typography>
        </CardContent>
    );
}