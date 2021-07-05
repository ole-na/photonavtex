package neuefische.olena.backend.service;

import neuefische.olena.backend.model.*;
import neuefische.olena.backend.repository.WarningRepository;
import neuefische.olena.backend.utils.IdUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.util.Pair;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class WarningServiceTest {

    private WarningRepository repository = mock(WarningRepository.class);
    private final IdUtils idUtils = mock(IdUtils.class);
    private WarningService service = new WarningService(repository, idUtils);
    private Category catA = Category.A;
    private Category catD = Category.D;
    private GeoObject line = GeoObject.LINE;
    private GeoObject area = GeoObject.AREA;
    private GeoObject point = GeoObject.POINT;
    private LatLongPair<Double, Double> p1 = new LatLongPair<>(55.321, 34.54);
    private LatLongPair<Double, Double> p2 = new LatLongPair<>(56.321, 36.54);
    private LatLongPair<Double, Double> p3 = new LatLongPair<>(57.321, 37.54);
    private ArrayList<LatLongPair<Double, Double>> pos1 = new ArrayList<>(List.of(p1));
    private ArrayList<LatLongPair<Double, Double>> pos2 = new ArrayList<>(List.of(p1));
    private ArrayList<LatLongPair<Double, Double>> pos3 = new ArrayList<>(List.of(p1));

    @Test
    @DisplayName ("Find all warnings")
    void getAllWarnings() {
        //GIVEN
        when(repository.getAllWarnings()).thenReturn(List.of(
                Warning.builder().id("id1").title("Title1").text("Text1").radius(false).category(catA)
                     .geoObject(line).distance(5.5).position(pos1).build(),
                Warning.builder().id("id2").title("Title2").text("Text2").radius(true).category(catD)
                        .geoObject(point).distance(5.5).position(pos2).build(),
                Warning.builder().id("id2").title("Title2").text("Text2").radius(true).category(catA)
                        .geoObject(area).distance(5.5).position(pos3).build()
        ));

        //WHEN
        List<Warning> actualWarnings = service.getAllWarnings();

        //THEN
        List<Warning> expectedWarnings = List.of(
                Warning.builder().id("id1").title("Title1").text("Text1").radius(false).category(catA)
                        .geoObject(line).distance(5.5).position(pos1).build(),
                Warning.builder().id("id2").title("Title2").text("Text2").radius(true).category(catD)
                        .geoObject(point).distance(5.5).position(pos2).build(),
                Warning.builder().id("id2").title("Title2").text("Text2").radius(true).category(catA)
                        .geoObject(area).distance(5.5).position(pos3).build()
        );
        assertThat(actualWarnings, is(expectedWarnings));
    }

    @Test
    void saveWarning() {
        //GIVEN

        //WHEN

        //THEN
    }

    @Test
    void deleteWarning() {
        //GIVEN

        //WHEN

        //THEN
    }
}