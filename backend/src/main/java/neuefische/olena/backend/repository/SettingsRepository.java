package neuefische.olena.backend.repository;

import neuefische.olena.backend.model.Settings;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface SettingsRepository extends PagingAndSortingRepository<Settings, String> {
   Settings getSettings();
}
