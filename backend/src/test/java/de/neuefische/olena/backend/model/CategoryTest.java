package de.neuefische.olena.backend.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.util.EnumSet;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CategoryTest {

    @ParameterizedTest
    @DisplayName ("check correct values of Category")
    @EnumSource (value = Category.class, mode = EnumSource.Mode.MATCH_ANY)
    void values(Category category) {
        // GIVEN
        EnumSet<Category> categories =
                EnumSet.of(Category.A, Category.D);
        // THEN
        assertTrue(categories.contains(category));
    }

    @Test
    @DisplayName ("check valueOf of correct values and its ordinary")
    void valueOf() {
        // GIVEN
        Category warningCategoryA = Category.valueOf("A");
        Category warningCategoryD = Category.valueOf("D");

        // THEN
        assertThat(warningCategoryA.toString(), is("A"));
        assertThat(warningCategoryD.toString(), is("D"));
        assertThat(warningCategoryA.ordinal(), is(0));
        assertThat(warningCategoryD.ordinal(), is(1));
    }

    @Test
    @DisplayName ("Test Category with wrong value")
    public void testCategoryIllegalArgumentsException(){
        boolean exceptionThrown = false;
        try{
            Category badCategory = Category.valueOf("Z");;
        }
        catch (IllegalArgumentException e){
            exceptionThrown = true;
        }
        assertTrue(exceptionThrown);
    }
}