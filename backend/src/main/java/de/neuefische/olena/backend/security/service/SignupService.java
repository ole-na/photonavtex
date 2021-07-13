package de.neuefische.olena.backend.security.service;

import de.neuefische.olena.backend.security.model.AppUser;
import de.neuefische.olena.backend.security.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    AppUserRepository appUserRepo;

    @Autowired
    public SignupService(AppUserRepository appUserRepo) {
        this.appUserRepo = appUserRepo;
    }

    public boolean checkUsername(String username) {
        return appUserRepo.existsById(username);
    }

    public boolean signup(AppUser credentials){
        if(checkUsername((credentials.getUsername()))) {
            return false;
        }
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encryptedPassword = bCryptPasswordEncoder.encode(credentials.getPassword());
        appUserRepo.save(AppUser.builder().username(credentials.getUsername()).password(encryptedPassword).build());
        return checkUsername(credentials.getUsername());
    }
}

