import React, {useEffect, useRef, useState} from "react";
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
import axios from "axios";

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
    mediaCard: {
        paddingTop: '0',
    },
    media: {
        objectFit: 'contain',
        width: '100%',
    },
    marginTop: {
        marginTop: '2em',
    }
}));

const maxNumber = 1;

export default function WarningPhotoUpload() {
    const classes = useStyles();

    const textRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [stateImage, setStateImage] = useState({
        errors: null,
        images: null,
    })
    const [stateText, setStateText] = useState({
        error: false,
        ocrText: "",
    })
    const [dbError, setDbError] = useState(false)

    const [warningData, setWarningData] = useState({
        title: "",
        category: "",
        text: "",
        radius: false,
        geoObject: "",
        position: [],
    })

    const [disabledSaveButton, setDisabledSaveButton] = useState(false)

    const onImageChange = (imageList, addUpdateIndex) => {
        setIsLoading(true);
        setStateText({
            error: false,
            ocrText: "",
        })
        setStateImage({...stateImage, images: imageList})
        setIsLoading(false);
    };

    const onWarningSave = (e, warningData) => {
        e.preventDefault()
        setIsLoading(true);
        axios
            .post("warning", warningData)
            .then((response) => {
                setWarningData(response.data);
            })
            .catch((error) => {
                console.error(error);
                setDbError(true)
            })
            .finally((isLoading) => {
                setIsLoading(false);
            });
    };

    const onImageErrors = (error) => {
        setStateImage({...stateImage, errors: error})
        setStateText({
            error: false,
            ocrText: "",
        })
        setIsLoading(false);

    };

    const convertToText = (e) => {
        e.preventDefault();
        setIsLoading(true);
        textRef.current.scrollIntoView({ behavior: 'smooth' })

        const dataUrl = stateImage.images[0].data_url

        Tesseract
            .recognize(dataUrl, "eng", {
                tessedit_enable_doc_dict: 0, // disable word finding
                load_system_dawg: 0, // disable the dictionary
                load_freq_dawg: 0, // disable frequency word
                load_punc_dawg: 0 // load dawg with punctuation patterns
                // language_model_debug_level: 0
            })
            .then(({data: {text}}) => {
                setStateText({
                    error: (text.length > 0) ? false : true,
                    ocrText: text,
                })
            })
            .finally(function () {
                setIsLoading(false)
                textRef.current.scrollIntoView({ behavior: 'smooth' })
            })
    }

    const disableWarningSaveButton = () => {
        setDisabledSaveButton(true)
    }

    return (
        <Wrapper>
            <ImageUploading
                single
                value={stateImage.images}
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
                                        {stateText.ocrText.length === 0 && (
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
                                        {stateText.ocrText.length > 0 && (
                                            <Button onClick={(e) => onWarningSave(e)}
                                                    variant="contained" color="primary" component="span"
                                                    disabled={disabledSaveButton}
                                                    startIcon={<SaveAlt />}>
                                                Save
                                            </Button>
                                        )}
                                    </div>}
                                    />

                                    <CardContent className={classes.mediaCard}>
                                        <img src={image.data_url} alt="Warning image" className={classes.media} />
                                    </CardContent>
                                    <div ref={textRef}>
                                    {!isLoading && stateText.ocrText.length > 0 ? (
                                        <WarningText ocrText={stateText.ocrText}
                                                     disableWarningSaveButton={disableWarningSaveButton}
                                                     warningData={warningData}
                                        />
                                    ) : (
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                <GridLoader loading={isLoading} color={blue[700]} size={30} />
                                            </Typography>
                                        </CardContent>
                                    )}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
            {(dbError || stateImage.errors || stateText.error.length > 0) && <UploadErrors errors={stateImage.errors} textError={stateText.error} dbError={dbError}/>}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: block;
  margin-bottom: 100px;
  .previewImage {
     margin-bottom: 24px;
     img {
        object-fit: cover;
        max-width: 100%
    }
  }
`;
