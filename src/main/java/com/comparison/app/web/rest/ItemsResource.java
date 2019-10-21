package com.comparison.app.web.rest;
import com.comparison.app.domain.Items;
import com.comparison.app.repository.ItemsRepository;
import com.comparison.app.web.rest.errors.BadRequestAlertException;
import com.comparison.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Items.
 */
@RestController
@RequestMapping("/api")
public class ItemsResource {

    private final Logger log = LoggerFactory.getLogger(ItemsResource.class);

    private static final String ENTITY_NAME = "items";

    private final ItemsRepository itemsRepository;

    public ItemsResource(ItemsRepository itemsRepository) {
        this.itemsRepository = itemsRepository;
    }

    /**
     * POST  /items : Create a new items.
     *
     * @param items the items to create
     * @return the ResponseEntity with status 201 (Created) and with body the new items, or with status 400 (Bad Request) if the items has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/items")
    public ResponseEntity<Items> createItems(@RequestBody Items items) throws URISyntaxException {
        log.debug("REST request to save Items : {}", items);
        if (items.getId() != null) {
            throw new BadRequestAlertException("A new items cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Items result = itemsRepository.save(items);
        return ResponseEntity.created(new URI("/api/items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /items : Updates an existing items.
     *
     * @param items the items to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated items,
     * or with status 400 (Bad Request) if the items is not valid,
     * or with status 500 (Internal Server Error) if the items couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/items")
    public ResponseEntity<Items> updateItems(@RequestBody Items items) throws URISyntaxException {
        log.debug("REST request to update Items : {}", items);
        if (items.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Items result = itemsRepository.save(items);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, items.getId().toString()))
            .body(result);
    }

    /**
     * GET  /items : get all the items.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of items in body
     */
    @GetMapping("/items")
    public List<Items> getAllItems(@RequestParam(required = false) String filter) {
        if ("reviewreveals-is-null".equals(filter)) {
            log.debug("REST request to get all Itemss where reviewReveals is null");
            return StreamSupport
                .stream(itemsRepository.findAll().spliterator(), false)
                .filter(items -> items.getReviewReveals() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Items");
        return itemsRepository.findAll();
    }

    /**
     * GET  /items/:id : get the "id" items.
     *
     * @param id the id of the items to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the items, or with status 404 (Not Found)
     */
    @GetMapping("/items/{id}")
    public ResponseEntity<Items> getItems(@PathVariable Long id) {
        log.debug("REST request to get Items : {}", id);
        Optional<Items> items = itemsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(items);
    }

    /**
     * DELETE  /items/:id : delete the "id" items.
     *
     * @param id the id of the items to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItems(@PathVariable Long id) {
        log.debug("REST request to delete Items : {}", id);
        itemsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
