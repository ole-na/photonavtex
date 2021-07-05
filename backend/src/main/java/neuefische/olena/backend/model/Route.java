package neuefische.olena.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.util.Pair;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection="settings")
public class Route {
    private Pair<Double, Double> start;
    private Pair<Double, Double> end;
    private ArrayList<LatLongPair<Double, Double>> points;
}
