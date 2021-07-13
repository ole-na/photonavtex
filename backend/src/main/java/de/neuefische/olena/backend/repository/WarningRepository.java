package de.neuefische.olena.backend.repository;

import de.neuefische.olena.backend.model.Settings;
import de.neuefische.olena.backend.model.Warning;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WarningRepository extends PagingAndSortingRepository<Warning, String> {
    List<Warning> findAllByUsername(String username);
    List<Warning> findAll();
    void deleteById(String id);
    Optional<Warning> findWarningByTitle(String title);
    Optional<Warning> findById(String id);
}
