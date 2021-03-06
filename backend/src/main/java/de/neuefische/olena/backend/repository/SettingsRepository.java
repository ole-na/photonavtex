package de.neuefische.olena.backend.repository;

import de.neuefische.olena.backend.model.Settings;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsRepository extends PagingAndSortingRepository<Settings, String> { }
