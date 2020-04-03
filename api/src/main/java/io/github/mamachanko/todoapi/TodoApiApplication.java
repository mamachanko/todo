package io.github.mamachanko.todoapi;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

@SpringBootApplication
public class TodoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApiApplication.class, args);
	}

}

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
class Todo {
	@Id
	@GeneratedValue
	private Long id;
	private String text;
	private boolean done;
}

@RepositoryRestResource
interface TodoRepository extends CrudRepository<Todo, Long> {

	List<Todo> findAllByDone(@Param("done") boolean done);

}
