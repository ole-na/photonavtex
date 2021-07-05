import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Alert} from "@material-ui/lab";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import HintDialog from "./HintDialog";
import {TextField} from "@material-ui/core";
import axios from "axios";

import * as TextHelping from './manipulateText'
import cyan from "@material-ui/core/colors/cyan";

const useStyles = makeStyles((theme) => ({
    textCardContent: {
        boxSizing: 'border-box',
        //overflow: 'scroll',
        paddingTop: '0',
        marginTop: '-1em',
        paddingBottom: '0',
    },
    warningTextarea: {
        width: '100%',
        marginTop: '1.5em',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    cardActions: {
        backgroundColor: cyan[300],
    },
    formControl: {
        width: '95%',
        borderRadius: '4px',
        margin: '1em 1em 2em 0.5em',
    },
    legend: {
        display: 'inline-flex',
        height: '1em',
    },
    marginTop: {
        marginTop: '1.5em',
    }
}));

export default function WarningText(props) {
    const classes = useStyles()

    const [warningData, setWarningData] = useState({})
    const [categoryHint, setCategoryHint] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const [editabledText, setEditabledText] = useState(false)
    const [error, setError] = useState(false)
    const [savedCategory, setSavedCategory] = useState([])

    const setWarningDataFromText = (text) => {
        const words = text.trim().split(' ')

        const title = words[0].split(/\n/)[0]

        const warningCategory = words[0].substr(1,1).toString().toUpperCase()

        let position = text.matchAll(/\d+-\d+.\d+(N|S) \d+-\d+.\d+(E|W)/g)

        let geoObject = text.includes(" LINE") ? "LINE" : text.includes(" AREA") ? "AREA" : "POINT";
        console.log("GeoObject:" , geoObject);

        // RADIUS OF 500 METERS
        let radius = text.includes(" RADIUS ") ? true : false

        const finalText = words.join(' ')

        checkWarningCategory(warningCategory);

        setWarningData({
            title: title.toString().toUpperCase(),
            category: warningCategory,
            text: finalText.toString(),
            radius: radius,
            geoObject: geoObject.toString(),
            position: position,
        })
    }

    console.log("WarningData:", warningData);

    const checkEditabledText = (text) => {
        const errorTextarea = text.includes("ZCZC") ? true : text.includes("NNNN") ? true : false
        setError(errorTextarea)
        if (error) {
            return errorTextarea.toString()
        }
        return text
    }

    const checkWarningCategory = (category) => {
        const dbWarningData = ["A", "D"]
        if (!dbWarningData.includes(category)) {
            setCategoryHint(true)
            props.disableWarningSaveButton()
        }
    }

    const detectText = (textValue) => {
        const textWithCorrectBreaks = TextHelping.unifyBreaksAfterLines(textValue)
        const checkedText = editabledText ? checkEditabledText(textWithCorrectBreaks) : TextHelping.removeFirstAndLastWrongWordsAndReturnText(textWithCorrectBreaks)
        if(checkedText === "error") {
            return
        }
        const tmpText = TextHelping.removeSpacesOnLineStart(checkedText)

        setWarningDataFromText(tmpText)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onChangeText = (e) => {
        setEditabledText(true)
        detectText(e.target.defaultValue)
    }

    useEffect(() => {
        setWarningData(props.warningData)
        detectText(props.ocrText)
        axios
            .get(`/category`)
            .then((response) => {
                setSavedCategory(response.data);
            })
            .catch((error) => {
                console.error("Category Error:", error);
            })
            .finally((isLoading) => {
                // setIsLoading(false);
            });
    },[]);

    return (<>
        <CardContent className={classes.textCardContent}>
            <FormControl error={error} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.legend}>
                    <b>Warning Text</b>&nbsp;<HintDialog warningTitle={warningData.title}/>
                </FormLabel>

                {error &&
                    <Alert severity="error" className={classes.marginTop}>
                        The editable text should not include the words 'ZCZC' and 'NNNN'.
                    </Alert>
                }

                {categoryHint &&
                    <Alert severity="error" className={classes.marginTop}>
                        Please select only NAVTEX of category <b>A</b> or <b>D</b>.
                        The category can be wrong recognized, if the image text doesn't begin with "ZCZC" and end to "NNNN".
                        The first word in the editable text should be a warning identifier, e.g. PA18.
                    </Alert>
                }

                <TextField className={classes.warningTextarea}
                           id="editableTextarea"
                           multiline
                           required
                           label={categoryHint ? "Not editable warning text" : "Editable warning text"}
                           defaultValue={warningData.text}
                           error={error}
                           onChange={(e) => {onChangeText(e)}}
                           variant="outlined"
                           disabled={categoryHint}
                />
            </FormControl>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon color="white" />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon color="white" />
            </IconButton>
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                color="white"
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography>
                    Warning: {warningData.title}<br />
                    Category: {warningData.category}<br />
                    Geo Object: {warningData.geoObject}<br />
                    {/*Position:
                    {position.map((coord) => {
                    return (<span key={coord}>"[" + coord + "],"</span>)
                    })}<br />*/}
                    Radius: {warningData.radius === true ? "yes" : "no"}
                </Typography>
            </CardContent>
        </Collapse>

    </>);
}