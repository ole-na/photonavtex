package de.neuefische.olena.backend.security;


import de.neuefische.olena.backend.security.model.AppUser;
import de.neuefische.olena.backend.security.repository.AppUserRepository;
import de.neuefische.olena.backend.security.service.AppUserDetailsService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AppUserDetailsServiceTest {

    private AppUserRepository appUserRepository = mock(AppUserRepository.class);
    private AppUserDetailsService appUserDetailsService = new AppUserDetailsService(appUserRepository);

    @Test
    public void findUserByName(){
        // Given
        when(appUserRepository.findById("Tru-la-la")).thenReturn(
                Optional.of(
                        AppUser.builder()
                                .username("Tru-la-la")
                                .password("super-password")
                                .build()));

        // When
        UserDetails actual = appUserDetailsService.loadUserByUsername("Tru-la-la");

        // Then
        assertThat(actual.getUsername(), is("Tru-la-la"));
        assertThat(actual.getPassword(), is("super-password"));
    }

    @Test
    public void throwsWhenUsernameIsNotFound(){
        // Given
        when(appUserRepository.findById("Tru-la-la")).thenReturn(Optional.empty());

        // When
        Executable when = () -> appUserDetailsService.loadUserByUsername("Tru-la-la");

        // Then
        assertThrows(UsernameNotFoundException.class, when);
    }
}