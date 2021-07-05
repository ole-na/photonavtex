package neuefische.olena.backend.model;

import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

class CategoryTest {

    @Test
    void values() {
    }

    @Test
    void valueOf() {
        Category warningCategoryA = Category.valueOf("A");
        Category warningCategoryD = Category.valueOf("D");
        Category warningCategoryX = Category.valueOf("X");
        assertThat(warningCategoryA, is("A"));
        assertThat(warningCategoryD, is("D"));
        assertThat(warningCategoryX, is("X"));
    }
}