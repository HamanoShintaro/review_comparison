package com.comparison.app.web.rest;

import com.comparison.app.ReviewComparisonApp;

import com.comparison.app.domain.ReviewReveals;
import com.comparison.app.repository.ReviewRevealsRepository;
import com.comparison.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.comparison.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReviewRevealsResource REST controller.
 *
 * @see ReviewRevealsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReviewComparisonApp.class)
public class ReviewRevealsResourceIntTest {

    private static final Integer DEFAULT_TANTEI_RATIO = 1;
    private static final Integer UPDATED_TANTEI_RATIO = 2;

    private static final Double DEFAULT_TANTEI_REVIEW = 1D;
    private static final Double UPDATED_TANTEI_REVIEW = 2D;

    private static final Integer DEFAULT_CHECKER_RATIO = 1;
    private static final Integer UPDATED_CHECKER_RATIO = 2;

    private static final Double DEFAULT_CHECKER_REVIEW = 1D;
    private static final Double UPDATED_CHECKER_REVIEW = 2D;

    private static final Integer DEFAULT_FILTERD_RATIO = 1;
    private static final Integer UPDATED_FILTERD_RATIO = 2;

    private static final Double DEFAULT_FILTERD_REVIEW = 1D;
    private static final Double UPDATED_FILTERD_REVIEW = 2D;

    private static final Instant DEFAULT_CLEATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CLEATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ReviewRevealsRepository reviewRevealsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restReviewRevealsMockMvc;

    private ReviewReveals reviewReveals;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReviewRevealsResource reviewRevealsResource = new ReviewRevealsResource(reviewRevealsRepository);
        this.restReviewRevealsMockMvc = MockMvcBuilders.standaloneSetup(reviewRevealsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReviewReveals createEntity(EntityManager em) {
        ReviewReveals reviewReveals = new ReviewReveals()
            .tanteiRatio(DEFAULT_TANTEI_RATIO)
            .tanteiReview(DEFAULT_TANTEI_REVIEW)
            .checkerRatio(DEFAULT_CHECKER_RATIO)
            .checkerReview(DEFAULT_CHECKER_REVIEW)
            .filterdRatio(DEFAULT_FILTERD_RATIO)
            .filterdReview(DEFAULT_FILTERD_REVIEW)
            .cleated(DEFAULT_CLEATED)
            .updated(DEFAULT_UPDATED);
        return reviewReveals;
    }

    @Before
    public void initTest() {
        reviewReveals = createEntity(em);
    }

    @Test
    @Transactional
    public void createReviewReveals() throws Exception {
        int databaseSizeBeforeCreate = reviewRevealsRepository.findAll().size();

        // Create the ReviewReveals
        restReviewRevealsMockMvc.perform(post("/api/review-reveals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reviewReveals)))
            .andExpect(status().isCreated());

        // Validate the ReviewReveals in the database
        List<ReviewReveals> reviewRevealsList = reviewRevealsRepository.findAll();
        assertThat(reviewRevealsList).hasSize(databaseSizeBeforeCreate + 1);
        ReviewReveals testReviewReveals = reviewRevealsList.get(reviewRevealsList.size() - 1);
        assertThat(testReviewReveals.getTanteiRatio()).isEqualTo(DEFAULT_TANTEI_RATIO);
        assertThat(testReviewReveals.getTanteiReview()).isEqualTo(DEFAULT_TANTEI_REVIEW);
        assertThat(testReviewReveals.getCheckerRatio()).isEqualTo(DEFAULT_CHECKER_RATIO);
        assertThat(testReviewReveals.getCheckerReview()).isEqualTo(DEFAULT_CHECKER_REVIEW);
        assertThat(testReviewReveals.getFilterdRatio()).isEqualTo(DEFAULT_FILTERD_RATIO);
        assertThat(testReviewReveals.getFilterdReview()).isEqualTo(DEFAULT_FILTERD_REVIEW);
        assertThat(testReviewReveals.getCleated()).isEqualTo(DEFAULT_CLEATED);
        assertThat(testReviewReveals.getUpdated()).isEqualTo(DEFAULT_UPDATED);
    }

    @Test
    @Transactional
    public void createReviewRevealsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reviewRevealsRepository.findAll().size();

        // Create the ReviewReveals with an existing ID
        reviewReveals.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReviewRevealsMockMvc.perform(post("/api/review-reveals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reviewReveals)))
            .andExpect(status().isBadRequest());

        // Validate the ReviewReveals in the database
        List<ReviewReveals> reviewRevealsList = reviewRevealsRepository.findAll();
        assertThat(reviewRevealsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReviewReveals() throws Exception {
        // Initialize the database
        reviewRevealsRepository.saveAndFlush(reviewReveals);

        // Get all the reviewRevealsList
        restReviewRevealsMockMvc.perform(get("/api/review-reveals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reviewReveals.getId().intValue())))
            .andExpect(jsonPath("$.[*].tanteiRatio").value(hasItem(DEFAULT_TANTEI_RATIO)))
            .andExpect(jsonPath("$.[*].tanteiReview").value(hasItem(DEFAULT_TANTEI_REVIEW.doubleValue())))
            .andExpect(jsonPath("$.[*].checkerRatio").value(hasItem(DEFAULT_CHECKER_RATIO)))
            .andExpect(jsonPath("$.[*].checkerReview").value(hasItem(DEFAULT_CHECKER_REVIEW.doubleValue())))
            .andExpect(jsonPath("$.[*].filterdRatio").value(hasItem(DEFAULT_FILTERD_RATIO)))
            .andExpect(jsonPath("$.[*].filterdReview").value(hasItem(DEFAULT_FILTERD_REVIEW.doubleValue())))
            .andExpect(jsonPath("$.[*].cleated").value(hasItem(DEFAULT_CLEATED.toString())))
            .andExpect(jsonPath("$.[*].updated").value(hasItem(DEFAULT_UPDATED.toString())));
    }
    
    @Test
    @Transactional
    public void getReviewReveals() throws Exception {
        // Initialize the database
        reviewRevealsRepository.saveAndFlush(reviewReveals);

        // Get the reviewReveals
        restReviewRevealsMockMvc.perform(get("/api/review-reveals/{id}", reviewReveals.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reviewReveals.getId().intValue()))
            .andExpect(jsonPath("$.tanteiRatio").value(DEFAULT_TANTEI_RATIO))
            .andExpect(jsonPath("$.tanteiReview").value(DEFAULT_TANTEI_REVIEW.doubleValue()))
            .andExpect(jsonPath("$.checkerRatio").value(DEFAULT_CHECKER_RATIO))
            .andExpect(jsonPath("$.checkerReview").value(DEFAULT_CHECKER_REVIEW.doubleValue()))
            .andExpect(jsonPath("$.filterdRatio").value(DEFAULT_FILTERD_RATIO))
            .andExpect(jsonPath("$.filterdReview").value(DEFAULT_FILTERD_REVIEW.doubleValue()))
            .andExpect(jsonPath("$.cleated").value(DEFAULT_CLEATED.toString()))
            .andExpect(jsonPath("$.updated").value(DEFAULT_UPDATED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReviewReveals() throws Exception {
        // Get the reviewReveals
        restReviewRevealsMockMvc.perform(get("/api/review-reveals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReviewReveals() throws Exception {
        // Initialize the database
        reviewRevealsRepository.saveAndFlush(reviewReveals);

        int databaseSizeBeforeUpdate = reviewRevealsRepository.findAll().size();

        // Update the reviewReveals
        ReviewReveals updatedReviewReveals = reviewRevealsRepository.findById(reviewReveals.getId()).get();
        // Disconnect from session so that the updates on updatedReviewReveals are not directly saved in db
        em.detach(updatedReviewReveals);
        updatedReviewReveals
            .tanteiRatio(UPDATED_TANTEI_RATIO)
            .tanteiReview(UPDATED_TANTEI_REVIEW)
            .checkerRatio(UPDATED_CHECKER_RATIO)
            .checkerReview(UPDATED_CHECKER_REVIEW)
            .filterdRatio(UPDATED_FILTERD_RATIO)
            .filterdReview(UPDATED_FILTERD_REVIEW)
            .cleated(UPDATED_CLEATED)
            .updated(UPDATED_UPDATED);

        restReviewRevealsMockMvc.perform(put("/api/review-reveals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReviewReveals)))
            .andExpect(status().isOk());

        // Validate the ReviewReveals in the database
        List<ReviewReveals> reviewRevealsList = reviewRevealsRepository.findAll();
        assertThat(reviewRevealsList).hasSize(databaseSizeBeforeUpdate);
        ReviewReveals testReviewReveals = reviewRevealsList.get(reviewRevealsList.size() - 1);
        assertThat(testReviewReveals.getTanteiRatio()).isEqualTo(UPDATED_TANTEI_RATIO);
        assertThat(testReviewReveals.getTanteiReview()).isEqualTo(UPDATED_TANTEI_REVIEW);
        assertThat(testReviewReveals.getCheckerRatio()).isEqualTo(UPDATED_CHECKER_RATIO);
        assertThat(testReviewReveals.getCheckerReview()).isEqualTo(UPDATED_CHECKER_REVIEW);
        assertThat(testReviewReveals.getFilterdRatio()).isEqualTo(UPDATED_FILTERD_RATIO);
        assertThat(testReviewReveals.getFilterdReview()).isEqualTo(UPDATED_FILTERD_REVIEW);
        assertThat(testReviewReveals.getCleated()).isEqualTo(UPDATED_CLEATED);
        assertThat(testReviewReveals.getUpdated()).isEqualTo(UPDATED_UPDATED);
    }

    @Test
    @Transactional
    public void updateNonExistingReviewReveals() throws Exception {
        int databaseSizeBeforeUpdate = reviewRevealsRepository.findAll().size();

        // Create the ReviewReveals

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReviewRevealsMockMvc.perform(put("/api/review-reveals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reviewReveals)))
            .andExpect(status().isBadRequest());

        // Validate the ReviewReveals in the database
        List<ReviewReveals> reviewRevealsList = reviewRevealsRepository.findAll();
        assertThat(reviewRevealsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReviewReveals() throws Exception {
        // Initialize the database
        reviewRevealsRepository.saveAndFlush(reviewReveals);

        int databaseSizeBeforeDelete = reviewRevealsRepository.findAll().size();

        // Delete the reviewReveals
        restReviewRevealsMockMvc.perform(delete("/api/review-reveals/{id}", reviewReveals.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReviewReveals> reviewRevealsList = reviewRevealsRepository.findAll();
        assertThat(reviewRevealsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReviewReveals.class);
        ReviewReveals reviewReveals1 = new ReviewReveals();
        reviewReveals1.setId(1L);
        ReviewReveals reviewReveals2 = new ReviewReveals();
        reviewReveals2.setId(reviewReveals1.getId());
        assertThat(reviewReveals1).isEqualTo(reviewReveals2);
        reviewReveals2.setId(2L);
        assertThat(reviewReveals1).isNotEqualTo(reviewReveals2);
        reviewReveals1.setId(null);
        assertThat(reviewReveals1).isNotEqualTo(reviewReveals2);
    }
}
