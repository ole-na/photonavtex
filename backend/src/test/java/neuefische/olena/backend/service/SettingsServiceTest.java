package neuefische.olena.backend.service;

import neuefische.olena.backend.model.Category;
import neuefische.olena.backend.model.LatLongPair;
import neuefische.olena.backend.model.Route;
import neuefische.olena.backend.model.Settings;
import neuefische.olena.backend.repository.SettingsRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class SettingsServiceTest {
    private SettingsRepository repository = mock(SettingsRepository.class);
    private SettingsService service = new SettingsService(repository);
    private Category catA = Category.A;
    private Category catD = Category.D;
    private Integer distance1 = 15;
    private LatLongPair<Double, Double> startRoute = new LatLongPair<>(1.1, 1.1);
    private LatLongPair<Double, Double> endRoute = new LatLongPair<>(3.3, 3.3);
    private LatLongPair<Double, Double> points = new LatLongPair<>(2.2, 4.1);

    private ArrayList<Route> route1 = new ArrayList<>(List.of(Route.builder()
            .start(new LatLongPair<>(1.1, 1.1))
            .end(new LatLongPair<>(3.3, 3.3))
            .points(new ArrayList<>(List.of(points)))
            .build()));


    @Test
    @DisplayName ("Get all settings from repository")
    void getSettings() {
        // GIVEN
        when(repository.getSettings()).thenReturn(
                Settings.builder()
                        .category(List.of(Category.A, Category.D))
                        .distance(distance1).route(route1).build());


        // WHEN
        Settings settings = service.getSettings();

        // THEN
        assertThat(settings, is(Settings.builder()
                .category(List.of(Category.A, Category.D))
                .distance(distance1).route(route1).build()));
    }

    @Test
    void saveSettings() {
        // GIVEN
        Settings updatedSettings = Settings.builder()
                .category(List.of(Category.A, Category.D))
                .distance(distance1).route(route1).build();

        // WHEN
        Settings settings = service.saveSettings(updatedSettings);

        // THEN
        verify(repository).save(
                Settings.builder()
                        .category(List.of(Category.A, Category.D))
                        .distance(distance1).route(route1).build());
        assertThat(settings, is(
                Settings.builder()
                        .category(List.of(Category.A, Category.D))
                        .distance(distance1).route(route1).build()));
    }

}