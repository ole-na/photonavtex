package de.neuefische.olena.backend.security.controller;

import de.neuefische.olena.backend.security.model.AppUser;
import de.neuefische.olena.backend.security.service.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth/signup")
public class SignupController {

    private SignupService signupService;

    @Autowired
    public SignupController(SignupService signupService) {
        this.signupService = signupService;
    }

    @GetMapping ("/checkusername")
    public boolean checkUsername(@RequestParam String username){
        return signupService.checkUsername(username);
    }

    @PostMapping
    public boolean signup(@RequestBody AppUser credentials){
        return signupService.signup(credentials);
    }
}
