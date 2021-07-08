import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
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
import WarningDataCard from "./WarningDataCard";

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

    const [categoryHint, setCategoryHint] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const [editabledText, setEditabledText] = useState(false)
    const [error, setError] = useState(false)

    const setWarningDataFromText = (text) => {
        const words = text.trim().split(' ')

        const title = words[0].split(/\n/)[0]

        const warningCategory = words[0].substr(1,1).toString().toUpperCase()
        checkWarningCategory(warningCategory);

        // const dmsToLonLatRegex= /[-]{0,1}[\d.]*[\d]|([NSEW])+/g;
        // const position = text.match(/\d+-\d+((\.\d+)?)(N|S) \d+-\d+((\.\d+)?)(E|W)/g)
        const position = text.match(/\d+-\d+(((\.|,)\d+)?)(N|S) \d+-\d+(((\.|,)\d+)?)(E|W)/g)
        const positionData = []
        if(position && position.length > 0) {
            const positionPairs = [...position]
            positionPairs.map((pair, index) => {
                const latLongPair = pair.split(' ')
                const lat = latLongPair[0].replaceAll(',', '').trim()
                const long = latLongPair[1].replaceAll(',', '').trim()
                positionData.push([lat, long])
            })
        } else {
            setError(true)
        }

        const geoObject = text.includes(" LINE") ? "LINE" : text.includes(" AREA") ? "AREA" : "POINT";

        const radius = text.includes(" RADIUS ") ? true : false

        const finalText = words.join(' ')

        props.setWarningData({
            title: title.toString().toUpperCase(),
            category: warningCategory,
            text: finalText.toString(),
            radius: radius,
            geoObject: geoObject.toString(),
            position: [...positionData],
        })
    }

    const checkEditabledText = (text) => {
        const errorTextarea = text.includes("ZCZC") ? true : text.includes("NNNN") ? true : false
        setError(errorTextarea)
        if (error) {
            props.setDisabledSaveButton(true)
            return errorTextarea.toString()
        }
        return text
    }

    const checkWarningCategory = (category) => {
        // const dbWarningData = ["A", "D"]
        if (props.categorySetting.includes(category)) {
            setCategoryHint(false)
        } else {
            setCategoryHint(true)
            props.disableWarningSaveButton()
        }
    }

    const detectText = (textValue) => {
        const textWithCorrectBreaks = TextHelping.unifyBreaksAfterLines(textValue)
        const checkedText = editabledText ? checkEditabledText(textWithCorrectBreaks) : TextHelping.removeFirstAndLastWrongWordsAndReturnText(textWithCorrectBreaks)
        if(checkedText === "error") {
            props.setDisabledSaveButton(true)
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
    }

    useEffect(() => {
        props.setIsLoading(true)
        props.setWarningData(props.warningData)
        detectText(props.ocrText)
        props.setIsLoading(false)
    },[]);

    return (<>
        <CardContent className={classes.textCardContent}>
            <FormControl error={error} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.legend}>
                    <b>Warning Text</b>&nbsp;<HintDialog warningTitle={props.warningData.title}/>
                </FormLabel>

                {error &&
                    <Alert severity="error" className={classes.marginTop}>
                        Sorry, the error occurs. Please check the editable text,
                        especially warning identifier (B1B2B3B4) and position.
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
                           defaultValue={props.warningData.text}
                           error={error}
                           onChange={(e) => {onChangeText(e)}}
                           variant="outlined"
                           disabled={categoryHint}
                />
            </FormControl>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon color="primary" />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon color="primary" />
            </IconButton>
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                color="primary"
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <WarningDataCard warningData={props.warningData} setWarningData={props.setWarningData} />
        </Collapse>
    </>);
}