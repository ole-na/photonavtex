package de.neuefische.olena.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import java.net.URISyntaxException;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BackendApplicationTests {

    @LocalServerPort
    int randomServerPort;

    @Test
    public void contextLoads() throws URISyntaxException {
    }

}
