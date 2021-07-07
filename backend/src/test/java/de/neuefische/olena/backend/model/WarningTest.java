package de.neuefische.olena.backend.model;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;

class WarningTest {
    private List<List<Double>> position1 = List.of(List.of(55.321, 34.54), List.of(65.321, 44.54));
    private List<List<Double>> position2 = List.of(List.of(99.999, 88.888));
    Warning warning1 =  Warning.builder()
            .id("testId").title("testTitle").text("testText").radius(false).category(Category.A)
            .geoObject(GeoObject.LINE).distance("25nm").position(position1).build();

    @Test
    void builder() {
        Warning warning2 =  Warning.builder()
                .id("t1").title("t2").text("t3").radius(true).category(Category.D)
                .geoObject(GeoObject.AREA).distance("5nm").position(position1).build();
        assertThat(warning2, is(new Warning("t1", "t2", "t3", Category.D, true, GeoObject.AREA,
                position1, "5nm")));
    }

    @Test
    void getId() {
        assertThat(warning1.getId(), is("testId"));
    }

    @Test
    void getTitle() {
        assertThat(warning1.getTitle(), is("testTitle"));
    }

    @Test
    void getText() {
        assertThat(warning1.getText(), is("testText"));
    }

    @Test
    void getCategory() {
        assertThat(warning1.getCategory(), is(Category.A));
    }

    @Test
    void getRadius() {
        warning1.setRadius(true);
        assertTrue(warning1.getRadius());
    }

    @Test
    void getGeoObject() {
        assertThat(warning1.getGeoObject(), is(GeoObject.LINE));
    }

    @Test
    void getPosition() {
        assertThat(warning1.getPosition(), is(position1));
    }

    @Test
    void getDistance() {
        assertThat(warning1.getDistance(), is("25nm"));
    }

    @Test
    void setId() {
        warning1.setId("w1");
        assertThat(warning1.getId(), is("w1"));
    }

    @Test
    void setTitle() {
        warning1.setTitle("t1");
        assertThat(warning1.getTitle(), is("t1"));
    }

    @Test
    void setText() {
        warning1.setText("text");
        assertThat(warning1.getText(), is("text"));
    }

    @Test
    void setCategory() {
        warning1.setCategory(Category.D);
        assertThat(warning1.getCategory(), is(Category.D));
    }

    @Test
    void setRadius() {
        warning1.setRadius(true);
        assertThat(warning1.getRadius(), is(true));
    }

    @Test
    void setGeoObject() {
        warning1.setGeoObject(GeoObject.POINT);
        assertThat(warning1.getGeoObject(), is(GeoObject.POINT));
    }

    @Test
    void setPosition() {
        warning1.setPosition(position2);
        assertThat(warning1.getPosition(), is(position2));
    }

    @Test
    void setDistance() {
        warning1.setDistance("-");
        assertThat(warning1.getDistance(), is("-"));
    }

}