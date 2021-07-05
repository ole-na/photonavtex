import React from "react";
import AutoRotatingCarouselComponent from "../components/AutoRotatingCarouselComponent";
import UploadButtons from "../components/UploadButtons";

export default function HomePage() {
    return (
        <>
            <section style={{position: "relative"}}>
                <h2>How to use PhotoNavTex?</h2>
                <AutoRotatingCarouselComponent />
            </section>
            <section>
                <h2>Upload of new warning´s image</h2>
                <UploadButtons />
            </section>
        </>
    );
}
