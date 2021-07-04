package neuefische.olena.backend.controller;

import neuefische.olena.backend.model.Settings;
import neuefische.olena.backend.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/settings")
public class SettingsController {
    private final SettingsService settingsService;

    @Autowired
    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public List<Settings> getSettings(){
        return settingsService.getSettings();
    }

    @PutMapping
    public Settings saveSettings(@RequestBody Settings settings) {
        return settingsService.saveSettings(settings);
    }

    @PostMapping
    public Settings updateSettings(@RequestBody Settings settings) {
        return settingsService.updateSettings(settings);
    }
}