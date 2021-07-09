import React from "react";
import AutoRotatingCarouselComponent from "../components/AutoRotatingCarouselComponent";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import {DirectionsBoat} from "@material-ui/icons";

export default function HelpPage() {
    return (
        <div className="page-content-container">
            <h2>Help</h2>
            <Container>
                <h3>How to use PhotoNavTex?</h3>
                <AutoRotatingCarouselComponent />
            </Container>

            <Container className="margin-top-xl">
                <h3>Rules</h3>
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemIcon>
                            <DirectionsBoat />
                        </ListItemIcon>
                        <ListItemText primary="It's not impossible to convert all NavTex photos to the text." />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemIcon>
                            <DirectionsBoat />
                        </ListItemIcon>
                        <ListItemText primary="Please select only NAVTEX of category 'A' or 'D'. The category can be wrong recognized, if the image text doesn't begin with 'ZCZC' and end to 'NNNN'. The first word in the editable text should be a warning identifier, e.g. PA18." />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemIcon>
                            <DirectionsBoat />
                        </ListItemIcon>
                        <ListItemText primary="The text of message can be changed, if some words are not recognized correctly.Please compare the text below with image text and change it if desired." />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemIcon>
                            <DirectionsBoat />
                        </ListItemIcon>
                        <ListItemText primary="The editable text should not include the words 'ZCZC' and 'NNNN'. The first word in this field should be a message identifier. But the image should have these words on the begin/end." />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemIcon>
                            <DirectionsBoat />
                        </ListItemIcon>
                        <ListItemText primary="If the error occurs, please check the editable text, especially warning identifier (B1B2B3B4) and position. The editable text should not include the words 'ZCZC' and 'NNNN'." />
                    </ListItem>
                </List>
            </Container>

        </div>
    );
}
