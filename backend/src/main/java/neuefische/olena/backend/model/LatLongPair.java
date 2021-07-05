package neuefische.olena.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LatLongPair<X extends Double, Y extends Double> {
    private X latitude;
    private Y longitude;

    /*public LongLatPair(X latitude, Y longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }*/
}

