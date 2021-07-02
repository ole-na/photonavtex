import React, {useState} from "react";
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
import {TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    warningTextarea: {
        width: '100%',
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
}));

export default function WarningText({ocrText}) {
    const classes = useStyles()

    const [expanded, setExpanded] = useState(false);

    let text;
    ocrText.map((ot) => (
        text = text + ot
    ))

    const words = text.split(' ')

    // changed wrong first and last words to correct values
    const firstWord = words[0]
    words[0] = "ZCZC "
    const lastWord = words[words.length]
    words[words.length] = " NNNN"

    const secondWord = words[1]
    const warningCategory = secondWord.substr(1,1)

    let coords = []
    words.map((word) => {
        if(word === "")
            coords = [...coords, word]
    })

    let warningObject = "POINT"
    words.map((word) => {
        if(word === "LINE") {
            warningObject = "LINE"
            return
        }
    })

    let area = false
    words.map((word) => {
        if(word === "AREA") {
            warningObject = "AREA"
            return
        }
    })

    // RADIUS OF 500 METERS
    let radius = false
    words.map((word, index) => {
        if(word === "RADIUS") {
            radius = true
        }
        return
    })

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (<>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                {/*{words.join(' ')}*/}
                <TextField className={classes.warningTextarea}
                    id="outlined-multiline-static"
                    label="Editable warning text"
                    multiline
                    /*rows={4}*/
                    defaultValue={words.join(' ')}
                    variant="outlined"
                />


            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
            <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>
                    Warning: {secondWord}<br />
                    Warning Category: {warningCategory}<br />
                    Object: {warningObject}<br />
                    Coords: {coords}<br />
                    Radius: {radius.toString()}
                </Typography>
            </CardContent>
        </Collapse>

    </>);
}