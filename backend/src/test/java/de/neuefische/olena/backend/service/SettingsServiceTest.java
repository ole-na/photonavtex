package de.neuefische.olena.backend.service;

import de.neuefische.olena.backend.model.Category;
import de.neuefische.olena.backend.model.Route;
import de.neuefische.olena.backend.model.Settings;

import de.neuefische.olena.backend.repository.SettingsRepository;
import de.neuefische.olena.backend.security.repository.AppUserRepository;
import de.neuefische.olena.backend.utils.IdUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class SettingsServiceTest {
    private final SettingsRepository testRepository = mock(SettingsRepository.class);
    private final IdUtils idUtils = mock(IdUtils.class);
    private final AppUserRepository appUserRepository = mock(AppUserRepository.class);
    private final SettingsService testService = new SettingsService(testRepository, idUtils, appUserRepository);

    private List<Category> categories = Arrays.asList(Category.A, Category.D);

    private Integer distance1 = 15;

    private Route route1 = Route.builder()
            .start(List.of(55.321, 34.54))
            .end(List.of(65.321, 44.54))
            .points(List.of(List.of(65.321, 44.54)))
            .build();
    private Route route2 = Route.builder()
            .start(List.of(55.321, 34.54))
            .end(List.of(65.321, 44.54))
            .points(List.of(List.of(65.321, 44.54)))
            .build();
    private Route route3 = Route.builder()
            .start(List.of(55.321, 34.54))
            .end(List.of(65.321, 44.54))
            .points(List.of(List.of(65.321, 44.54)))
            .build();

    @Test
    @DisplayName ("Get all settings from repository")
    void getSettings() {
        // GIVEN
        Settings savedSettings = new Settings("testuser", categories, distance1, route1);
        when(testRepository.findById("testId")).thenReturn(Optional.of(savedSettings));

        // WHEN
        Settings settings = testService.getSettings("testuser");

        // THEN
        assertThat(settings, is(savedSettings));
    }

    @Test
    void saveSettings() {
        // GIVEN
        Settings savedSettings = new Settings("testuser", categories, distance1, route1);
        when(testRepository.save(savedSettings)).thenReturn(Settings.builder()
                .username("olena")
                .category(categories)
                .distance(distance1)
                .route(route1)
                .build());
        Settings updatedSettings = Settings.builder()
                .username("olena")
                .category(categories)
                .distance(distance1)
                .route(route1)
                .build();

        // WHEN
        Settings settings = testService.saveSettings("olena", updatedSettings);

        // THEN
        verify(testRepository).save(savedSettings);
        assertThat(settings, is(savedSettings));
    }

}