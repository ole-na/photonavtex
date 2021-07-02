import React from "react";
import WarningUpload from "../components/upload/WarningUpload";

export default function UploadPage() {
    return (
        <section>
            <h2>Warning Upload</h2>
            <p>
                Please select an image with warning text. The words "ZCZC" and "NNNN" should be on the begin and end of image.
            </p>
            <WarningUpload />
        </section>
    );
}

