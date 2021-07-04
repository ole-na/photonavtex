package neuefische.olena.backend.controller;

import neuefische.olena.backend.model.Category;
import neuefische.olena.backend.model.Settings;
import neuefische.olena.backend.service.WarningService;
import neuefische.olena.backend.model.Warning;
import neuefische.olena.backend.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/warning")
public class WarningController {

    private final WarningService warningService;
    private final SettingsService settingsService;

    @Autowired
    public WarningController(WarningService warningService, SettingsService settingsService) {
        this.warningService = warningService;
        this.settingsService = settingsService;
    }

    @PostMapping
    public Warning saveWarning(@RequestBody Warning warning) {
        return warningService.saveWarning(warning);
    }

    @GetMapping
    public List<Warning> getAllWarnings(){
        return warningService.getAllWarnings();
    }

    @GetMapping("/category")
    public List<Category> getCategorySetting(){
        return settingsService.getCategory();
    }

    @GetMapping("/settings")
    public List<Settings> getSettings(){
        return settingsService.getSettings();
    }

    @GetMapping("{id}")
    public Warning findWarningById(@PathVariable String id) {
        Optional<Warning> response = warningService.findWarningById(id);
        if (response.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Warning with id " + id + " not found");
        }
        return response.get();
    }

    @DeleteMapping("{id}")
    public void deleteWarning(@PathVariable String id) throws IOException {
        warningService.deleteWarning(id);
    }

}
