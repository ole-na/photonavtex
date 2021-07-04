package neuefische.olena.backend.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Document (collection = "settings")
public class Settings {
    private List<Category> category = Arrays.asList(Category.A, Category.D);
    private Integer distance = 15;
    private List<Route> route;
}
