package de.neuefische.olena.backend.controller;

import de.neuefische.olena.backend.model.Category;
import de.neuefische.olena.backend.model.GeoObject;
import de.neuefische.olena.backend.model.Warning;
import de.neuefische.olena.backend.repository.WarningRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

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

    private List<List<Double>> position1 = List.of(List.of(55.321, 34.54), List.of(65.321, 44.54));
    private List<List<Double>> position2 = List.of(List.of(99.999, 88.888));
    Warning warning1 =  Warning.builder()
            .id("testId").title("testTitle").text("testText").radius(false).category(Category.A)
            .geoObject(GeoObject.LINE).distance("25nm").position(position1).build();
    Warning warning2 =  Warning.builder()
            .id("testId2").title("testTitle2").text("testText2").radius(true).category(Category.D)
            .geoObject(GeoObject.AREA).distance("25nm").position(position2).build();
    Warning warning3 =  Warning.builder()
            .id("testId3").title("testTitle3").text("testText3").radius(false).category(Category.A)
            .geoObject(GeoObject.POINT).distance("25nm").position(position1).build();

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
        repository.save(warning1);
        repository.save(warning2);
        repository.save(warning3);

        //WHEN
        ResponseEntity<Warning[]> response = restTemplate.getForEntity(url(), Warning[].class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), arrayContainingInAnyOrder(warning1, warning2, warning3));
    }
}