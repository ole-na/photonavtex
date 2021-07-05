package neuefische.olena.backend.service;

import neuefische.olena.backend.model.Category;
import neuefische.olena.backend.model.Settings;
import neuefische.olena.backend.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SettingsService {
    private final SettingsRepository repository;

    @Autowired
    public SettingsService(SettingsRepository repository) {
        this.repository = repository;
    }

    public Settings getSettings() {
        return repository.getSettings();
    }

    public List<Category> getCategory() {
        return Arrays.asList(Category.A, Category.D);
    }

    public Settings saveSettings(Settings settingsToSave) {
        return repository.save(settingsToSave);
    }
}
