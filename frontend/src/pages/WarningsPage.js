import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";
import Loading from "../components/Loading";
import {Alert} from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontWeight: theme.typography.fontWeightRegular,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    buttonDelete: {
        width: '24px',
        height: '1.5rem',
        float: 'right',
        marginRight: "-1px",
    },
}));

export default function WarningsPage() {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const [warnings, setWarnings] = useState([])

    const onDelete = (event, warningId) => {
        event.preventDefault()
        setIsLoading(true);
        axios
            .delete(`/warning/`+ warningId)
            .then((response) => {
                const updatedWarnings = warnings.filter((warning) => warning.id !== warningId)
                setWarnings(updatedWarnings)
                setIsLoading(false);
                setError(false);
            })
            .catch((error) => {
                console.error(error.message)
                setIsLoading(false);
                setError(false);
            });
    }

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`/warning` )
            .then((response) => response.data)
            .then((allWarnings) => {
                setWarnings(allWarnings)
                setIsLoading(false);
                setError(false);
            })
            .catch((error) => {
                console.error(error.message)
                setIsLoading(false);
                setError(false);
            });
    },[]);

    return (
        <div className="page-content-container">
            <h2>My Warnings</h2>
            <div className={classes.root}>

                {isLoading && <Loading isLoading={isLoading}/>}

                {!isLoading && error && <Alert className="margin-bottom-m" severity="error">Oh no, something went wrong!</Alert>}

                {warnings.length > 0 && warnings.map((warning) => {
                    const warningId = warning.id
                    const ariaControls = "warning-content-" + warningId
                    const accordionSummaryId = "warning-header-" + warningId
                    return (
                        <Accordion key={warningId}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls={ariaControls}
                                id={accordionSummaryId}
                            >
                                <Typography className={classes.heading}>{warning.title}</Typography>
                                <Typography className={classes.secondaryHeading}>{warning.geoObject}{warning.radius === true && ", Radius"}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid
                                    container
                                    spacing={0}
                                    style={{ minHeight: '5vh' }}
                                >
                                    <Grid item xs={12}>
                                        <details>
                                            <summary>NAVTEX message</summary>
                                            <p className="details-content">{warning.text}</p>
                                        </details>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <details>
                                            <summary>Position</summary>
                                            <ul>
                                                {warning.position && warning.position.length > 0 && warning.position.map((pair, index) => {
                                                    const key = "positionString" + index;
                                                    return (
                                                        <li key={key}>{pair.join(', ').toString()}</li>
                                                    )
                                                })}
                                            </ul>
                                        </details>
                                        <IconButton variant="contained"
                                                    color="secondary"
                                                    className={classes.buttonDelete}
                                                    onClick={(event) => {onDelete(event, warningId)}}
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        </div>
    );
}
