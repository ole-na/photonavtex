package de.neuefische.olena.backend.service;

import de.neuefische.olena.backend.model.Category;
import de.neuefische.olena.backend.model.GeoObject;
import de.neuefische.olena.backend.model.Warning;
import de.neuefische.olena.backend.repository.WarningRepository;
import de.neuefische.olena.backend.utils.IdUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class WarningServiceTest {

    private WarningRepository testRepository = mock(WarningRepository.class);
    private final IdUtils idUtils = mock(IdUtils.class);
    private WarningService testService = new WarningService(testRepository, idUtils);

    private List<List<Double>> position1 = List.of(List.of(55.321, 34.54), List.of(65.321, 44.54));
    private List<List<Double>> position2 = List.of(List.of(99.999, 88.888));
    Warning warning1 =  Warning.builder()
            .id("testId").title("testTitle").text("testText").radius(false).category(Category.A)
            .geoObject(GeoObject.LINE).distance(25.0).position(position1).build();
    Warning warning2 =  Warning.builder()
            .id("testId2").title("testTitle2").text("testText2").radius(true).category(Category.D)
            .geoObject(GeoObject.AREA).distance(25.0).position(position2).build();
    Warning warning3 =  Warning.builder()
            .id("testId3").title("testTitle3").text("testText3").radius(false).category(Category.A)
            .geoObject(GeoObject.POINT).distance(25.0).position(position1).build();
    Warning warning4 =  Warning.builder()
            .id("testId4").title("testTitle4").text("testText4").radius(false).category(Category.A)
            .geoObject(GeoObject.POINT).distance(25.0).position(position1).build();
    Warning warningWithoutId4 =  Warning.builder()
            .title("testTitle4").text("testText4").radius(false).category(Category.A)
            .geoObject(GeoObject.POINT).distance(25.0).position(position1).build();
    Warning warningWithNullId4 =  Warning.builder()
            .id(null).title("testTitle4").text("testText4").radius(false).category(Category.A)
            .geoObject(GeoObject.POINT).distance(25.0).position(position1).build();

    @Test
    @DisplayName ("Find all warnings")
    public void getAllWarnings() {
        //GIVEN
        when(testRepository.findAll()).thenReturn(List.of(warning1, warning2, warning3));

        //WHEN
        List<Warning> actualWarnings = testService.getAllWarnings();

        //THEN
        List<Warning> expectedWarnings = List.of(warning1, warning2, warning3);
        assertThat(actualWarnings, is(expectedWarnings));
    }

    @Test
    public void saveWarning() {
        //GIVEN
        when(testRepository.save(warningWithNullId4)).thenReturn(warningWithNullId4);

        //WHEN
        testService.saveWarning(warningWithoutId4);

        //THEN
        verify(testRepository).save(warningWithNullId4);
    }
}