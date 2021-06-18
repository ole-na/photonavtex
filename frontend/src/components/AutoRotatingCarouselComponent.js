import React, {useState} from "react";
import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import Button from "@material-ui/core/Button";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {yellow, blue, cyan} from "@material-ui/core/colors";

const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile }) => {
    return (
        <div>
            <AutoRotatingCarousel
                label="Get started"
                open={handleOpen.open}
                onClose={() => setHandleOpen({ open: false })}
                onStart={() => setHandleOpen({ open: false })}
                autoplay={false}
                mobile={isMobile}
                style={{ position: "absolute" }}
            >
                <Slide
                      media={
                        <img src="../images/cat_photo.png" />
                      }
                      mediaBackgroundStyle={{ backgroundColor: yellow[400] }}
                      style={{ backgroundColor: yellow[600] }}
                      title="#1 Upload your photo"
                      subtitle="Please take a photo of the warning before and click on the upload icon to select it."
                  />
                <Slide
                  media={
                    <img src="../images/cat_tea.png" />
                  }
                  mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                  style={{ backgroundColor: blue[600] }}
                  title="#2 Please wait"
                  subtitle="Drink a sip of tea, coffee or rum ;)"
                />
                <Slide
                  media={
                    <img src="../images/cat_map.png" />
                  }
                  mediaBackgroundStyle={{ backgroundColor: cyan[400] }}
                  style={{ backgroundColor: cyan[600] }}
                  title="#3 Voilà: GoogleMaps"
                  subtitle="You could see now the warning´s position on GoogleMaps"
                />
            </AutoRotatingCarousel>
        </div>
   );
};

export default function AutoRotatingCarouselComponent() {
    const [handleOpen, setHandleOpen] = useState({ open: false });
    const handleClick = () => setHandleOpen({ open: true })
    const matches = useMediaQuery("(max-width:600px)");
    return (
        <>
            <Button onClick={handleClick} variant="contained">Please click here</Button>
            <AutoRotatingCarouselModal
                isMobile={matches}
                handleOpen={handleOpen}
                setHandleOpen={setHandleOpen}
            />
        </>
    );
};
