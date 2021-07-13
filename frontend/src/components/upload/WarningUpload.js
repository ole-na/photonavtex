import React, {useContext, useEffect, useRef, useState} from "react";
import ImageUploading from "react-images-uploading";
import Tesseract from "tesseract.js";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import WarningText from "./WarningText";
import styled from "styled-components/macro";
import {AddAPhoto, DeleteForever, SaveAlt} from "@material-ui/icons";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {CardHeader} from "@material-ui/core";
import UploadErrors from "./UploadErrors";
import axios from "axios";
import Loading from "../Loading";
import {splitCoordsStringToParts} from "./manipulateText";
import SuccessDialog from "../settings/SuccessDialog";
import TypeAndAuthContext from "../login/context/TypeAndAuthContext";

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
    cardHeader: {
        paddingLeft: "0",
    },
    mediaCard: {
        paddingTop: '0',
    },
    media: {
        objectFit: 'contain',
        maxWidth: '100%',
    },
    marginTop: {
        marginTop: '2em',
    }
}));

const maxNumber = 1;

export default function WarningPhotoUpload() {
    const classes = useStyles();
    const textRef = useRef(null);

    const {token} = useContext(TypeAndAuthContext);
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };

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
    const [openSuccessDialog, setOpenSuccesDialog] = useState(false);

    const [warningData, setWarningData] = useState({
        title: "",
        category: "",
        text: "",
        radius: false,
        geoObject: "",
        position: [],
        distance: "",
    })

    const [categorySetting, setCategorySetting] = useState([])

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

    const onImageRemoveSetInitialStatesExclCategory = () => {
        setIsLoading(true);
        setInitialStates()
        setIsLoading(false);
    }

    const onWarningSave = (e) => {
        e.preventDefault()
        setDbError(false)

        // detectText(e.target.defaultValue)

        const savedWarningData = {...warningData}
        const position = [...savedWarningData.position]
        const decimalPosition = []
        position.map((pair) => {
            const convertedLatDecimal = splitCoordsStringToParts(pair[0]);
            const convertedLongDecimal = splitCoordsStringToParts(pair[1]);
            decimalPosition.push([convertedLatDecimal, convertedLongDecimal])
        })
        const finalData = {...savedWarningData, position: [...decimalPosition]}
        setIsLoading(true)
         axios
            .post("/api/warning", finalData, config)
            .then((response) => {
                setWarningData(response.data)
                setDbError(false)
                setDisabledSaveButton(true)
                setOpenSuccesDialog(true)
            })
            .catch((error) => {
                console.error(error)
                setDbError(true)
                setOpenSuccesDialog(true)
            })
            .finally((isLoading) => {
                setIsLoading(false)
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

    const getSavedCategory = () => {
        setIsLoading(true)
        axios
            .get(`/api/settings`, config)
            .then((response) => response.data)
            .then((settingsResponse) => {
                if(!settingsResponse) {
                    setCategorySetting(["A", "D"]);
                    return
                }
                setCategorySetting(settingsResponse.category);
            })
            .catch((error) => {
                setCategorySetting(["A", "D"]);
                console.error(error);
            })
            .finally((isLoading) => {
                setIsLoading(false)
            });
    }

    function setInitialStates(){
        setIsLoading(true);
        setStateImage({
            errors: null,
            images: null,
        })
        setStateText({
            error: false,
            ocrText: "",
        })
        setDbError(false)
        setOpenSuccesDialog(false);

        setWarningData({
            title: "",
            category: "",
            text: "",
            radius: false,
            geoObject: "",
            position: [],
            distance: "",
        })

        setDisabledSaveButton(false)
        setIsLoading(false);
    }


    useEffect(() => {
        getSavedCategory()
    },[]);

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
                                    <CardHeader className="cardHeader" action={<div className={classes.buttons}>
                                        {stateText.ocrText.length === 0 && (
                                            <Button onClick={(e) => convertToText(e)}
                                                    variant="contained" color="primary">
                                                Convert
                                            </Button>
                                        )}
                                        <Button onClick={() => onImageRemoveSetInitialStatesExclCategory(index)}
                                                variant="contained" color="secondary" component="span"
                                                startIcon={<DeleteForever />}>
                                            New Image
                                        </Button>
                                        {stateText.ocrText.length > 0 && (!dbError && !stateImage.errors && !stateText.error) && (
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
                                                     setDisabledSaveButton={setDisabledSaveButton}
                                                     warningData={warningData}
                                                     setWarningData={setWarningData}
                                                     isLoading={isLoading}
                                                     setIsLoading={setIsLoading}
                                                     categorySetting={categorySetting}
                                        />
                                    ) : (
                                        <CardContent>
                                            <Loading isLoading={isLoading}/>
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

            <SuccessDialog openSuccessDialog={openSuccessDialog} setOpenSuccesDialog={setOpenSuccesDialog} />
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
