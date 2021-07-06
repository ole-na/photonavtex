package de.neuefische.olena.backend.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

class RouteTest {

    private Route route1 = Route.builder()
            .start(List.of(55.321, 34.54))
            .end(List.of(65.321, 44.54))
            .points(List.of(List.of(65.321, 44.54)))
            .build();

    @Test
    @DisplayName ("test builder() for route")
    void builder() {
        // WHEN
        Route route2 = Route.builder()
                .start(List.of(55.321, 34.54))
                .end(List.of(65.321, 44.54))
                .points(List.of(List.of(65.321, 44.54)))
                .build();
        // THEN
        assertThat(new Route(List.of(55.321, 34.54), List.of(65.321, 44.54), List.of(List.of(65.321, 44.54))), is(route2));
    }

    @Test
    @DisplayName ("test getStart() for route")
    void getStart() {
        // GIVEN
        List<Double> start = List.of(55.321, 34.54);
        // THEN
        assertThat(route1.getStart(), is(start));
    }

    @Test
    @DisplayName ("test getEnd() for route")
    void getEnd() {
        // GIVEN
        List<Double> end = List.of(65.321, 44.54);
        // THEN
        assertThat(route1.getEnd(), is(end));
    }

    @Test
    @DisplayName ("test getPoints() for route")
    void getPoints() {
        // GIVEN
        List<List<Double>> points = List.of(List.of(65.321, 44.54));
        // THEN
        assertThat(route1.getPoints(), is(points));
    }

    @Test
    @DisplayName ("test setStart() for route")
    void setStart() {
        // GIVEN
        List<Double> start = List.of(99.321, 88.54);
        // WHEN
        route1.setStart(List.of(99.321, 88.54));
        // THEN
        assertThat(route1.getStart(), is(start));
    }

    @Test
    @DisplayName ("test setEnd() for route")
    void setEnd() {
        // GIVEN
        List<Double> end = List.of(11.321, 12.54);
        // WHEN
        route1.setEnd(List.of(11.321, 12.54));
        // THEN
        assertThat(route1.getEnd(), is(end));
    }

    @Test
    @DisplayName ("test setPoints() for route")
    void setPoints() {
        // GIVEN
        List<List<Double>> points = List.of(List.of(55.555, 66.66));
        // WHEN
        route1.setPoints(points);
        // THEN
        assertThat(route1.getPoints(), is(points));
    }
}