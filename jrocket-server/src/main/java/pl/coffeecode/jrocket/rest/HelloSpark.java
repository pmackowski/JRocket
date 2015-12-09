package pl.coffeecode.jrocket.rest;

import org.springframework.stereotype.Component;
import pl.coffeecode.jrocket.config.spark.Spark;

import static spark.Spark.get;

/**
 * Created by pmackowski on 2015-12-09.
 */
@Component
public class HelloSpark implements Spark {

    @Override
    public void register() {
        get("/hello", (req, res) -> "hello world");
    }

}