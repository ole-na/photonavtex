import React from "react";
import CardContent from '@material-ui/core/CardContent';

export default function WarningDataCard(props) {
    return (
        <CardContent>
            <dl className="grid">
                <dt>Warning:</dt>
                <dd>{props.warningData.title}</dd>

                <dt>Category:</dt>
                <dd>{props.warningData.category}</dd>

                <dt>Radius:</dt>
                <dd>
                    {props.warningData.radius === true ? "yes" : "no"}
                </dd>

                <dt>Geo Object:</dt>
                <dd>{props.warningData.geoObject}</dd>

                <dt>Position:</dt>
                <dd>
                    {props.warningData.position && props.warningData.position.length > 0 && props.warningData.position.map((pair, index) => {
                        const key = "positionString" + index;
                        return (
                            <span key={key}>
                        {pair.join(', ').toString()}<br/>
                    </span>
                        )
                    })}
                </dd>
            </dl>

        </CardContent>
    )
}