package de.neuefische.olena.backend.security.model;

import de.neuefische.olena.backend.model.Settings;
import de.neuefische.olena.backend.model.Warning;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "appusers")
public class AppUser {
    @Id
    private String username;
    private String password;
    @DBRef
    Settings settings;
    @DBRef
    List<Warning> warnings;
}
