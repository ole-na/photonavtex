package neuefische.olena.backend.controller;

import neuefische.olena.backend.repository.WarningRepository;
import neuefische.olena.backend.model.Category;
import neuefische.olena.backend.model.GeoObject;
import neuefische.olena.backend.model.Warning;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.arrayContainingInAnyOrder;
import static org.hamcrest.Matchers.is;

@SpringBootTest (webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class WarningControllerTest {

    @LocalServerPort
    private int port;

    private String url(){
        return "http://localhost:" + port + "/warning";
    }

    private Category catA = Category.A;
    private Category catD = Category.D;
    private GeoObject line = GeoObject.LINE;
    private GeoObject area = GeoObject.AREA;
    private GeoObject point = GeoObject.POINT;
    // private ArrayList<Pair<Double, Double>> pos1 = new ArrayList<>(55.321, 34.54)>;
    // private ArrayList<Pair<Double, Double>> pos2 = Pair.of(55.321, 34.54);
    // private ArrayList<Pair<Double, Double>> pos3 = Pair.of(55.321, 34.54);

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private WarningRepository repository;

    @BeforeEach
    public void clearDatabase(){
        repository.deleteAll();
    }

    @Test
    @DisplayName ("Find all warnings")
    void getAllWarningsShouldReturnAllWarningsFromDb() {
        //GIVEN
        /*
        repository.save(
                Warning.builder().id("id1").title("Title1").text("Text1").radius(false).category(catA)
                        .geoObject(line).distance(5.5).position(pos1).build());
        repository.save(
                Warning.builder().id("id2").title("Title2").text("Text2").radius(true).category(catD)
                        .geoObject(area).distance(5.5).position(pos2).build());
        repository.save(Warning.builder().id("id3").title("Title3").text("Text3").radius(false).category(catA)
                .geoObject(point).distance(5.5).position(pos3).build());

        //WHEN
        ResponseEntity<Warning[]> response = restTemplate.getForEntity(url(), Warning[].class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), arrayContainingInAnyOrder(
                Warning.builder().id("id1").title("Title1").text("Text1").radius(false).category(catA)
                        .geoObject(line).distance(5.5).position(pos1).build(),
                Warning.builder().id("id2").title("Title2").text("Text2").radius(true).category(catD)
                        .geoObject(area).distance(5.5).position(pos2).build(),
                Warning.builder().id("id3").title("Title3").text("Text3").radius(false).category(catA)
                        .geoObject(point).distance(5.5).position(pos3).build()
        ));
        */
    }

    @Test
    @DisplayName ("Delete warning with given id")
    void deleteWarning() {
        //GIVEN

        //WHEN

        //THEN
    }

    @Test
    @DisplayName ("Save warning into DB")
    void saveWarning() {
        //GIVEN

        //WHEN

        //THEN
    }
}