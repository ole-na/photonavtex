package neuefische.olena.backend.repository;

import neuefische.olena.backend.model.Settings;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class SettingsRepository {
    private final List<Settings> settings = new ArrayList<>();

    public SettingsRepository(List<Settings> settings) {
        this.settings.addAll(settings);
    }

    public List<Settings> getSettings() {
        return Collections.unmodifiableList(settings);
    }

    public Settings updateSettings(Settings settings) {
        return null;
    }

    public Settings saveSettings(Settings settingsToSave) {
        settings.add(settingsToSave);
        return settingsToSave;
    }

}
