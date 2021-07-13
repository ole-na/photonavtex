package de.neuefische.olena.backend.service;

import de.neuefische.olena.backend.model.Settings;
import de.neuefische.olena.backend.repository.SettingsRepository;
import de.neuefische.olena.backend.security.model.AppUser;
import de.neuefische.olena.backend.security.repository.AppUserRepository;
import de.neuefische.olena.backend.utils.IdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SettingsService {
    private final SettingsRepository repository;
    private final IdUtils idUtils;
    private final AppUserRepository appUserRepository;

    @Autowired
    public SettingsService(SettingsRepository repository, IdUtils idUtils, AppUserRepository appUserRepository) {
        this.repository = repository;
        this.idUtils = idUtils;
        this.appUserRepository = appUserRepository;
    }

    public Settings getSettings(String username) {
        // Optional<Settings> settings = repository.findById(id);
        // return settings.orElse(null);
        AppUser response = appUserRepository.findAppUserBy(username);
        return response.getSettings();
    }

   /* public Settings saveSettings(Settings settingsToSave) {
        // String id = idUtils.generateUuid();
        String id = "olena";
        Settings settings = new Settings(id, settingsToSave.getCategory(), settingsToSave.getDistance(), settingsToSave.getRoute());
        return repository.save(settings);
    }*/

    public Settings saveSettings(String username, Settings settingsToSave) {
        if (settingsToSave  != null) {
            Settings settings = new Settings(username, settingsToSave.getCategory(), settingsToSave.getDistance(), settingsToSave.getRoute());
            AppUser user = appUserRepository.findAppUserBy(username);
            user.setSettings(settings);
            return repository.save(settings);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something went wrong");
        }
    }
}
