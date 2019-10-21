package com.comparison.app.web.rest;

import com.comparison.app.ReviewComparisonApp;

import com.comparison.app.domain.Items;
import com.comparison.app.repository.ItemsRepository;
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
 * Test class for the ItemsResource REST controller.
 *
 * @see ItemsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReviewComparisonApp.class)
public class ItemsResourceIntTest {

    private static final String DEFAULT_AMAZON_ID = "AAAAAAAAAA";
    private static final String UPDATED_AMAZON_ID = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRICE = 1;
    private static final Integer UPDATED_PRICE = 2;

    private static final Integer DEFAULT_REVIEW_NUMBER = 1;
    private static final Integer UPDATED_REVIEW_NUMBER = 2;

    private static final Double DEFAULT_REVIEW_EVALUATION = 1D;
    private static final Double UPDATED_REVIEW_EVALUATION = 2D;

    private static final String DEFAULT_LINKURL = "AAAAAAAAAA";
    private static final String UPDATED_LINKURL = "BBBBBBBBBB";

    private static final Instant DEFAULT_CLEATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CLEATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ItemsRepository itemsRepository;

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

    private MockMvc restItemsMockMvc;

    private Items items;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemsResource itemsResource = new ItemsResource(itemsRepository);
        this.restItemsMockMvc = MockMvcBuilders.standaloneSetup(itemsResource)
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
    public static Items createEntity(EntityManager em) {
        Items items = new Items()
            .amazonId(DEFAULT_AMAZON_ID)
            .name(DEFAULT_NAME)
            .price(DEFAULT_PRICE)
            .reviewNumber(DEFAULT_REVIEW_NUMBER)
            .reviewEvaluation(DEFAULT_REVIEW_EVALUATION)
            .linkurl(DEFAULT_LINKURL)
            .cleated(DEFAULT_CLEATED)
            .updated(DEFAULT_UPDATED);
        return items;
    }

    @Before
    public void initTest() {
        items = createEntity(em);
    }

    @Test
    @Transactional
    public void createItems() throws Exception {
        int databaseSizeBeforeCreate = itemsRepository.findAll().size();

        // Create the Items
        restItemsMockMvc.perform(post("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(items)))
            .andExpect(status().isCreated());

        // Validate the Items in the database
        List<Items> itemsList = itemsRepository.findAll();
        assertThat(itemsList).hasSize(databaseSizeBeforeCreate + 1);
        Items testItems = itemsList.get(itemsList.size() - 1);
        assertThat(testItems.getAmazonId()).isEqualTo(DEFAULT_AMAZON_ID);
        assertThat(testItems.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testItems.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testItems.getReviewNumber()).isEqualTo(DEFAULT_REVIEW_NUMBER);
        assertThat(testItems.getReviewEvaluation()).isEqualTo(DEFAULT_REVIEW_EVALUATION);
        assertThat(testItems.getLinkurl()).isEqualTo(DEFAULT_LINKURL);
        assertThat(testItems.getCleated()).isEqualTo(DEFAULT_CLEATED);
        assertThat(testItems.getUpdated()).isEqualTo(DEFAULT_UPDATED);
    }

    @Test
    @Transactional
    public void createItemsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemsRepository.findAll().size();

        // Create the Items with an existing ID
        items.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemsMockMvc.perform(post("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(items)))
            .andExpect(status().isBadRequest());

        // Validate the Items in the database
        List<Items> itemsList = itemsRepository.findAll();
        assertThat(itemsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllItems() throws Exception {
        // Initialize the database
        itemsRepository.saveAndFlush(items);

        // Get all the itemsList
        restItemsMockMvc.perform(get("/api/items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(items.getId().intValue())))
            .andExpect(jsonPath("$.[*].amazonId").value(hasItem(DEFAULT_AMAZON_ID.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.[*].reviewNumber").value(hasItem(DEFAULT_REVIEW_NUMBER)))
            .andExpect(jsonPath("$.[*].reviewEvaluation").value(hasItem(DEFAULT_REVIEW_EVALUATION.doubleValue())))
            .andExpect(jsonPath("$.[*].linkurl").value(hasItem(DEFAULT_LINKURL.toString())))
            .andExpect(jsonPath("$.[*].cleated").value(hasItem(DEFAULT_CLEATED.toString())))
            .andExpect(jsonPath("$.[*].updated").value(hasItem(DEFAULT_UPDATED.toString())));
    }
    
    @Test
    @Transactional
    public void getItems() throws Exception {
        // Initialize the database
        itemsRepository.saveAndFlush(items);

        // Get the items
        restItemsMockMvc.perform(get("/api/items/{id}", items.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(items.getId().intValue()))
            .andExpect(jsonPath("$.amazonId").value(DEFAULT_AMAZON_ID.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE))
            .andExpect(jsonPath("$.reviewNumber").value(DEFAULT_REVIEW_NUMBER))
            .andExpect(jsonPath("$.reviewEvaluation").value(DEFAULT_REVIEW_EVALUATION.doubleValue()))
            .andExpect(jsonPath("$.linkurl").value(DEFAULT_LINKURL.toString()))
            .andExpect(jsonPath("$.cleated").value(DEFAULT_CLEATED.toString()))
            .andExpect(jsonPath("$.updated").value(DEFAULT_UPDATED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingItems() throws Exception {
        // Get the items
        restItemsMockMvc.perform(get("/api/items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItems() throws Exception {
        // Initialize the database
        itemsRepository.saveAndFlush(items);

        int databaseSizeBeforeUpdate = itemsRepository.findAll().size();

        // Update the items
        Items updatedItems = itemsRepository.findById(items.getId()).get();
        // Disconnect from session so that the updates on updatedItems are not directly saved in db
        em.detach(updatedItems);
        updatedItems
            .amazonId(UPDATED_AMAZON_ID)
            .name(UPDATED_NAME)
            .price(UPDATED_PRICE)
            .reviewNumber(UPDATED_REVIEW_NUMBER)
            .reviewEvaluation(UPDATED_REVIEW_EVALUATION)
            .linkurl(UPDATED_LINKURL)
            .cleated(UPDATED_CLEATED)
            .updated(UPDATED_UPDATED);

        restItemsMockMvc.perform(put("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItems)))
            .andExpect(status().isOk());

        // Validate the Items in the database
        List<Items> itemsList = itemsRepository.findAll();
        assertThat(itemsList).hasSize(databaseSizeBeforeUpdate);
        Items testItems = itemsList.get(itemsList.size() - 1);
        assertThat(testItems.getAmazonId()).isEqualTo(UPDATED_AMAZON_ID);
        assertThat(testItems.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testItems.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testItems.getReviewNumber()).isEqualTo(UPDATED_REVIEW_NUMBER);
        assertThat(testItems.getReviewEvaluation()).isEqualTo(UPDATED_REVIEW_EVALUATION);
        assertThat(testItems.getLinkurl()).isEqualTo(UPDATED_LINKURL);
        assertThat(testItems.getCleated()).isEqualTo(UPDATED_CLEATED);
        assertThat(testItems.getUpdated()).isEqualTo(UPDATED_UPDATED);
    }

    @Test
    @Transactional
    public void updateNonExistingItems() throws Exception {
        int databaseSizeBeforeUpdate = itemsRepository.findAll().size();

        // Create the Items

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemsMockMvc.perform(put("/api/items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(items)))
            .andExpect(status().isBadRequest());

        // Validate the Items in the database
        List<Items> itemsList = itemsRepository.findAll();
        assertThat(itemsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItems() throws Exception {
        // Initialize the database
        itemsRepository.saveAndFlush(items);

        int databaseSizeBeforeDelete = itemsRepository.findAll().size();

        // Delete the items
        restItemsMockMvc.perform(delete("/api/items/{id}", items.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Items> itemsList = itemsRepository.findAll();
        assertThat(itemsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Items.class);
        Items items1 = new Items();
        items1.setId(1L);
        Items items2 = new Items();
        items2.setId(items1.getId());
        assertThat(items1).isEqualTo(items2);
        items2.setId(2L);
        assertThat(items1).isNotEqualTo(items2);
        items1.setId(null);
        assertThat(items1).isNotEqualTo(items2);
    }
}
