package de.neuefische.olena.backend.service;

import de.neuefische.olena.backend.model.Settings;
import de.neuefische.olena.backend.repository.SettingsRepository;
import de.neuefische.olena.backend.utils.IdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SettingsService {
    private final SettingsRepository repository;
    private final IdUtils idUtils;

    @Autowired
    public SettingsService(SettingsRepository repository, IdUtils idUtils) {
        this.repository = repository;
        this.idUtils = idUtils;
    }

    public Settings getSettings(String id) {
        Optional<Settings> settings = repository.findById(id);
        return settings.orElse(null);
    }

    public Settings saveSettings(Settings settingsToSave) {
        // String id = idUtils.generateUuid();
        String id = "olena";
        Settings settings = new Settings(id, settingsToSave.getCategory(), settingsToSave.getDistance(), settingsToSave.getRoute());
        return repository.save(settings);
    }
}
