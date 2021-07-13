package de.neuefische.olena.backend.controller;

import de.neuefische.olena.backend.model.Settings;
import de.neuefische.olena.backend.security.model.AppUser;
import de.neuefische.olena.backend.security.repository.AppUserRepository;
import de.neuefische.olena.backend.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping ("/api/settings")
public class SettingsController {
    private final SettingsService settingsService;

    @Autowired
    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping()
    public Settings getSettings(Principal credentials){
        return settingsService.getSettings(credentials.getName());
    }

    @PostMapping
    public Settings saveSettings(Principal credentials, @RequestBody Settings settings) {
        return settingsService.saveSettings(credentials.getName(), settings);
    }
}