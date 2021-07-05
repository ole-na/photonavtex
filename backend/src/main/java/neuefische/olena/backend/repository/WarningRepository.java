package neuefische.olena.backend.repository;

import neuefische.olena.backend.model.Warning;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WarningRepository extends PagingAndSortingRepository<Warning, String> {
    List<Warning> getAllWarnings();
    void deleteWarning(String title);
    Warning findWarningByTitle(String title);
    Optional<Warning> findById(String id);
}
