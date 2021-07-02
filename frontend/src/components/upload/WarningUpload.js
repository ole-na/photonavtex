import React, {useState} from "react";
import ImageUploading from "react-images-uploading";
import Tesseract from "tesseract.js";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import WarningText from "./WarningText";
import blue from '@material-ui/core/colors/blue';
import GridLoader from "react-spinners/GridLoader";
import styled from "styled-components/macro";
import {AddAPhoto, DeleteForever, SaveAlt} from "@material-ui/icons";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {CardHeader} from "@material-ui/core";
import UploadErrors from "./UploadErrors";

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
    marginTop: {
        marginTop: '2em',
    }
}));

const maxNumber = 1;

export default function WarningPhotoUpload() {
    const classes = useStyles();

    const [errors, setErrors] = useState(null);
    const [textError, setTextError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [images, setImages] = useState([]);
    const [ocrText, setOcrText] = useState([]);
    const [textReady, setTextReady] = useState(false);

    const onImageChange = (imageList, addUpdateIndex) => {
        setTextReady(false);
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setIsLoading(false);
    };

    const onWarningSave = (e) => {
        e.preventDefault()
        // save warning data into DB
    };

    const onImageErrors = (error) => {
        setErrors(error);
        setIsLoading(false);
    };

    const convertToText = (e) => {
        e.preventDefault();

        setIsLoading(true);
        const dataUrl = images[0].data_url

        Tesseract
            .recognize(dataUrl, "eng", {
                tessedit_enable_doc_dict: 0,
                load_system_dawg: 0,
                load_freq_dawg: 0,
                load_punc_dawg: 0
            })
            .then(({ data: { text } }) => {
                setOcrText((oldarray) => [...oldarray, text])
                if(text.length > 0) {
                    setTextReady(true)
                    setTextError(false)
                } else {
                    setTextError(true)

                }
                setIsLoading(false);
            })
    }

    return (
        <Wrapper>
            <ImageUploading
                single
                value={images}
                onChange={onImageChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                onError={(error) => onImageErrors(error)}
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemove,
                      dragProps
                  }) => (

                    <div className="uploadImageWrapper">
                        <Button onClick={onImageUpload}
                                {...dragProps}
                                variant="contained"
                                color="primary"
                                component="span"
                                startIcon={<AddAPhoto />}>
                            Click or Drop
                        </Button>

                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <Card className={classes.warningCard}>
                                    <CardHeader action={<div className={classes.buttons}>
                                        {!textReady && (
                                            <Button onClick={(e) => convertToText(e)}
                                                    variant="contained" color="primary">
                                                Convert to text
                                            </Button>
                                        )}
                                        <Button onClick={() => onImageRemove(index)}
                                                variant="contained" color="secondary" component="span"
                                                startIcon={<DeleteForever />}>
                                            Remove
                                        </Button>
                                        {textReady && (
                                            <Button onClick={(e) => onWarningSave(e)}
                                                    variant="contained" color="primary" component="span"
                                                    startIcon={<SaveAlt />}>
                                                Save
                                            </Button>
                                        )}
                                    </div>}
                                    />

                                    <CardContent>
                                        <img src={image.data_url} alt="Warning image" />
                                    </CardContent>

                                    {textReady && !isLoading ? (
                                        <CardContent>
                                            <WarningText ocrText={ocrText} />
                                        </CardContent>
                                    ) : (
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                <GridLoader loading={isLoading} color={blue[700]} size={30} />
                                            </Typography>
                                        </CardContent>
                                    )}

                                </Card>
                                <UploadErrors errors={errors} textError={textError} />
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
            <UploadErrors errors={errors} textError={textError}/>
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
