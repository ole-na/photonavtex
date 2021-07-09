package de.neuefische.olena.backend.service;

import de.neuefische.olena.backend.model.Warning;
import de.neuefische.olena.backend.repository.WarningRepository;
import de.neuefische.olena.backend.utils.IdUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WarningService {
    private final WarningRepository repository;
    private final IdUtils idUtils;

    @Autowired
    public WarningService(WarningRepository repository, IdUtils idUtils) {
        this.repository = repository;
        this.idUtils = idUtils;
    }

    public List<Warning> getAllWarnings() {
        return repository.findAll();
    }

    public Warning saveWarning(Warning warningToSave) {
        String id = idUtils.generateUuid();
        Warning warning = new Warning(id, warningToSave.getTitle(), warningToSave.getText(), warningToSave.getCategory(), warningToSave.getRadius(), warningToSave.getGeoObject(), warningToSave.getPosition(), warningToSave.getDistance());
        repository.save(warning);
        return warning;
    }

    public Optional<Warning> findWarningById(String id) {
        return repository.findById(id);
    }

    public Optional<Warning> findWarningByTitle(String title) {
        return repository.findWarningByTitle(title);
    }

    public void deleteWarning(String id) {
        repository.deleteById(id);
    }

}
