import React, {useState} from "react";
import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import Button from "@material-ui/core/Button";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {yellow, blue, cyan} from "@material-ui/core/colors";

const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen}) => {
    return (
        <AutoRotatingCarousel
            label="Get started"
            open={handleOpen.open}
            onClose={() => setHandleOpen({ open: false })}
            onStart={() => setHandleOpen({ open: false })}
            autoplay={false}
            mobile={false}
            style={{ position: "relative", width:"90%", height:"40%"}}
        >
            <Slide
                  media={
                    <img src="../images/cat_photo.png" alt="" />
                  }
                  mediaBackgroundStyle={{ backgroundColor: yellow[400] }}
                  style={{ backgroundColor: yellow[600] }}
                  title="#1 Upload your photo"
                  subtitle="Please take a photo of the warning before and click on the upload icon to select it."
              />
            <Slide
              media={
                <img src="../images/cat_tea.png" alt="" />
              }
              mediaBackgroundStyle={{ backgroundColor: blue[400] }}
              style={{ backgroundColor: blue[600] }}
              title="#2 Please wait"
              subtitle="Drink a sip of tea, coffee or rum ;)"
            />
            <Slide
              media={
                <img src="../images/cat_map.png" alt="" />
              }
              mediaBackgroundStyle={{ backgroundColor: cyan[400] }}
              style={{ backgroundColor: cyan[600] }}
              title="#3 Voilà: OpenSeaMap"
              subtitle="You could see now the warning´s position on OpenSeaMap incl. OpenStreetMap"
            />
        </AutoRotatingCarousel>
   );
};

export default function AutoRotatingCarouselComponent() {
    const [handleOpen, setHandleOpen] = useState({ open: false });
    const handleClick = () => setHandleOpen({ open: true })
    const matches = useMediaQuery("(max-width:600px)");
    return (
        <>
            <Button onClick={handleClick} color="primary" variant="contained">Please click here</Button>
            <AutoRotatingCarouselModal
                isMobile={matches}
                handleOpen={handleOpen}
                setHandleOpen={setHandleOpen}
            />
        </>
    );
};
