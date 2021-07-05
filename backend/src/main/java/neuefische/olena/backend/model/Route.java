package neuefische.olena.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection="settings")
public class Route {
    private LatLongPair<Double, Double> start;
    private LatLongPair<Double, Double> end;
    private ArrayList<LatLongPair<Double, Double>> points;
}
