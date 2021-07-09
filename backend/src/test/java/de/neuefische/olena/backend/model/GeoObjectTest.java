package de.neuefische.olena.backend.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.util.EnumSet;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GeoObjectTest {

    @ParameterizedTest
    @DisplayName ("check correct values of GeoObject")
    @EnumSource (value = GeoObject.class, mode = EnumSource.Mode.MATCH_ANY)
    void values(GeoObject geoObject) {
        // GIVEN
        EnumSet<GeoObject> geoObjects =
                EnumSet.of(GeoObject.LINE, GeoObject.AREA.POINT, GeoObject.AREA);
        // THEN
        assertTrue(geoObjects.contains(geoObject));
    }

    @Test
    @DisplayName ("check correct values of GeoObject with valueOf")
    void valueOf() {
        // GIVEN
        GeoObject point = GeoObject.valueOf("POINT");
        GeoObject line = GeoObject.valueOf("LINE");
        GeoObject area = GeoObject.valueOf("AREA");

        // THEN
        assertThat(point.toString(), is("POINT"));
        assertThat(line.toString(), is("LINE"));
        assertThat(area.toString(), is("AREA"));
    }

    @Test
    @DisplayName ("test GeoObject with wrong values")
    public void testCategoryIllegalArgumentsException(){
        // GIVEN
        boolean exceptionThrown1 = false;
        boolean exceptionThrown2 = false;

        // WHEN
        try{
            GeoObject badCategory1 = GeoObject.valueOf("POLYGONE");;
        }
        catch (IllegalArgumentException e){
            exceptionThrown1 = true;
        }
        try{
            GeoObject badCategory2 = GeoObject.valueOf("5");
        }
        catch (IllegalArgumentException e){
            exceptionThrown2 = true;
        }

        // THEN
        assertTrue(exceptionThrown1);
        assertTrue(exceptionThrown2);
    }
}