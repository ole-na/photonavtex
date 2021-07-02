import React, {useState} from "react";
import Tesseract from "tesseract.js";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import WarningText from "./WarningText";
import blue from '@material-ui/core/colors/blue';
import GridLoader from "react-spinners/GridLoader";
import styled from "styled-components/macro";
import {AddAPhoto} from "@material-ui/icons";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    warningCard: {
        marginTop: '2em',
        boxShadow: '0 0 8px 2px rgb(0 0 0 / 10%)',
        border: '1px solid #d0dbe4',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain',
        maxWidth: '100%'
    },
}));

export default function WarningUpload() {
    const classes = useStyles();

    const [imageUrl, setImageUrl] = useState("");
    const [ocrText, setOcrText] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [textReady, setTextReady] = useState(false);
    const [error, setError] = useState(false);

    const showImage = (e)  => {
        e.preventDefault();

        setTextReady(false);
        setImageUrl("")
        setIsLoading(true);

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setImageUrl(reader.result);
            setIsLoading(false);
        }
        reader.readAsDataURL(file)
    }

    const convertToText = (e) => {
        e.preventDefault();
        Tesseract
            .recognize(imageUrl, "eng", {
                tessedit_enable_doc_dict: 0,
                load_system_dawg: 0,
                load_freq_dawg: 0,
                load_punc_dawg: 0
            })
            .then(({ data: { text } }) => {
                setOcrText((oldarray) => [...oldarray, text])
                if(text.length > 0) {
                    setTextReady(true);
                    setError(false)
                } else {
                    setError(true)
                }
            })

        setIsLoading(true);
    }

    return (
        <Wrapper>
            <div className={classes.buttons}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => showImage(e)}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span"
                            startIcon={<AddAPhoto />}>
                        Upload
                    </Button>
                </label>

                {imageUrl !== "" && !textReady && (
                    <Button onClick={(e) => convertToText(e)} variant="contained" color="secondary">
                        Convert to text
                    </Button>
                )}
            </div>

            {imageUrl !== "" && (

                <Card className={classes.warningCard}>
                    <CardContent>
                        <img src={imageUrl} alt="Warning image" />
                    </CardContent>

                    {textReady ? (<>
                        <Divider />
                        <WarningText ocrText={ocrText} />
                    </>) : (
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <GridLoader loading={isLoading} color={blue[700]} size={30} />
                            </Typography>
                        </CardContent>
                    )}

                    {error &&
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                It's impossible to convert this image to the text. Please try again.
                            </Typography>
                        </CardContent>
                    }
                </Card>
            )}

        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: block;
  
  .previewImage {
     margin-bottom: 24px;
     
     img {
        object-fit: cover;
        max-width: 100%
    }
      
  }
`;