package neuefische.rem_java_21_2.backend.utils;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdUtils {
    public String generateUuid(){
        return UUID.randomUUID().toString();
    }
}
