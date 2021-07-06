package de.neuefische.olena.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection="settings")
public class Route {
    private List<Double> start;
    private List<Double> end;
    private List<List<Double>> points;
}
