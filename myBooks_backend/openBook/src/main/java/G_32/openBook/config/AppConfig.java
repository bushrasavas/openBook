package G_32.openBook.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import G_32.openBook.service.BookService;

@Configuration
public class AppConfig {

	@Bean
	public BookService bookService() {
		return new BookService();
	}
}
