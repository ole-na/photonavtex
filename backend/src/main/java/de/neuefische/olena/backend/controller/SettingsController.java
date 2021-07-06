package de.neuefische.olena.backend.controller;

import de.neuefische.olena.backend.model.Settings;
import de.neuefische.olena.backend.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/settings")
public class SettingsController {
    private final SettingsService settingsService;

    @Autowired
    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping("{id}")
    public Settings getSettings(@PathVariable String id){
        return settingsService.getSettings(id);
    }

    @PostMapping
    public Settings saveSettings(@RequestBody Settings settings) {
        return settingsService.saveSettings(settings);
    }

}