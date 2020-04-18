package io.github.mamachanko.todoapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

@SpringBootTest(
        webEnvironment = WebEnvironment.RANDOM_PORT,
        properties = {
                "spring.datasource.url=jdbc:tc:mysql:5.7.19:///testdatabase?TC_REUSABLE=true",
                "spring.datasource.driver-class-name=org.testcontainers.jdbc.ContainerDatabaseDriver"
        }
)
public class FeatureTests {

    @LocalServerPort
    private int serverPort;

    @Test
    void andNowWithRestAssured() {
        given()
                .log().all()
                .port(serverPort)
                .when()
                .get("/api/todos")
                .then()
                .statusCode(200)
                .body("_embedded.todos.size()", is(10));
    }
}
