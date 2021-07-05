package neuefische.olena.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "warnings")
public class Warning {
    @Id
    private String id;
    private String title;
    private String text;
    private Category category;
    private Boolean radius;
    private GeoObject geoObject;
    private ArrayList<LatLongPair<Double, Double>> position;
    private Double distance;
}


