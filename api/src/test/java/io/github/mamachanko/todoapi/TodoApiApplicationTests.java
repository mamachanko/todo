package io.github.mamachanko.todoapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(
		webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
		properties = {
				"spring.datasource.url=jdbc:tc:mysql:5.7.19:///testdatabase?TC_REUSABLE=true",
				"spring.datasource.driver-class-name=org.testcontainers.jdbc.ContainerDatabaseDriver"
		}
)
class TodoApiApplicationTests {

	@Test
	void contextLoads() {
	}

}
