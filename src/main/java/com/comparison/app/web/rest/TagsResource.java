package com.comparison.app.web.rest;
import com.comparison.app.domain.Tags;
import com.comparison.app.repository.TagsRepository;
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

/**
 * REST controller for managing Tags.
 */
@RestController
@RequestMapping("/api")
public class TagsResource {

    private final Logger log = LoggerFactory.getLogger(TagsResource.class);

    private static final String ENTITY_NAME = "tags";

    private final TagsRepository tagsRepository;

    public TagsResource(TagsRepository tagsRepository) {
        this.tagsRepository = tagsRepository;
    }

    /**
     * POST  /tags : Create a new tags.
     *
     * @param tags the tags to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tags, or with status 400 (Bad Request) if the tags has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tags")
    public ResponseEntity<Tags> createTags(@RequestBody Tags tags) throws URISyntaxException {
        log.debug("REST request to save Tags : {}", tags);
        if (tags.getId() != null) {
            throw new BadRequestAlertException("A new tags cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tags result = tagsRepository.save(tags);
        return ResponseEntity.created(new URI("/api/tags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tags : Updates an existing tags.
     *
     * @param tags the tags to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tags,
     * or with status 400 (Bad Request) if the tags is not valid,
     * or with status 500 (Internal Server Error) if the tags couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tags")
    public ResponseEntity<Tags> updateTags(@RequestBody Tags tags) throws URISyntaxException {
        log.debug("REST request to update Tags : {}", tags);
        if (tags.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tags result = tagsRepository.save(tags);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tags.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tags : get all the tags.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tags in body
     */
    @GetMapping("/tags")
    public List<Tags> getAllTags() {
        log.debug("REST request to get all Tags");
        return tagsRepository.findAll();
    }

    /**
     * GET  /tags/:id : get the "id" tags.
     *
     * @param id the id of the tags to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tags, or with status 404 (Not Found)
     */
    @GetMapping("/tags/{id}")
    public ResponseEntity<Tags> getTags(@PathVariable Long id) {
        log.debug("REST request to get Tags : {}", id);
        Optional<Tags> tags = tagsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tags);
    }

    /**
     * DELETE  /tags/:id : delete the "id" tags.
     *
     * @param id the id of the tags to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tags/{id}")
    public ResponseEntity<Void> deleteTags(@PathVariable Long id) {
        log.debug("REST request to delete Tags : {}", id);
        tagsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
