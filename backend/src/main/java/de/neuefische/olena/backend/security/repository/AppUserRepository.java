package de.neuefische.olena.backend.security.repository;

import de.neuefische.olena.backend.security.model.AppUser;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends PagingAndSortingRepository<AppUser, String> {
    AppUser getAppUserBy(String id);
    AppUser findAppUserBy(String id);
}
